import { Component, input, inject, signal, computed, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TalentNodeComponent } from '../talent-node/talent-node.component';
import { TalentService } from '../../services/talent.service';
import { TalentTree, TalentNode } from '../../models/talent.model';

@Component({
  selector: 'app-talent-tree',
  imports: [CommonModule, TalentNodeComponent],
  template: `
    <div class="tree-viewport" #viewport>
      <div class="grid-background"></div>
      
      <div 
        class="tree-container" 
        [style.min-width.px]="treeWidth()"
        [style.min-height.px]="treeHeight()"
        [style.transform]="'translate(' + panX() + 'px, ' + panY() + 'px)'"
      >
        <!-- Lines between nodes -->
        <svg class="connections-svg">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          @for (node of tree().nodes; track node.id) {
            @for (prereqId of node.prerequisites; track prereqId) {
              @if (getPrereqPosition(prereqId); as prereqPos) {
                <line 
                  [attr.x1]="getPos(prereqPos).x + 45" 
                  [attr.y1]="getPos(prereqPos).y + 45"
                  [attr.x2]="getPos(node.position).x + 45" 
                  [attr.y2]="getPos(node.position).y + 45"
                  [class.active]="isConnectionActive(node, prereqId)"
                />
              }
            }
          }
        </svg>

        <!-- Nodes -->
        @for (node of tree().nodes; track node.id) {
          <app-talent-node 
            [node]="node" 
            [style.left.px]="getPos(node.position).x"
            [style.top.px]="getPos(node.position).y"
            [class.dragging]="draggingNodeId === node.id"
            [isLocked]="isLocked(node)"
            (mousedown)="onNodeMouseDown($event, node.id)"
            (touchstart)="onNodeTouchStart($event, node.id)"
            (onSelect)="levelUp(node.id)"
            (onRightClick)="levelDown(node.id)"
          />
        }
      </div>
    </div>
  `,
  styles: [`
    .tree-viewport {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 100%;
      overflow: hidden; /* Changed to hidden to manual pan */
      position: relative;
      cursor: grab; /* Shows grabbable cursor for map panning */
      touch-action: none;
    }
    
    .tree-viewport:active {
      cursor: grabbing;
    }

    .grid-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: 
        radial-gradient(circle at center, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
      background-size: 80px 80px, 40px 40px, 40px 40px;
      z-index: 0;
      pointer-events: none;
    }

    .tree-container {
      position: relative;
      z-index: 1;
      /* removed padding so elements align perfectly from 0,0 */
    }

    .connections-svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      overflow: visible; /* Prevents long lines from cutting off */
    }

    line {
      stroke: rgba(255, 255, 255, 0.15);
      stroke-width: 2;
      stroke-linecap: round;
      stroke-dasharray: 6 6;
      transition: stroke 0.3s, stroke-width 0.3s, filter 0.3s;
    }

    line.active {
      stroke: var(--accent-primary);
      stroke-width: 3;
      stroke-dasharray: none;
      filter: url(#glow);
      opacity: 0.8;
    }

    .dragging {
      opacity: 0.8;
      cursor: grabbing !important;
      z-index: 1000 !important;
    }
  `]
})
export class TalentTreeComponent implements OnInit, OnDestroy {
  private talentService = inject(TalentService);
  tree = input.required<TalentTree>();

  // Use vertical by default, but update on resize!
  isVertical = signal<boolean>(true);

  // Dynamic boundaries based on actual tree nodes
  treeWidth = computed(() => {
    const nodes = this.tree().nodes;
    if (nodes.length === 0) return 1000;
    // On desktop (!isVertical), pos.y becomes the horizontal axis
    const maxVal = this.isVertical()
      ? Math.max(...nodes.map(n => n.position.x))
      : Math.max(...nodes.map(n => n.position.y));
    return Math.max(1200, maxVal + 400); // Added more buffer
  });

  treeHeight = computed(() => {
    const nodes = this.tree().nodes;
    if (nodes.length === 0) return 1000;
    // On desktop (!isVertical), pos.x becomes the vertical axis
    const maxVal = this.isVertical()
      ? Math.max(...nodes.map(n => n.position.y))
      : Math.max(...nodes.map(n => n.position.x));
    return Math.max(1000, maxVal + 1000); // 1000px buffer for bottom space/connections
  });

  // Map Panning State
  panX = signal<number>(0);
  panY = signal<number>(0);
  private isMapPanning = false;
  private panStartX = 0;
  private panStartY = 0;

  ngOnInit() {
    this.checkOrientation();
    this.resetPan();
  }

  ngOnDestroy() {
    // nothing to clean up explicitly if using standard HostListener, 
    // but good practice.
  }

  @HostListener('window:resize')
  onResize() {
    this.checkOrientation();
  }

  private checkOrientation() {
    // If window is wider than it is tall, horizontal makes more sense.
    // However, if we want typical Shop Titans experience:
    // "天賦樹根據畫面大小切換橫向或直向"
    // Let's make Desktop (wide screens) Horizontal, Mobile (narrow) Vertical
    const wasVertical = this.isVertical();
    const isNowVertical = window.innerWidth < 1024;
    this.isVertical.set(isNowVertical);
    if (wasVertical !== isNowVertical) {
      this.resetPan();
    }
  }

  resetPan() {
    // Top-down mode (Mobile): Focus on the center-top 
    // Left-right mode (Desktop): Focus on the middle-left
    if (this.isVertical()) {
      // In vertical mode (width < 1024), screen width usually determines the viewport width.
      // Assuming tree's root X is around 450-460. Viewport center is X = innerWidth / 2.
      // So PanX = innerWidth / 2 - 450. Adjusting scale to ~420 to better center main body.
      this.panX.set((window.innerWidth / 2) - 450);
      this.panY.set(50);
    } else {
      // In horizontal mode, the X and Y are swapped. 
      // Original Y is the new X, original X is the new Y.
      // Root Y is usually around 50-100. So we panX a bit to give margin. 
      // Original X is around 450. We want to center it vertically.
      this.panX.set(100);
      this.panY.set((window.innerHeight / 2) - 450);
    }
  }

  getPos(pos: { x: number, y: number }): { x: number, y: number } {
    // The original coordinates are designed for Vertical mode (Top to Bottom).
    // Center point is approx x=460.
    // If we switch to Horizontal (Left to Right), we just swap X and Y.
    // So on desktop, tree flows left-to-right. On mobile, top-to-bottom.
    if (this.isVertical()) {
      return { x: pos.x, y: pos.y };
    } else {
      return { x: pos.y, y: pos.x };
    }
  }

  isEditMode = input<boolean>(false);

  // Drag state
  draggingNodeId: string | null = null;
  dragStartX: number = 0;
  dragStartY: number = 0;
  initialNodeX: number = 0;
  initialNodeY: number = 0;

  onNodeMouseDown(event: MouseEvent, nodeId: string) {
    if (!this.isEditMode()) return;
    this.draggingNodeId = nodeId;
    this.talentService.editingNodeId.set(nodeId);
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;

    const node = this.tree().nodes.find(n => n.id === nodeId);
    if (node) {
      this.initialNodeX = node.position.x;
      this.initialNodeY = node.position.y;
    }
    event.preventDefault(); // Prevent text selection
  }

  onNodeTouchStart(event: TouchEvent, nodeId: string) {
    if (!this.isEditMode()) return;
    this.draggingNodeId = nodeId;
    this.talentService.editingNodeId.set(nodeId);
    this.dragStartX = event.touches[0].clientX;
    this.dragStartY = event.touches[0].clientY;

    const node = this.tree().nodes.find(n => n.id === nodeId);
    if (node) {
      this.initialNodeX = node.position.x;
      this.initialNodeY = node.position.y;
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.draggingNodeId && this.isEditMode()) {
      const node = this.tree().nodes.find(n => n.id === this.draggingNodeId);
      if (node) {
        // Calculate total movement correctly handling the tree orientation
        const dx = event.clientX - this.dragStartX;
        const dy = event.clientY - this.dragStartY;

        const newX = this.isVertical() ? this.initialNodeX + dx : this.initialNodeX + dy;
        const newY = this.isVertical() ? this.initialNodeY + dy : this.initialNodeY + dx;

        this.talentService.updateNode(this.tree().type, {
          ...node,
          position: { x: newX, y: newY }
        });
      }
    } else if (this.isMapPanning) {
      const dx = event.clientX - this.panStartX;
      const dy = event.clientY - this.panStartY;
      this.panX.update(v => v + dx);
      this.panY.update(v => v + dy);
      this.panStartX = event.clientX;
      this.panStartY = event.clientY;
    }
  }

  @HostListener('window:mouseup')
  onMouseUp() {
    this.draggingNodeId = null;
    this.isMapPanning = false;
  }

  @HostListener('window:touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (this.draggingNodeId && this.isEditMode()) {
      const node = this.tree().nodes.find(n => n.id === this.draggingNodeId);
      if (node) {
        // Calculate total movement correctly handling the tree orientation
        const touch = event.touches[0];
        const dx = touch.clientX - this.dragStartX;
        const dy = touch.clientY - this.dragStartY;

        const newX = this.isVertical() ? this.initialNodeX + dx : this.initialNodeX + dy;
        const newY = this.isVertical() ? this.initialNodeY + dy : this.initialNodeY + dx;

        this.talentService.updateNode(this.tree().type, {
          ...node,
          position: { x: newX, y: newY }
        });
      }
      event.preventDefault();
    } else if (this.isMapPanning) {
      const touch = event.touches[0];
      const dx = touch.clientX - this.panStartX;
      const dy = touch.clientY - this.panStartY;
      this.panX.update(v => v + dx);
      this.panY.update(v => v + dy);
      this.panStartX = touch.clientX;
      this.panStartY = touch.clientY;
      event.preventDefault();
    }
  }

  @HostListener('window:touchend')
  @HostListener('window:touchcancel')
  onTouchEnd() {
    this.draggingNodeId = null;
    this.isMapPanning = false;
  }

  // Handle map panning
  @HostListener('mousedown', ['$event'])
  onMapMouseDown(event: MouseEvent) {
    // Start panning if we clicked on the background (not a node, except dragging nodes)
    const target = event.target as HTMLElement;
    if (!target.closest('.talent-node')) {
      this.isMapPanning = true;
      this.panStartX = event.clientX;
      this.panStartY = event.clientY;
      // Prevent default to avoid text selection cursor while panning
      event.preventDefault();
    }
  }

  @HostListener('touchstart', ['$event'])
  onMapTouchStart(event: TouchEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.talent-node')) {
      this.isMapPanning = true;
      this.panStartX = event.touches[0].clientX;
      this.panStartY = event.touches[0].clientY;
      // touch-action: none on .tree-viewport handles prevent default for native scrolling
    }
  }

  levelUp(nodeId: string) {
    if (this.isEditMode()) {
      this.talentService.editingNodeId.set(nodeId);
      return;
    }

    if (nodeId.endsWith('_reset')) {
      this.talentService.resetTree(this.tree().type);
    } else {
      this.talentService.levelUpNode(this.tree().type, nodeId);
    }
  }

  levelDown(nodeId: string) {
    if (this.isEditMode()) {
      // In edit mode right click could also select the node or do nothing.
      return;
    }

    // We shouldn't level down the reset button obviously
    if (!nodeId.endsWith('_reset')) {
      this.talentService.levelDownNode(this.tree().type, nodeId);
    }
  }

  isLocked(node: TalentNode): boolean {
    if (node.prerequisites.length === 0) return false;

    const prereqPoints = this.tree().nodes
      .filter(n => node.prerequisites.includes(n.id))
      .reduce((sum, n) => sum + n.level, 0);

    return prereqPoints < node.requiredPoints;
  }

  getPrereqPosition(id: string) {
    const node = this.tree().nodes.find(n => n.id === id);
    return node ? node.position : null;
  }

  isConnectionActive(node: TalentNode, prereqId: string): boolean {
    return !this.isLocked(node);
  }
}

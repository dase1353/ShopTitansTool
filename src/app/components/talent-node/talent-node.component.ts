import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TalentNode } from '../../models/talent.model';

@Component({
  selector: 'app-talent-node',
  imports: [CommonModule],
  template: `
    <div 
      class="talent-node" 
      role="button"
      [attr.tabindex]="isLocked() ? -1 : 0"
      [attr.aria-disabled]="isLocked()"
      [attr.aria-label]="node().name + ' level ' + node().level + ' of ' + node().maxLevel"
    >

      <div class="glow-backdrop"></div>
      
      <div 
        class="icon-wrapper"
        [class.special]="node().isSpecial"
        (click)="handleClick()" 
        (contextmenu)="handleRightClick($event)"
        [class.locked]="isLocked()" 
        [class.maxed]="isMaxed()"
      >
        @if (node().isSpecial) {
          <div class="special-shape square1"></div>
          <div class="special-shape square2"></div>
        }
        <div class="icon-frame"></div>
        <img [src]="node().icon" [alt]="" class="icon" />

        <div class="name-bar">{{ node().name }}</div>

        @if (node().maxLevel > 0) {
          <div class="level-badge" [class.max]="isMaxed()">
            {{ node().level }}<span class="max-badge">/{{ node().maxLevel }}</span>
          </div>
        }
      </div>
      
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: absolute;
      z-index: 10;
    }

    .talent-node {
      position: relative;
      width: 90px;
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      user-select: none;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .talent-node:hover:not(.locked) {
      transform: translateY(-8px) scale(1.05);
      z-index: 20;
    }

    .glow-backdrop {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90px;
      height: 90px;
      border-radius: 50%;
      background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
      opacity: 0;
      transition: opacity 0.4s ease;
      z-index: -1;
      pointer-events: none;
    }

    .talent-node:hover:not(.locked) .glow-backdrop {
      opacity: 1;
    }

    .icon-wrapper {
      position: relative;
      width: 80px;
      height: 80px;
      border-radius: 20px;
      background: rgba(26, 30, 43, 0.8);
      backdrop-filter: blur(4px);
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4), inset 0 2px 2px rgba(255,255,255,0.05);
      border: 2px solid var(--border-glass);
      transition: all 0.3s ease;
    }

    .icon-frame {
      position: absolute;
      top: -2px; left: -2px; right: -2px; bottom: -2px;
      border-radius: inherit;
      background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent 50%, rgba(255,255,255,0.05));
      pointer-events: none;
      z-index: 1;
    }

    .icon {
      width: 50px;
      height: 50px;
      margin-top: 5px;
      object-fit: contain;
      filter: drop-shadow(0 2px 5px rgba(0,0,0,0.5));
      transition: all 0.3s ease;
      z-index: 1;
    }

    .name-bar {
      position: absolute;
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.95);
      color: var(--text-primary);
      text-align: center;
      font-size: 0.8rem;
      font-weight: 700;
      padding: 4px 8px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      z-index: 4;
      text-shadow: 0 1px 2px #000;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: max-content;
      max-width: 130px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.6);
      transition: color 0.3s ease, transform 0.3s ease;
    }

    .level-badge {
      position: absolute;
      top: -12px;
      right: -10px;
      background: var(--bg-surface-elevated);
      color: var(--text-primary);
      padding: 0.25rem 0.5rem;
      border-radius: 12px;
      border: 1px solid var(--border-glass);
      font-size: 0.75rem;
      font-weight: 700;
      font-family: var(--font-body);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
      z-index: 3;
    }

    .max-badge {
      color: var(--text-muted);
      font-weight: 500;
      font-size: 0.65rem;
    }

    .level-badge.max {
      background: var(--accent-primary);
      color: #000;
      border-color: var(--accent-secondary);
      box-shadow: 0 0 10px var(--accent-glow);
    }
    .level-badge.max .max-badge {
      color: rgba(0, 0, 0, 0.5);
    }

    /* States */
    .locked {
      filter: grayscale(1) brightness(0.6);
      cursor: not-allowed;
    }

    .locked .icon-wrapper {
      border-color: rgba(255, 255, 255, 0.05);
      background: rgba(10, 10, 15, 0.5);
    }

    .locked .name-bar {
      color: var(--text-muted);
    }

    .maxed .icon-wrapper {
      border-color: var(--accent-primary);
      box-shadow: 0 0 20px rgba(255, 215, 0, 0.3), inset 0 2px 5px rgba(255, 215, 0, 0.2);
    }

    .talent-node:not(.locked):not(.maxed) .icon-wrapper {
      border-color: rgba(255, 215, 0, 0.3);
    }
    
    .talent-node:hover:not(.locked) .icon-wrapper {
      border-color: var(--accent-primary);
      box-shadow: 0 8px 25px rgba(255, 215, 0, 0.25);
    }

    .talent-node:hover:not(.locked) .name-bar {
      color: var(--accent-primary);
    }

    /* Special Node Overrides */
    .icon-wrapper.special {
      background: transparent;
      border: none;
      box-shadow: none;
      border-radius: 0;
    }
    
    .icon-wrapper.special .icon-frame {
      display: none;
    }

    .icon-wrapper.special .special-shape {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      border: 3px solid #ffd700;
      background: linear-gradient(135deg, #8b4513, #4a2505);
      box-shadow: 0 0 15px rgba(255, 215, 0, 0.4), inset 0 0 10px rgba(0,0,0,0.8);
      z-index: 0;
      transition: all 0.3s ease;
    }
    
    .icon-wrapper.special .square1 {
      transform: scale(0.85);
    }
    .icon-wrapper.special .square2 {
      transform: scale(0.85) rotate(45deg);
    }

    .icon-wrapper.special .icon {
      transform: scale(0.95);
      margin-top: 15px;
      z-index: 1;
    }

    .icon-wrapper.special .name-bar {
      bottom: -18px;
      border-color: rgba(255, 215, 0, 0.3);
    }

    .icon-wrapper.special .level-badge {
      top: -16px;
      right: -16px;
    }

    .talent-node:hover:not(.locked) .icon-wrapper.special .special-shape {
      border-color: #ffea70;
      box-shadow: 0 0 25px rgba(255, 230, 128, 0.8), inset 0 0 10px rgba(0,0,0,0.8);
    }

    .maxed .icon-wrapper.special .special-shape {
      border-color: #ffaa00;
      box-shadow: 0 0 30px rgba(255, 170, 0, 0.8), inset 0 0 10px rgba(255,170,0,0.5);
    }
    
    .locked .icon-wrapper.special .special-shape {
      border-color: rgba(255,255,255,0.2);
      background: linear-gradient(135deg, #333, #111);
      box-shadow: 0 0 5px rgba(0,0,0,0.5);
    }
  `]
})
export class TalentNodeComponent {
  node = input.required<TalentNode>();
  isLocked = input<boolean>(false);
  onSelect = output<void>();
  onRightClick = output<void>();

  isMaxed = computed(() => {
    return this.node().maxLevel > 0 && this.node().level >= this.node().maxLevel;
  });

  handleClick() {
    if (!this.isLocked()) {
      this.onSelect.emit();
    }
  }

  handleRightClick(event: Event) {
    event.preventDefault(); // Prevent native context menu
    // We allow right-clicking even if maxed or locked
    // If it's leveled up, it's not locked anyway, but for sanity we just emit
    this.onRightClick.emit();
  }
}

import { Component, input, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TalentService } from '../../services/talent.service';
import { TalentTreeType, TalentNode } from '../../models/talent.model';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-talent-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="editor-panel glass-panel">
      <div class="editor-header">
        <h3>編輯器: {{ activeType() }}</h3>
        <div class="header-actions">
          <button class="btn-primary" (click)="addNew()" title="新增節點">＋新增</button>
          <button class="btn-secondary" (click)="exportData()" title="匯出所有分支樹資料">匯出 JSON</button>
        </div>
      </div>

      <div class="editor-content">
        @if (selectedNode(); as node) {
          <div class="form-group">
            <label>ID</label>
            <input type="text" [value]="node.id" disabled />
          </div>
          <div class="form-group">
            <label>名稱</label>
            <input type="text" [ngModel]="node.name" (ngModelChange)="updateField('name', $event)" />
          </div>
          
          <div class="form-group">
            <label>X 座標</label>
            <input type="number" [ngModel]="node.position.x" (ngModelChange)="updatePosition('x', $event)" [disabled]="isRootNode(node) || isResetNode(node)" />
          </div>
          <div class="form-group">
            <label>Y 座標</label>
            <input type="number" [ngModel]="node.position.y" (ngModelChange)="updatePosition('y', $event)" [disabled]="isRootNode(node) || isResetNode(node)" />
          </div>
          
          <div class="form-group">
            <label>最高等級 (0為無等級)</label>
            <input type="number" [ngModel]="node.maxLevel" (ngModelChange)="updateField('maxLevel', $event)" [disabled]="isRootNode(node) || isResetNode(node)" />
          </div>
          <div class="form-group">
            <label>解鎖所需前置點數</label>
            <input type="number" [ngModel]="node.requiredPoints" (ngModelChange)="updateField('requiredPoints', $event)" [disabled]="isRootNode(node) || isResetNode(node)" />
          </div>
          
          <div class="form-group check-group">
            <label>特殊外框特效</label>
            <input type="checkbox" [ngModel]="node.isSpecial" (ngModelChange)="updateField('isSpecial', $event)" />
          </div>
          
          <div class="form-group">
            <label>圖示路徑</label>
            <input type="text" [ngModel]="node.icon" (ngModelChange)="updateField('icon', $event)" [disabled]="isRootNode(node) || isResetNode(node)" />
          </div>
          
          <div class="form-group">
            <label>前置節點 (Ctrl或Command+點擊可複選)</label>
            <select multiple [ngModel]="node.prerequisites" (ngModelChange)="updateField('prerequisites', $event)" [disabled]="isRootNode(node) || isResetNode(node)">
              @for (opt of availableNodes(); track opt.id) {
                <option [value]="opt.id">{{ opt.name }} ({{ opt.id }})</option>
              }
            </select>
          </div>

          <div class="danger-zone">
            <button class="btn-danger" (click)="deleteCurrent()" [disabled]="isRootNode(node) || isResetNode(node)">刪除此節點</button>
            <button class="btn-warning" (click)="restoreDefaults()">重設為預設天賦樹</button>
          </div>
        } @else {
          <div class="empty-state">
            <p>點擊左側的節點來編輯，或是點擊上方新增一個節點。</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    * {
      box-sizing: border-box;
    }
    .editor-panel {
      position: absolute;
      top: 1rem;
      right: 1.5rem;
      bottom: 1rem;
      width: 360px;
      border-radius: 12px;
      background: rgba(15, 20, 30, 0.95);
      border: 1px solid var(--border-glass);
      backdrop-filter: blur(10px);
      display: flex;
      flex-direction: column;
      color: var(--text-primary);
      z-index: 100;
      box-shadow: -4px 0 25px rgba(0, 0, 0, 0.6);
      overflow: hidden;
    }
    .editor-header {
      padding: 1.5rem 1rem;
      border-bottom: 1px solid var(--border-glass);
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255, 255, 255, 0.05);
    }
    .header-actions {
      display: flex;
      gap: 0.5rem;
    }
    .editor-header h3 {
      font-size: 1.1rem;
      margin: 0;
      font-weight: 600;
      text-shadow: 0 2px 4px rgba(0,0,0,0.5);
    }
    .editor-content {
      flex: 1;
      overflow-y: auto;
      padding: 1.5rem 1rem;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      margin-bottom: 1.25rem;
    }
    .check-group {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;
    }
    .check-group label {
      margin-bottom: 0;
    }
    label {
      font-size: 0.8rem;
      color: var(--text-secondary);
      margin-bottom: 0.4rem;
      font-weight: 600;
    }
    input, select {
      background: rgba(0,0,0,0.5);
      border: 1px solid var(--border-glass);
      color: #fff;
      padding: 0.6rem;
      border-radius: 6px;
      font-family: inherit;
      font-size: 0.9rem;
      transition: border-color 0.2s;
    }
    input:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    input:focus, select:focus {
      outline: none;
      border-color: var(--accent-primary);
    }
    select[multiple] {
      height: 160px;
    }
    select option {
      padding: 4px;
    }
    .divider {
      height: 1px;
      background: var(--border-glass);
      margin: 1.5rem 0;
    }
    .btn-primary {
      background: var(--accent-primary);
      color: #000;
      border: none;
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.2s;
    }
    .btn-primary:hover {
      background: var(--accent-secondary);
      transform: translateY(-1px);
    }
    .btn-secondary {
      background: rgba(255, 255, 255, 0.1);
      color: var(--text-primary);
      border: 1px solid var(--border-glass);
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.2s;
    }
    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    .danger-zone {
      margin-top: 3rem;
      padding-top: 1.5rem;
      border-top: 1px dashed rgba(255, 68, 68, 0.3);
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .btn-danger {
      width: 100%;
      background: rgba(255, 68, 68, 0.1);
      color: #ff4444;
      border: 1px solid rgba(255, 68, 68, 0.3);
      padding: 0.75rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.2s;
    }
    .btn-danger:hover:not(:disabled) {
      background: rgba(255, 68, 68, 0.3);
    }
    .btn-danger:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .btn-warning {
      width: 100%;
      background: rgba(255, 165, 0, 0.1);
      color: orange;
      border: 1px solid rgba(255, 165, 0, 0.3);
      padding: 0.75rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.2s;
    }
    .btn-warning:hover {
      background: rgba(255, 165, 0, 0.3);
    }
    .empty-state {
      text-align: center;
      color: var(--text-muted);
      margin-top: 3rem;
      font-size: 0.9rem;
      line-height: 1.5;
    }
  `]
})
export class TalentEditorComponent {
  talentService = inject(TalentService);
  dialogService = inject(DialogService);
  activeType = input.required<TalentTreeType>();

  treeNodes = computed(() => {
    switch (this.activeType()) {
      case 'Trading': return this.talentService.trading().nodes;
      case 'Questing': return this.talentService.questing().nodes;
      case 'Crafting': return this.talentService.crafting().nodes;
    }
  });

  selectedNode = computed(() => {
    const id = this.talentService.editingNodeId();
    if (!id) return null;
    return this.treeNodes().find(n => n.id === id) || null;
  });

  availableNodes = computed(() => {
    const id = this.talentService.editingNodeId();
    return this.treeNodes().filter(n => n.id !== id);
  });

  addNew() {
    this.talentService.addNode(this.activeType());
  }

  updateField(field: keyof TalentNode, value: any) {
    const node = this.selectedNode();
    if (!node) return;
    this.talentService.updateNode(this.activeType(), { ...node, [field]: value });
  }

  updatePosition(coord: 'x' | 'y', value: number) {
    const node = this.selectedNode();
    if (!node) return;
    this.talentService.updateNode(this.activeType(), {
      ...node,
      position: { ...node.position, [coord]: Number(value) }
    });
  }

  isRootNode(node: TalentNode) { return node.id.endsWith('_root'); }
  isResetNode(node: TalentNode) { return node.id.endsWith('_reset'); }

  async deleteCurrent() {
    const node = this.selectedNode();
    if (!node) return;
    if (this.isRootNode(node) || this.isResetNode(node)) return;

    if (await this.dialogService.confirm('確定要刪除這項節點嗎？此操作無法復原。')) {
      this.talentService.deleteNode(this.activeType(), node.id);
    }
  }

  async restoreDefaults() {
    if (await this.dialogService.confirm('確定要將此天賦樹恢復到出廠設定嗎？您所有編輯的新增節點都會遺失！')) {
      this.talentService.restoreDefaultTree(this.activeType());
    }
  }

  exportData() {
    const data = {
      trading: this.talentService.trading().nodes,
      questing: this.talentService.questing().nodes,
      crafting: this.talentService.crafting().nodes
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'talent-tree-export.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}

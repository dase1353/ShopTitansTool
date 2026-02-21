import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TalentService } from '../../services/talent.service';
import { TalentTreeComponent } from '../talent-tree/talent-tree.component';
import { TalentTreeType } from '../../models/talent.model';
import { TalentEditorComponent } from '../talent-editor/talent-editor.component';
import { DialogService } from '../../services/dialog.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-talent-container',
  standalone: true,
  imports: [CommonModule, TalentTreeComponent, TalentEditorComponent, DialogComponent],
  template: `
    <div class="talent-container">
        <div class="content-wrapper">
          <div class="top-controls">
            <nav class="talent-tabs">
              @for (type of treeTypes; track type) {
                <button 
                  class="tab-btn"
                  [class.active]="activeType() === type"
                  (click)="activeType.set(type)"
                >
                  <img [src]="getTabIcon(type)" class="tab-icon" />
                  <span>{{ getTranslation(type) }}</span>
                  <div class="glow-effect" [class.show]="activeType() === type"></div>
                </button>
              }
            </nav>

            <div class="stats-card glass-panel">
              <div class="stat-item">
                <span class="label">成就</span>
                <label class="switch">
                  <input 
                    type="checkbox" 
                    [checked]="talentService.hasAchievements()"
                    (change)="toggleAchievements($event)"
                  >
                  <span class="slider round"></span>
                </label>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="label">可用點數</span>
                <div class="value-wrapper">
                  <img src="ShopTitansAssets/Currencies/icon_global_skillpoint.png" class="stat-icon" />
                  <span class="value remaining">{{ talentService.remainingPoints() }}</span>
                </div>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="label">已配置</span>
                <div class="value-wrapper">
                  <img src="ShopTitansAssets/Currencies/icon_global_skillpoint.png" class="stat-icon" />
                  <span class="value spent">{{ talentService.spentPoints() }}</span>
                </div>
              </div>
              <div class="stat-item reset-item">
                @if (talentService.spentPoints() > 0) {
                  <button class="btn-profile" (click)="shareBuild()" title="分享流派">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                  </button>
                  <button class="btn-profile" (click)="isSaveLoadOpen.set(true)" title="存檔與讀取">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                  </button>
                  <button class="btn-reset-all" (click)="resetAllPoints()">全部重設</button>
                }
              </div>
            </div>
          </div>

          <main class="tree-content">
            @if (activeType() === 'Trading') {
              <app-talent-tree [tree]="talentService.trading()" [isEditMode]="talentService.activeTool() === 'editor'" />
            } @else if (activeType() === 'Questing') {
              <app-talent-tree [tree]="talentService.questing()" [isEditMode]="talentService.activeTool() === 'editor'" />
            } @else if (activeType() === 'Crafting') {
              <app-talent-tree [tree]="talentService.crafting()" [isEditMode]="talentService.activeTool() === 'editor'" />
            }
          </main>

          @if (talentService.activeTool() === 'editor') {
            <app-talent-editor [activeType]="activeType()" />
          }
          <app-dialog />

          @if (isSaveLoadOpen()) {
            <div class="save-modal-overlay">
              <div class="save-modal glass-panel">
                <div class="modal-header">
                  <h3>天賦規劃存檔 (LocalStorage)</h3>
                  <button class="btn-close" (click)="isSaveLoadOpen.set(false)">&times;</button>
                </div>
                <div class="save-ctrl">
                  <input type="text" #saveNameInput placeholder="輸入規劃名稱..." class="save-input" />
                  <button class="btn btn-primary" (click)="saveProfile(saveNameInput.value); saveNameInput.value=''">儲存目前規劃</button>
                </div>
                <div class="saves-list">
                  @for (p of savedProfiles(); track p) {
                    <div class="save-item glass-panel">
                      <span class="save-name">{{ p }}</span>
                      <div class="save-actions">
                        <button class="btn btn-small" (click)="loadProfile(p)">讀取</button>
                        <button class="btn btn-small btn-danger" (click)="deleteProfile(p)">刪除</button>
                      </div>
                    </div>
                  } @empty {
                    <p class="empty-msg">目前沒有任何存檔規劃。</p>
                  }
                </div>
              </div>
            </div>
          }
        </div>
        
        @if (talentService.isEditorEnabled()) {
          <button class="editor-fab" [class.active]="talentService.activeTool() === 'editor'" (click)="toggleEditorTool()">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
          </button>
        }
    </div>
  `,
  styles: [`
    .talent-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      background: radial-gradient(ellipse at top center, var(--bg-surface-elevated) 0%, var(--bg-dark) 100%);
      position: relative;
    }

    .tree-content {
      flex: 1;
      position: relative;
      height: 100%;
      overflow: hidden;
    }

    .top-controls {
      position: absolute;
      top: 1rem;
      left: 1.5rem;
      right: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 10;
      pointer-events: none;
    }

    .top-controls > * {
      pointer-events: auto;
    }

    .talent-tabs {
      display: flex;
      gap: 1rem;
      background: rgba(255, 255, 255, 0.03);
      padding: 0.5rem;
      border-radius: 999px;
      border: 1px solid var(--border-glass);
    }

    .tab-btn {
      position: relative;
      background: transparent;
      border: none;
      color: var(--text-secondary);
      padding: 0.5rem 1.5rem;
      border-radius: 999px;
      font-family: var(--font-heading);
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .tab-icon {
      width: 20px;
      height: 20px;
      object-fit: contain;
      filter: drop-shadow(0 1px 2px rgba(0,0,0,0.5));
    }

    .tab-btn:hover {
      color: var(--text-primary);
    }

    .tab-btn.active {
      color: #000;
      background: var(--text-primary);
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
    }

    .glow-effect {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      opacity: 0;
      z-index: -1;
      transition: opacity 0.4s ease;
      border-radius: 999px;
    }

    .tab-btn.active .glow-effect.show {
      opacity: 1;
    }

    .stats-card {
      display: flex;
      align-items: center;
      padding: 0.75rem 1.5rem;
      gap: 1.5rem;
      border-radius: 999px;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .stat-item .label {
      font-size: 0.75rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .stat-item .value {
      font-family: var(--font-heading);
      font-size: 1.5rem;
      font-weight: 700;
      line-height: 1.2;
    }

    .value-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 0.25rem;
    }

    .stat-icon {
      width: 24px;
      height: 24px;
      object-fit: contain;
    }

    .value.remaining {
      color: var(--accent-primary);
      text-shadow: 0 0 10px var(--accent-glow);
      min-width: 2.5ch;
      font-variant-numeric: tabular-nums;
      text-align: center;
    }

    .value.spent {
      color: var(--text-secondary);
      min-width: 2.5ch;
      font-variant-numeric: tabular-nums;
      text-align: center;
    }

    .stat-divider {
      width: 1px;
      height: 24px;
      background: var(--border-glass);
    }

    .btn-reset-all {
      background: rgba(255, 68, 68, 0.1);
      color: #ff4444;
      border: 1px solid rgba(255, 68, 68, 0.3);
      padding: 0.5rem 1rem;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
      font-family: var(--font-heading);
      transition: all 0.2s;
    }
    
    .btn-reset-all:hover {
      background: rgba(255, 68, 68, 0.3);
      box-shadow: 0 0 10px rgba(255, 68, 68, 0.4);
    }
    
    .reset-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;
      justify-content: center;
    }

    .editor-fab {
      position: absolute;
      bottom: 2rem;
      right: 2rem;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--accent-primary);
      color: var(--accent-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(255, 215, 0, 0.3);
      z-index: 1000;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .editor-fab:hover {
      transform: scale(1.1);
      box-shadow: 0 0 25px var(--accent-glow);
      background: rgba(255, 215, 0, 0.05);
    }

    .editor-fab.active {
      background: var(--accent-primary);
      color: #000;
      box-shadow: 0 0 30px var(--accent-glow);
    }
    
    /* Toggle Switch */
    .switch {
      position: relative;
      display: inline-block;
      width: 44px;
      height: 24px;
      margin-top: 4px;
    }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: var(--bg-surface);
      border: 1px solid var(--border-glass);
      transition: .4s;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 3px;
      bottom: 3px;
      background-color: var(--text-muted);
      transition: .4s;
    }
    input:checked + .slider {
      background-color: rgba(255, 215, 0, 0.2);
      border-color: var(--accent-primary);
    }
    input:checked + .slider:before {
      transform: translateX(20px);
      background-color: var(--accent-primary);
      box-shadow: 0 0 10px var(--accent-glow);
    }
    .slider.round {
      border-radius: 24px;
    }
    .slider.round:before {
      border-radius: 50%;
    }

    @media (max-width: 1024px) {
      .header-content {
        flex-direction: column;
        gap: 1rem;
      }
      .glass-header {
        position: relative;
        padding: 1rem;
      }
      .tree-content {
        margin-top: 0;
        height: auto;
      }
    }

    @media (max-width: 600px) {
      .talent-tabs {
        width: 100%;
        overflow-x: auto;
      }
      .tab-btn {
        padding: 0.5rem 1rem;
        flex: 1 0 auto;
        text-align: center;
      }
      .brand h1 {
        font-size: 1.5rem;
      }
    }
    /* Modal Styles */
    .save-modal-overlay {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.6);
      backdrop-filter: blur(4px);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.2s ease-out;
    }
    .save-modal {
      width: 500px;
      max-width: 90vw;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.8);
    }
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    .modal-header h3 {
      margin: 0;
      color: var(--accent-primary);
    }
    .btn-close {
      background: transparent;
      border: none;
      color: var(--text-secondary);
      font-size: 1.5rem;
      cursor: pointer;
    }
    .btn-close:hover {
      color: #fff;
    }
    .save-ctrl {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .save-ctrl input {
      flex: 1;
      background: rgba(0,0,0,0.5);
      border: 1px solid var(--border-glass);
      color: #fff;
      padding: 0.6rem 1rem;
      border-radius: 6px;
      font-size: 1rem;
    }
    .saves-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-height: 400px;
      overflow-y: auto;
    }
    .save-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-radius: 8px;
    }
    .save-name {
      font-weight: bold;
      font-size: 1.1rem;
    }
    .save-actions {
      display: flex;
      gap: 0.5rem;
    }
    .btn-small {
      padding: 0.4rem 1rem;
      font-size: 0.9rem;
      border-radius: 4px;
      cursor: pointer;
      border: 1px solid var(--border-glass);
      background: transparent;
      color: var(--text-primary);
    }
    .btn-small:hover { background: rgba(255,255,255,0.1); }
    .btn-danger {
      color: #ff4444; border-color: rgba(255, 68, 68, 0.3); background: rgba(255, 68, 68, 0.1);
    }
    .btn-danger:hover { background: rgba(255, 68, 68, 0.2); }
    .btn-primary {
      padding: 0.5rem 1.5rem;
      border-radius: 6px;
      background: var(--accent-primary);
      color: #000;
      font-weight: bold;
      border: none;
      cursor: pointer;
    }
    .btn-profile {
      background: transparent;
      border: 1px solid var(--border-glass);
      color: var(--text-primary);
      border-radius: 6px;
      padding: 0.2rem 0.5rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.2rem;
    }
    .btn-profile:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    
    @media (max-width: 768px) {
      .top-controls {
        flex-direction: column;
        gap: 0.5rem;
        top: 0.5rem;
        left: 0.5rem;
        right: 0.5rem;
      }
      .stats-card {
        width: 100%;
        justify-content: center;
        padding: 0.5rem;
        flex-wrap: wrap;
        border-radius: 20px;
        gap: 0.75rem;
      }
      .talent-tabs {
        width: 100%;
        justify-content: space-around;
        padding: 0.25rem;
        gap: 0;
        flex-wrap: wrap; /* allow wrapping if needed */
      }
      .tab-btn {
        padding: 0.5rem 0.5rem;
        font-size: 0.9rem;
      }
      /* Ensure text is always visible and flex works out its layout. */
      .tab-btn span {
        display: inline;
        margin-left: 0.25rem; /* give space from icon */
      }
      .tab-icon {
        width: 20px;
        height: 20px;
      }
      .stat-item .value {
        font-size: 1.2rem;
      }
      .stat-divider {
        display: none; /* hide dividers on mobile to save space */
      }
    }
  `]
})
export class TalentContainerComponent implements OnInit {
  talentService = inject(TalentService);
  dialogService = inject(DialogService);
  route = inject(ActivatedRoute);

  treeTypes: TalentTreeType[] = ['Trading', 'Questing', 'Crafting'];
  activeType = signal<TalentTreeType>('Trading');
  savedProfiles = signal<string[]>([]);
  isSaveLoadOpen = signal<boolean>(false);

  ngOnInit() {
    this.refreshProfiles();

    // Check if we have a shared build in the URL
    this.route.queryParams.subscribe(params => {
      if (params['build']) {
        const success = this.talentService.importBuildFromUrl(params['build']);
        if (success) {
          // Optionally let the user know it was loaded
          console.log('Build applied from URL');
        }
      }
    });
  }

  toggleEditorTool() {
    this.talentService.activeTool.set(this.talentService.activeTool() === 'editor' ? 'tree' : 'editor');
  }

  async shareBuild() {
    if (this.talentService.spentPoints() <= 0) {
      await this.dialogService.alert('您尚未分配任何點數！');
      return;
    }

    try {
      const url = this.talentService.exportBuildToUrl();
      if (!url) {
        await this.dialogService.alert('匯出失敗。');
        return;
      }

      await navigator.clipboard.writeText(url);
      await this.dialogService.alert('已將流派專屬分享網址複製到剪貼簿！</br>任何人開啟該網址即可直接載入您的配置。');
    } catch (err) {
      console.error('Failed to copy', err);
      // fallback alert with url inside
      await this.dialogService.alert('匯出成功：<br>' + this.talentService.exportBuildToUrl());
    }
  }

  getTranslation(type: TalentTreeType): string {
    const translations: Record<TalentTreeType, string> = {
      'Trading': '交易',
      'Questing': '任務',
      'Crafting': '製作'
    };
    return translations[type];
  }

  getTabIcon(type: TalentTreeType): string {
    switch (type) {
      case 'Trading': return 'ShopTitansAssets/Misc Icons/icon_global_smalltalk.png';
      case 'Questing': return 'ShopTitansAssets/Misc Icons/icon_global_quest.png';
      case 'Crafting': return 'ShopTitansAssets/Misc Icons/icon_global_selector_tab_craft.png';
    }
  }

  refreshProfiles() {
    this.savedProfiles.set(this.talentService.getSavedProfiles());
  }

  async saveProfile(name: string) {
    name = name.trim();
    if (!name) return;
    if (this.savedProfiles().includes(name)) {
      if (!await this.dialogService.confirm(`存檔 "${name}" 已存在，確定要覆寫嗎？`)) {
        return;
      }
    }
    if (this.talentService.saveProfile(name)) {
      this.refreshProfiles();
      this.dialogService.alert('儲存成功！');
    }
  }

  async loadProfile(name: string) {
    if (await this.dialogService.confirm(`確定要讀取 "${name}" 嗎？目前未儲存的進度將會遺失。`)) {
      if (this.talentService.loadProfile(name)) {
        this.dialogService.alert('讀取成功！');
        this.talentService.activeTool.set('tree');
      }
    }
  }

  async deleteProfile(name: string) {
    if (await this.dialogService.confirm(`確定要永久刪除 "${name}" 嗎？`)) {
      this.talentService.deleteProfile(name);
      this.refreshProfiles();
    }
  }

  async resetAllPoints() {
    if (await this.dialogService.confirm('確定要退回所有圖表的點數嗎？')) {
      this.talentService.resetAllTrees();
    }
  }

  async toggleAchievements(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.checked && this.talentService.spentPoints() > 61) {
      await this.dialogService.alert('已配置點數大於 61 點，無法關閉成就模式！請先退回圖表中的點數。');
      input.checked = true;
      return;
    }
    this.talentService.hasAchievements.set(input.checked);
  }
}

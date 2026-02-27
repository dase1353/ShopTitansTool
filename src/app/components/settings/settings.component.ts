import { Component, inject, output } from '@angular/core';
import { TalentService } from '../../services/talent.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  template: `
    <div class="settings-panel glass-panel">
      <h2>系統設定</h2>
      <div class="setting-group">
        <span class="setting-label">talent editor 節點編輯器</span>
        <label class="switch">
          <input 
            type="checkbox" 
            [checked]="talentService.isEditorEnabled()"
            (change)="toggleEditorEnable($event)"
          >
          <span class="slider round"></span>
        </label>
      </div>

      <div class="copyright-text">
        <p>Copyright © 2026 Kabam Games, Inc. A Netmarble Company 版權所有。</p>
      </div>
    </div>
  `,
  styles: [`
    .settings-panel {
      padding: 2rem;
      max-width: 600px;
      margin: 2rem auto;
      border-radius: 12px;
      animation: fadeIn 0.3s ease-out;
      background: rgba(15, 20, 30, 0.85);
      border: 1px solid var(--border-glass);
      backdrop-filter: blur(10px);
      color: var(--text-primary);
    }
    .settings-panel h2 {
      margin-top: 0;
      color: var(--accent-primary);
      margin-bottom: 2rem;
    }
    .setting-group {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
      font-size: 1.1rem;
    }
    .switch {
      position: relative;
      display: inline-block;
      width: 44px;
      height: 24px;
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
    
    .copyright-text {
      margin-top: 3rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--border-glass);
      text-align: center;
      font-size: 0.85rem;
      color: var(--text-muted);
      letter-spacing: 0.5px;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class SettingsComponent {
  talentService = inject(TalentService);

  toggleEditorEnable(event: Event) {
    const input = event.target as HTMLInputElement;
    this.talentService.isEditorEnabled.set(input.checked);
    if (!input.checked && this.talentService.activeTool() === 'editor') {
      this.talentService.activeTool.set('tree');
    }
  }
}

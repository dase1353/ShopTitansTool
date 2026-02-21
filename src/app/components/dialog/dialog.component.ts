import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (dialogService.state().isOpen) {
      <div class="dialog-overlay">
        <div class="dialog-box">
          <div class="dialog-content">
            <p [innerHTML]="dialogService.state().message"></p>
          </div>
          <div class="dialog-actions">
            @if (dialogService.state().type === 'confirm') {
              <button class="btn btn-secondary" (click)="close(false)">取消</button>
            }
            <button class="btn btn-primary" (click)="close(true)">確定</button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .dialog-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }
    .dialog-box {
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-glass);
      border-radius: 12px;
      padding: 1.5rem;
      width: 400px;
      max-width: 90vw;
      box-shadow: 0 10px 40px rgba(0,0,0,0.5);
      color: var(--text-primary);
      font-family: var(--font-body);
      animation: fadeIn 0.2s ease-out;
    }
    .dialog-content {
      margin-bottom: 2rem;
      font-size: 1.1rem;
      line-height: 1.5;
      text-align: center;
    }
    .dialog-actions {
      display: flex;
      justify-content: center;
      gap: 1rem;
    }
    .btn {
      padding: 0.5rem 2rem;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
      border: none;
      transition: opacity 0.2s;
    }
    .btn:hover {
      opacity: 0.8;
    }
    .btn-primary {
      background: var(--accent-primary);
      color: #000;
      box-shadow: 0 0 15px var(--accent-glow);
    }
    .btn-secondary {
      background: transparent;
      border: 1px solid var(--border-glass);
      color: var(--text-secondary);
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
  `]
})
export class DialogComponent {
  dialogService = inject(DialogService);

  close(result: boolean) {
    this.dialogService.close(result);
  }
}

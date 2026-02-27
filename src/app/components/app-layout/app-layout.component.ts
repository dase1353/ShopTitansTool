import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogService } from '../../services/dialog.service';
import { TalentService } from '../../services/talent.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    DialogComponent,
    LucideAngularModule,
    TranslateModule
  ],
  template: `
    <div class="app-layout">
      <!-- Mobile Header (Only visible on mobile) -->
      <header class="mobile-header">
        <button class="menu-toggle" (click)="toggleSidebar()">
          <lucide-icon name="menu" [size]="28" strokeWidth="2"></lucide-icon>
        </button>
        <h3 class="app-title">{{ 'UI.APP_TITLE' | translate }}</h3>
        <div class="header-actions">
          <button class="action-btn" (click)="toggleLanguage()" [title]="'UI.LANGUAGE' | translate">
            <lucide-icon name="languages" [size]="20" strokeWidth="2"></lucide-icon>
          </button>
          <button class="action-btn" (click)="showHelp()" [title]="'UI.HELP' | translate">
            <lucide-icon name="help-circle" [size]="20" strokeWidth="2"></lucide-icon>
          </button>
          <a class="action-btn link-btn" href="https://github.com/dase1353/ShopTitansTool" target="_blank" [title]="'UI.GITHUB' | translate">
            <lucide-icon name="github" [size]="20" strokeWidth="2"></lucide-icon>
          </a>
          <a class="action-btn link-btn" href="https://playshoptitans.com/zh-tw/store" target="_blank" [title]="'UI.WEBSITE' | translate">
            <lucide-icon name="globe" [size]="20" strokeWidth="2"></lucide-icon>
          </a>
        </div>
      </header>

      <!-- Global Sidebar -->
      <aside class="sidebar tools-menu glass-panel" [class.open]="isSidebarOpen">
        <div class="sidebar-brand">
          <div class="banner-logo" [style.backgroundImage]="'url(ShopTitansAssets/Logos/ShopTitans_Logo_RGB_zh-tw.png)'"></div>
        </div>

        <nav class="nav-links">
          <a class="tool-btn" routerLink="/talent" routerLinkActive="active" [title]="'UI.TALENT_TREE' | translate" (click)="closeSidebar()">
            <img src="ShopTitansAssets/Misc Icons/icon_global_skilltree.png" class="menu-icon" [alt]="'UI.TALENT_TREE' | translate" />
          </a>
          
          <a class="tool-btn" routerLink="/game-data" routerLinkActive="active" [title]="'UI.GAME_DATA' | translate" (click)="closeSidebar()">
            <lucide-icon name="database" [size]="28" strokeWidth="2" class="menu-icon"></lucide-icon>
          </a>
          
          <div class="menu-spacer"></div>
          
          <a class="tool-btn" routerLink="/settings" routerLinkActive="active" [title]="'UI.SETTINGS' | translate" (click)="closeSidebar()">
            <lucide-icon name="settings" [size]="28" strokeWidth="2" class="menu-icon"></lucide-icon>
          </a>
        </nav>
      </aside>

      <!-- Sidebar Overlay -->
      <div class="sidebar-overlay" [class.show]="isSidebarOpen" (click)="closeSidebar()"></div>

      <!-- Main Content Area -->
      <main class="main-content">
        <header class="content-header desktop-only">
           <h3 class="app-title">{{ 'UI.APP_TITLE' | translate }}</h3>
           <div class="header-actions">
            <button class="action-btn" (click)="toggleLanguage()" [title]="'UI.LANGUAGE' | translate">
              <lucide-icon name="languages" [size]="20" strokeWidth="2"></lucide-icon>
            </button>
            <button class="action-btn" (click)="showHelp()" [title]="'UI.HELP' | translate">
              <lucide-icon name="help-circle" [size]="20" strokeWidth="2"></lucide-icon>
            </button>
            <a class="action-btn link-btn" href="https://github.com/dase1353/ShopTitansTool" target="_blank" [title]="'UI.GITHUB' | translate">
              <lucide-icon name="github" [size]="20" strokeWidth="2"></lucide-icon>
            </a>
            <a class="action-btn link-btn" href="https://playshoptitans.com/zh-tw/store" target="_blank" [title]="'UI.WEBSITE' | translate">
              <lucide-icon name="globe" [size]="20" strokeWidth="2"></lucide-icon>
            </a>
           </div>
        </header>
        <div class="route-wrapper">
          <router-outlet />
        </div>
      </main>
      
      <!-- Global Dialogs (Modals/Alerts) -->
      <app-dialog />
    </div>
  `,
  styles: [`
    .app-layout {
      display: flex;
      flex-direction: row;
      height: 100vh;
      width: 100%;
      background: radial-gradient(ellipse at top center, var(--bg-surface-elevated) 0%, var(--bg-dark) 100%);
      overflow: hidden;
      position: relative;
    }

    .sidebar {
      width: 80px;
      min-width: 80px;
      border-right: 1px solid var(--border-glass);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1.5rem 0.5rem;
      background: var(--bg-surface-elevated);
      z-index: 50;
      box-shadow: 4px 0 30px rgba(0, 0, 0, 0.5);
    }

    .sidebar-brand {
      margin-bottom: 2.5rem;
      display: flex;
      justify-content: center;
      width: 100%;
    }

    .banner-logo {
      width: 70px;
      height: 48px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.4));
    }

    .nav-links {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      flex: 1;
      width: 100%;
    }

    .menu-spacer {
       flex: 1;
    }

    .tool-btn {
      width: 60px;
      height: 60px;
      border-radius: 12px;
      border: 1px solid transparent;
      background: transparent;
      color: var(--text-secondary);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.3s ease;
      cursor: pointer;
      text-decoration: none;
    }

    .tool-btn:hover {
      background: rgba(255, 255, 255, 0.05);
      color: var(--text-primary);
    }

    .tool-btn.active {
      background: rgba(255, 255, 255, 0.15);
      color: var(--text-primary);
    }

    .menu-icon {
      width: 28px;
      height: 28px;
      object-fit: contain;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;
    }

    .content-header {
      padding: 1rem 2rem;
      background: var(--bg-glass);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border-glass);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .app-title {
      margin: 0;
      font-size: 1.2rem;
      color: var(--text-primary);
      text-transform: uppercase;
      letter-spacing: 2px;
      text-shadow: 0 2px 10px rgba(0,0,0,0.5);
      font-weight: 800;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-left: auto;
    }

    .action-btn {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      border: 1px solid var(--border-glass);
      background: rgba(255, 255, 255, 0.05);
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-weight: bold;
      font-size: 1.1rem;
      transition: all 0.2s ease;
      text-decoration: none;
    }

    .action-btn:hover {
      background: rgba(255, 255, 255, 0.15);
      color: var(--text-primary);
      border-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }
    
    .action-btn:active {
      transform: translateY(0);
    }

    .route-wrapper {
      flex: 1;
      height: 100%;
      width: 100%;
      position: relative;
      overflow: hidden;
    }

    .desktop-only {
      display: flex;
    }
    
    .mobile-header {
      display: none;
    }
    
    .sidebar-overlay {
      display: none;
    }

    @media (max-width: 768px) {
      .app-layout {
        flex-direction: column;
      }
      
      .mobile-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 1rem;
        background: var(--bg-surface-elevated);
        border-bottom: 1px solid var(--border-glass);
        z-index: 60;
      }

      .menu-toggle {
        background: transparent;
        border: none;
        color: var(--text-primary);
        cursor: pointer;
        padding: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .mobile-logo {
        transform: scale(0.8);
        margin: 0 auto;
      }

      .mobile-header .app-title {
        flex: 1;
        text-align: center;
        margin: 0 0.5rem;
        font-size: 1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .desktop-only {
        display: none !important;
      }
      
      .sidebar {
        position: fixed;
        left: -100px;
        top: 0;
        bottom: 0;
        transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 100;
        box-shadow: none;
      }
      
      .sidebar.open {
        left: 0;
        box-shadow: 4px 0 30px rgba(0, 0, 0, 0.8);
      }
      
      .sidebar-overlay {
        display: block;
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.6);
        backdrop-filter: blur(3px);
        z-index: 90;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
      }
      
      .sidebar-overlay.show {
        opacity: 1;
        pointer-events: auto;
      }
    }
  `]
})
export class AppLayoutComponent {
  isSidebarOpen = false;
  private dialog = inject(DialogService);
  private translate = inject(TranslateService);

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  toggleLanguage() {
    const currentLang = this.translate.currentLang;
    const newLang = currentLang === 'zh-TW' ? 'en-US' : 'zh-TW';
    this.translate.use(newLang);
    localStorage.setItem('appLang', newLang);
  }

  showHelp() {
    this.dialog.alert('<strong>【ShopTitans Tool 使用教學】</strong><br><br>1. 在左側選單選擇不同工具。<br>2. 【才華樹】：可編輯測試才華點分配。<br>3. 【遊戲資料】：即將推出。<br><br>如果您覺得好用，歡迎到 GitHub 給我們一顆 Star！');
  }
}

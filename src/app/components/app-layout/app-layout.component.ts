import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../dialog/dialog.component';
import { TalentService } from '../../services/talent.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, DialogComponent],
  template: `
    <div class="app-layout">
      <!-- Mobile Header (Only visible on mobile) -->
      <header class="mobile-header">
        <button class="menu-toggle" (click)="toggleSidebar()">
          <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <h3 class="app-title">ShopTitans Tool</h3>
      </header>

      <!-- Global Sidebar -->
      <aside class="sidebar tools-menu glass-panel" [class.open]="isSidebarOpen">
        <div class="sidebar-brand">
          <div class="banner-logo" [style.backgroundImage]="'url(ShopTitansAssets/Logos/ShopTitans_Logo_RGB.png)'"></div>
        </div>

        <nav class="nav-links">
          <a class="tool-btn" routerLink="/talent" routerLinkActive="active" title="才華樹" (click)="closeSidebar()">
            <img src="ShopTitansAssets/Misc Icons/icon_global_skilltree.png" class="menu-icon" alt="才華樹" />
          </a>
          
          <div class="menu-spacer"></div>
          
          <a class="tool-btn" routerLink="/settings" routerLinkActive="active" title="設定" (click)="closeSidebar()">
            <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none" class="menu-icon">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </a>
        </nav>
      </aside>

      <!-- Sidebar Overlay -->
      <div class="sidebar-overlay" [class.show]="isSidebarOpen" (click)="closeSidebar()"></div>

      <!-- Main Content Area -->
      <main class="main-content">
        <header class="content-header desktop-only">
           <h3 class="app-title">傳奇商店 / ShopTitans Tool</h3>
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
      background: rgba(255, 215, 0, 0.1);
      border-right: 3px solid var(--accent-primary);
      color: var(--accent-primary);
      box-shadow: inset -20px 0 20px -20px var(--accent-glow);
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
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: 1rem;
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

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }
}

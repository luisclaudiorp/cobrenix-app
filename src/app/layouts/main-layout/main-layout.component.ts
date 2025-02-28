import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { ContentContainerComponent } from '../../shared/components/content-container/content-container.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { MainMenuComponent } from '../../shared/components/main-menu/main-menu.component';
import { ThemeService } from '../../core/services/theme.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    BreadcrumbComponent,
    ContentContainerComponent,
    ConfirmDialogComponent,
    MainMenuComponent,
    CommonModule,
    TranslateModule
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  isMenuOpen = false;
  showLogoutDialog = false;
  currentTheme: 'light' | 'dark' = 'light';

  dialogTitle = '';
  dialogMessage = '';

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private translate: TranslateService
  ) {
    this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });
    
    this.translate.get(['LOGOUT.CONFIRM_TITLE', 'LOGOUT.CONFIRM_MESSAGE']).subscribe(translations => {
      this.dialogTitle = translations['LOGOUT.CONFIRM_TITLE'];
      this.dialogMessage = translations['LOGOUT.CONFIRM_MESSAGE'];
    });
  }

  toggleTheme(isDark: boolean) {
    this.themeService.setTheme(isDark ? 'dark' : 'light');
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  logout() {
    this.showLogoutDialog = true;
  }

  onConfirmLogout() {
    this.authService.logout();
    this.showLogoutDialog = false;
    // Força um hard refresh para limpar o estado da aplicação
    window.location.href = '/auth/login';
  }

  onCancelLogout() {
    this.showLogoutDialog = false;
  }
}

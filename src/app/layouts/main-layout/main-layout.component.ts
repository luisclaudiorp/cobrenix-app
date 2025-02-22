import { Component, HostListener, ElementRef } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { ContentContainerComponent } from '../../shared/components/content-container/content-container.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ToggleSwitchComponent } from '../../shared/components/toggle-switch/toggle-switch.component';
import { LanguageSelectorComponent } from '../../shared/components/language-selector/language-selector.component';
import { ThemeService } from '../../core/services/theme.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    BreadcrumbComponent,
    ContentContainerComponent,
    ConfirmDialogComponent,
    ToggleSwitchComponent,
    LanguageSelectorComponent,
    CommonModule,
    TranslateModule
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  isMenuOpen = false;
  activeDropdown: string | null = null;
  showLogoutDialog = false;

  currentTheme: 'light' | 'dark' = 'light';

  constructor(
    private authService: AuthService,
    private router: Router,
    private themeService: ThemeService,
    private elementRef: ElementRef
  ) {
    this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Verifica se o clique foi fora do menu
    if (!this.elementRef.nativeElement.querySelector('.main-nav').contains(event.target as Node)) {
      this.closeMenu();
      this.activeDropdown = null;
    }
  }

  toggleTheme(isDark: boolean) {
    this.themeService.setTheme(isDark ? 'dark' : 'light');
  }

  toggleMenu(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen) {
      this.activeDropdown = null;
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.activeDropdown = null;
  }

  toggleDropdown(menu: string, event: MouseEvent) {
    // Evita que o clique se propague para o documento
    event.stopPropagation();
    
    if (this.activeDropdown === menu) {
      this.activeDropdown = null;
    } else {
      this.activeDropdown = menu;
    }
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

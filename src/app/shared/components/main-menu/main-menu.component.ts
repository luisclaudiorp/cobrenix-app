import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToggleSwitchComponent } from '../toggle-switch/toggle-switch.component';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { AuthService, User } from '../../../core/services/auth.service';

interface MenuItem {
  label: string;
  route?: string;
  icon?: string;
  roles?: string[];
  children?: MenuItem[];
  action?: () => void;
  isLanguageSelector?: boolean;
}

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    ToggleSwitchComponent,
    LanguageSelectorComponent
  ],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss'
})
export class MainMenuComponent implements OnInit {
  @Input() isMenuOpen = false;
  @Input() currentTheme: 'light' | 'dark' = 'light';
  @Output() menuToggle = new EventEmitter<void>();
  @Output() menuClose = new EventEmitter<void>();
  @Output() themeToggle = new EventEmitter<boolean>();
  @Output() logoutClick = new EventEmitter<void>();

  activeDropdown: string | null = null;
  currentUser: User | null = null;
  menuItems: MenuItem[] = [];

  constructor(private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.initializeMenu();
    });
  }

  ngOnInit() {
    this.initializeMenu();
  }

  private initializeMenu() {
    const baseMenu: MenuItem[] = [
      {
        label: 'MENU.HOME',
        route: '/'
      },
      {
        label: 'MENU.CLIENTS',
        children: [
          { label: 'MENU.LIST', route: '/clients/list' },
          { label: 'MENU.REGISTER', route: '/clients/register' }
        ]
      },
      {
        label: 'MENU.PRODUCTS',
        children: [
          { label: 'MENU.LIST', route: '/products/list' },
          { label: 'MENU.REGISTER', route: '/products/register' }
        ]
      },
      {
        label: 'MENU.SALES',
        children: [
          { label: 'MENU.LIST', route: '/sales/list' },
          { label: 'MENU.REGISTER', route: '/sales/register' }
        ]
      }
    ];

    // Menu específico para admin
    const adminMenu: MenuItem[] = [
      {
        label: 'MENU.COMPANIES',
        roles: ['admin'],
        children: [
          { label: 'MENU.LIST', route: '/companies/list' },
          { label: 'MENU.REGISTER', route: '/companies/register' }
        ]
      }
    ];

    // Menu de configurações/outros
    const settingsMenu: MenuItem = {
      label: 'MENU.OTHERS',
      children: [
        {
          label: 'OTHERS_MENU.THEME',
          icon: 'fa-palette',
          action: () => this.toggleTheme()
        },
        {
          label: 'OTHERS_MENU.PROFILE',
          icon: 'fa-user',
          route: '/user/profile'
        },
        {
          label: 'OTHERS_MENU.LANGUAGE',
          icon: 'fa-language'
        },
        {
          label: 'OTHERS_MENU.LOGOUT',
          icon: 'fa-sign-out-alt',
          action: () => this.logout()
        }
      ]
    };

    // Combina os menus baseado na role do usuário
    this.menuItems = [...baseMenu];
    
    if (this.currentUser?.role === 'admin') {
      this.menuItems.splice(3, 0, ...adminMenu); // Insere após o menu de vendas
    }
    
    this.menuItems.push(settingsMenu);
  }

  toggleMenu() {
    this.menuToggle.emit();
  }

  closeMenu() {
    this.menuClose.emit();
    this.activeDropdown = null;
  }

  toggleDropdown(menu: string, event: MouseEvent) {
    event.stopPropagation();
    this.activeDropdown = this.activeDropdown === menu ? null : menu;
  }

  toggleTheme() {
    this.themeToggle.emit(this.currentTheme === 'light');
  }

  logout() {
    this.logoutClick.emit();
  }

  hasAccess(item: MenuItem): boolean {
    if (!item.roles) return true;
    return item.roles.includes(this.currentUser?.role || '');
  }
}

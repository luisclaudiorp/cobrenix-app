import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'theme';
  private isBrowser: boolean;
  private themeSubject = new BehaviorSubject<Theme>('dark');
  public theme$ = this.themeSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.initializeTheme();
  }

  private initializeTheme(): void {
    if (this.isBrowser) {
      // Tenta recuperar o tema salvo
      const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
      if (savedTheme) {
        this.setTheme(savedTheme);
      } else {
        // Verifica a preferência do sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.setTheme(prefersDark ? 'dark' : 'light');
      }
    }
  }

  setTheme(theme: Theme): void {
    if (this.isBrowser) {
      document.body.classList.remove('light-theme', 'dark-theme');
      document.body.classList.add(`${theme}-theme`);
      localStorage.setItem(this.THEME_KEY, theme);
    }
    this.themeSubject.next(theme);
  }

  toggleTheme(): void {
    const currentTheme = this.themeSubject.value;
    this.setTheme(currentTheme === 'light' ? 'dark' : 'light');
  }

  getCurrentTheme(): Theme {
    return this.themeSubject.value;
  }
}

import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoadingService } from './loading.service';
import { TranslateService } from '@ngx-translate/core';

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isBrowser: boolean;


  // Mock users for testing
  private readonly mockUsers: { email: string; password: string; user: User }[] = [
    {
      email: 'admin@cobrenix.com',
      password: 'admin123',
      user: { id: 1, email: 'admin@cobrenix.com', name: 'Administrator', role: 'admin' }
    },
    {
      email: 'vendas@cobrenix.com',
      password: 'vendas123',
      user: { id: 2, email: 'vendas@cobrenix.com', name: 'Sales', role: 'sales' }
    }
  ];

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private loadingService: LoadingService,
    private translate: TranslateService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      // Try to restore user session immediately
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          this.currentUserSubject.next(user);
        } catch (e) {
          localStorage.removeItem('currentUser');
        }
      }
    }
  }

  login(email: string, password: string): Observable<User> {
    const user = this.mockUsers.find(u => u.email === email && u.password === password)?.user;
    
    if (!user) {
      return throwError(() => new Error(this.translate.instant('LOGIN.ERROR')));
    }

    // Store user data
    if (this.isBrowser) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    this.currentUserSubject.next(user);

    return of(user);
  }

  logout(): void {
    // Salva as preferências do usuário
    const currentLang = localStorage.getItem('selected-language');
    const currentTheme = localStorage.getItem('theme');
    
    // Limpa todos os dados do localStorage
    if (this.isBrowser) {
      localStorage.clear();
    }
    
    // Restaura as preferências
    if (currentLang) {
      localStorage.setItem('selected-language', currentLang);
    }
    if (currentTheme) {
      localStorage.setItem('theme', currentTheme);
    }
    
    // Limpa o usuário atual
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    const currentUser = this.currentUserSubject.value;
    if (!currentUser) {
      return false;
    }
    // Check if user exists in mock users list
    return this.mockUsers.some(u => u.user.id === currentUser.id);
  }

  getCurrentUser(): User | null {
    const currentUser = this.currentUserSubject.value;
    if (!currentUser) {
      return null;
    }
    // Return a copy of the user to prevent direct modifications
    return { ...currentUser };
  }

  initializeAuth(): void {
    // Hide loading after a small delay
    setTimeout(() => {
      this.loadingService.hide();
    }, 500);
  }
}

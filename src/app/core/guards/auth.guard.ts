import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Se a rota tem skipAuth, permite o acesso
    if (route.data['skipAuth']) {
      return true;
    }

    // Se não está autenticado, redireciona para login
    if (!this.authService.isAuthenticated()) {
      window.location.href = '/auth/login';
      return false;
    }

    return true;
  }
}
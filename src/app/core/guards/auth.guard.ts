import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!!route.data?.['skipAuth']) {
      return true;
    }

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    return true;
  }
}

import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: { skipAuth: true }
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'clients',
        children: [
          {
            path: 'list',
            component: HomeComponent  // Temporário
          },
          {
            path: 'register',
            component: HomeComponent  // Temporário
          },
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'products',
        children: [
          {
            path: 'list',
            component: HomeComponent  // Temporário
          },
          {
            path: 'register',
            component: HomeComponent  // Temporário
          },
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'sales',
        children: [
          {
            path: 'list',
            component: HomeComponent  // Temporário
          },
          {
            path: 'register',
            component: HomeComponent  // Temporário
          },
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'user',
        children: [
          {
            path: 'profile',
            loadComponent: () => import('./features/user/pages/profile/profile.component').then(m => m.ProfileComponent)
          }
        ]
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login'
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];

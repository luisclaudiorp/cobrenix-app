import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { CompaniesComponent } from './features/companies/companies.component';
import { ClientsComponent } from './features/clients/clients.component';
import { ProductsComponent } from './features/products/products.component';
import { SalesComponent } from './features/sales/sales.component';

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
            component: ClientsComponent
          },
          {
            path: 'register',
            component: ClientsComponent
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
            component: ProductsComponent
          },
          {
            path: 'register',
            component: ProductsComponent
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
            component: SalesComponent
          },
          {
            path: 'register',
            component: SalesComponent
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
      },
      {
        path: 'companies',
        canActivate: [AdminGuard],
        children: [
          {
            path: 'list',
            component: CompaniesComponent
          },
          {
            path: 'register',
            component: CompaniesComponent
          },
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
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

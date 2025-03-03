import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CompaniesListComponent } from './components/list/companies-list.component';
import { CompaniesFormComponent } from './components/form/companies-form.component';
import { CompaniesService } from './services/companies.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CompaniesListComponent,
    CompaniesFormComponent,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: CompaniesListComponent
      },
      {
        path: 'new',
        component: CompaniesFormComponent
      },
      {
        path: 'edit/:id',
        component: CompaniesFormComponent
      }
    ])
  ],
  providers: [CompaniesService]
})
export class CompaniesModule { }
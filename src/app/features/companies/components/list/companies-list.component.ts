import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CompaniesService } from '../../services/companies.service';
import { Company, CompanyFilters } from '../../interfaces/company.interface';
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { TranslateModule } from '@ngx-translate/core';
import { CompanyCardComponent } from '../company-card/company-card.component';
import { SelectComponent } from '../../../../shared/components/select/select.component';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, InputComponent, TranslateModule, CompanyCardComponent, SelectComponent]
})
export class CompaniesListComponent implements OnInit {
  companies: Company[] = [];
  loading = false;
  filterForm!: FormGroup;
  activeControl!: FormControl;

  constructor(
    private companiesService: CompaniesService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.activeControl = new FormControl(null);

    this.filterForm = this.fb.group({
      name: [''],
      email: [''],
      active: this.activeControl
    });

    this.filterForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.loadCompanies();
      });
  }

  ngOnInit() {
    this.loadCompanies();
  }

  private loadCompanies() {
    this.loading = true;
    const filters: CompanyFilters = {};

    if (this.filterForm.value.name) {
      filters.name = this.filterForm.value.name;
    }

    if (this.filterForm.value.email) {
      filters.email = this.filterForm.value.email;
    }

    if (this.filterForm.value.active !== null) {
      filters.active = this.filterForm.value.active;
    }

    this.companiesService.getAll(filters).subscribe({
      next: (companies) => {
        this.companies = companies;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading companies:', error);
        this.loading = false;
      }
    });
  }

  clearFilters() {
    this.filterForm.reset();
  }

  navigateToNew() {
    this.router.navigate(['/companies/new']);
  }

  navigateToEdit(id: number) {
    this.router.navigate(['/companies/edit', id]);
  }

  toggleStatus(company: Company) {
    if (!company.id) return;
    
    const updatedCompany = { ...company, active: !company.active };
    this.companiesService.update(company.id, updatedCompany).subscribe({
      next: () => {
        this.loadCompanies();
      },
      error: (error) => {
        console.error('Error updating company status:', error);
      }
    });
  }
}
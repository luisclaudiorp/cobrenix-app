import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CompaniesService } from '../../services/companies.service';
import { Company, CompanyFilters } from '../../interfaces/company.interface';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class CompaniesListComponent implements OnInit {
  companies: Company[] = [];
  loading = false;
  filterForm: FormGroup;

  constructor(
    private companiesService: CompaniesService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      name: [''],
      email: [''],
      active: [null]
    });
  }

  ngOnInit() {
    this.setupFilterListener();
    this.loadCompanies();
  }

  private setupFilterListener() {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.loadCompanies();
      });
  }

  loadCompanies() {
    this.loading = true;
    const formValue = this.filterForm.value;
    const filters: CompanyFilters = {};

    // Adiciona apenas valores válidos aos filtros
    if (formValue.name?.trim()) {
      filters.name = formValue.name.trim();
    }
    if (formValue.email?.trim()) {
      filters.email = formValue.email.trim();
    }
    if (formValue.active !== null && formValue.active !== undefined) {
      filters.active = formValue.active;
    }

    this.companiesService.getAll(filters).subscribe({
      next: (companies) => {
        this.companies = companies;
        this.loading = false;
      },
      error: (error: Error) => {
        console.error('Error loading companies:', error);
        this.loading = false;
      }
    });
  }

  createCompany() {
    this.router.navigate(['/companies/new']);
  }

  editCompany(id: number) {
    this.router.navigate(['/companies/edit', id]);
  }

  deleteCompany(id: number) {
    if (confirm('Tem certeza que deseja excluir esta empresa?')) {
      this.companiesService.delete(id).subscribe({
        next: () => {
          this.loadCompanies();
        },
        error: (error: Error) => {
          console.error('Error deleting company:', error);
        }
      });
    }
  }

  clearFilters() {
    this.filterForm.patchValue({
      name: '',
      email: '',
      active: null
    });
    this.loadCompanies();
  }
}
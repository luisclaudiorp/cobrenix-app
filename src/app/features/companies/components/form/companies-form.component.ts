import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompaniesService } from '../../services/companies.service';
import { Company } from '../../interfaces/company.interface';

@Component({
  selector: 'app-companies-form',
  templateUrl: './companies-form.component.html',
  styleUrls: ['./companies-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class CompaniesFormComponent implements OnInit {
  form: FormGroup;
  isEditing = false;
  companyId: number | null = null;
  loading = false;
  saving = false;

  constructor(
    private fb: FormBuilder,
    private companiesService: CompaniesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      active: [true],
      config: [{}]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditing = true;
      this.companyId = Number(id);
      this.loadCompany(this.companyId);
    }
  }

  private loadCompany(id: number) {
    this.loading = true;
    this.companiesService.getAll({ id }).subscribe({
      next: (companies) => {
        if (companies.length > 0) {
          this.form.patchValue(companies[0]);
        }
        this.loading = false;
      },
      error: (error: Error) => {
        console.error('Error loading company:', error);
        this.loading = false;
        this.router.navigate(['/companies']);
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.saving = true;
      const company: Company = this.form.value;

      const request = this.isEditing && this.companyId
        ? this.companiesService.update(this.companyId, company)
        : this.companiesService.create(company);

      request.subscribe({
        next: () => {
          this.saving = false;
          this.router.navigate(['/companies']);
        },
        error: (error: Error) => {
          console.error('Error saving company:', error);
          this.saving = false;
        }
      });
    } else {
      this.markFormGroupTouched(this.form);
    }
  }

  cancel() {
    this.router.navigate(['/companies']);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
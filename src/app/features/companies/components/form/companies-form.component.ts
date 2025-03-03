import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompaniesService } from '../../services/companies.service';
import { Company } from '../../interfaces/company.interface';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { JsonInputComponent } from '../../../../shared/components/json-input/json-input.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-companies-form',
  templateUrl: './companies-form.component.html',
  styleUrls: ['./companies-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, InputComponent, JsonInputComponent, TranslateModule]
})
export class CompaniesFormComponent implements OnInit {
  form!: FormGroup;
  nameControl!: FormControl;
  emailControl!: FormControl;
  configControl!: FormControl;
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
    this.initializeForm();
  }

  private initializeForm() {
    this.nameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
    this.emailControl = new FormControl('', [Validators.required, Validators.email]);
    this.configControl = new FormControl('');

    this.form = this.fb.group({
      name: this.nameControl,
      email: this.emailControl,
      active: [true],
      config: this.configControl
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
          const company = companies[0];
          this.form.patchValue({
            ...company,
            config: company.config ? JSON.stringify(company.config, null, 2) : ''
          });
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
      const formValue = this.form.value;
      const company: Company = {
        ...formValue,
        config: formValue.config ? JSON.parse(formValue.config) : {}
      };

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
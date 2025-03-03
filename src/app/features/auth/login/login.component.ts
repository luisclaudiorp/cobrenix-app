import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { InputComponent } from '../../../shared/components/input/input.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, InputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: []
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  emailControl!: FormControl;
  passwordControl!: FormControl;
  loading = false;
  error = '';


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.emailControl = new FormControl('', [Validators.required, Validators.email]);
    this.passwordControl = new FormControl('', [Validators.required]);

    this.loginForm = this.formBuilder.group({
      email: this.emailControl,
      password: this.passwordControl,
      remember: [false]
    });

    // Se já estiver autenticado, redireciona para a home
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
      return;
    }


  }



  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.error = 'LOGIN.ERROR';
        this.loading = false;
      }
    });
  }


}

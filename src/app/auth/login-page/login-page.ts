import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  private readonly fb = inject(FormBuilder)
  private readonly auth = inject(AuthService)
  private readonly router = inject(Router)

  readonly form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  errorMessage: string | null = null

  get email() {
    return this.form.get('email')
  }

  get password() {
    return this.form.get('password')
  }

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }

    const { email, password } = this.form.value

    if (!email || !password) return;

    this.errorMessage = null

    try {
      await this.auth.signIn(email, password)
      await this.router.navigate(['/dashboard'])
    } catch (error: any) {
      console.error('Login failed', error)
      this.errorMessage = 'Login failed. Check your email and password.'
    }
  }

  get isLoading(): boolean {
    return this.auth.isLoading()
  }



























}

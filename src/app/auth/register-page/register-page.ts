import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { UserRole } from '../models/auth.models';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
  private readonly fb = inject(FormBuilder)
  private readonly auth = inject(AuthService)
  private readonly router = inject(Router)

  readonly form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['user' as UserRole, [Validators.required]]
  })

  errorMessage: string | null = null

  get email() {
    return this.form.get('email')
  }

  get password() {
    return this.form.get('password')
  }

  get role() {
    return this.form.get('role')
  }

  get isLoading(): boolean {
    return this.auth.isLoading()
  }

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }

    const { email, password, role } = this.form.value

    if (!email || !password || !role) return;

    this.errorMessage = null

    try {
      await this.auth.signUp(email, password, role as UserRole)
      await this.router.navigate(['/dashboard'])
    } catch (error) {
      console.error('Sign up failed', error);
      this.errorMessage = 'Could not create account. Try again.';
    }

  }













}

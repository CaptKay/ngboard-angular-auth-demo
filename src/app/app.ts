import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, } from '@angular/router';
import { AuthService } from './auth/services/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly auth = inject(AuthService)
  protected readonly title = signal('NgBoard - Modern Angular 20');

  readonly router = inject(Router)

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn()
  }

  get isAuthLoading(): boolean {
    return this.auth.isLoading()
  }

  get currentUserEmail(): string | null {
    return this.auth.currentUser()?.email ?? null
  }

  get currentRole(): string | null {
    return this.auth.role() ?? null
  }



  async logout() {
    await this.auth.signOut()
    await this.router.navigate(['/login'])
  }



}

import { computed, Injectable, signal } from '@angular/core';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User, UserProfile } from 'firebase/auth';
import { firebaseAuth, firebaseDb } from '../../firebase';
import { UserRole } from '../models/auth.models';
import { doc, getDoc, setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _currentUser = signal<User | null>(null)
  private readonly _isLoading = signal(true)
  private readonly _role = signal<UserRole | null>(null)

  readonly currentUser = computed(() => this._currentUser())
  readonly isLoading = computed(() => this._isLoading())
  readonly isLoggedIn = computed(() => this._currentUser() !== null)
  readonly role = computed(() => this._role())

  constructor() {
    onAuthStateChanged(firebaseAuth, async (user) => {
      this._currentUser.set(user)

      if (user) {
        const profile = await this.loadUserProfile(user)
        this._role.set((profile?.['role'] as UserRole | undefined) ?? 'user')
      } else {
        this._role.set(null)
      }

      this._isLoading.set(false)
    })
  }

  async signIn(email: string, password: string): Promise<void> {
    this._isLoading.set(true)
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password)
    } finally {
      this._isLoading.set(false)
    }
  }


  async signOut(): Promise<void> {
    this._isLoading.set(true)
    try {
      await signOut(firebaseAuth)
    } finally {
      this._isLoading.set(false)
    }
  }

  async signUp(email: string, password: string, role: UserRole = 'user'): Promise<void> {
    this._isLoading.set(true)
    try {
      const cred = await createUserWithEmailAndPassword(firebaseAuth, email, password)
      const user = cred.user

      const profile: UserProfile = {
        uid: user.uid,
        email: user.email ?? email,
        role,
      }

      await setDoc(doc(firebaseDb, 'users', user.uid), profile)

    } finally {
      this._isLoading.set(false)
    }
  }

  private async loadUserProfile(user: User): Promise<UserProfile | null>{

    const ref = doc(firebaseDb, 'users', user.uid)
    const snap = await getDoc(ref)

    if(!snap.exists()){
      return null
    }

    return snap.data() as UserProfile
  }

  hasRole(role: UserRole): boolean{
    return this.role() === role
  }

  hasAnyRole(roles: UserRole[]): boolean {
    const current = this.role()
    if(!current) return false;
    return roles.includes(current)
  }




























}

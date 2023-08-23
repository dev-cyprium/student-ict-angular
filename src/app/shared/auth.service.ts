import { Injectable, OnDestroy, inject } from '@angular/core';
import { User } from './user';
import {
  Auth,
  GoogleAuthProvider,
  authState,
  signInWithPopup,
} from '@angular/fire/auth';
import { OrNull } from './types';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  auth = inject(Auth);
  router = inject(Router);
  authState = authState(this.auth);
  user: OrNull<User> | null = null;
  subscription: Subscription;

  constructor() {
    this.subscription = this.authState.subscribe((user) => {
      this.user = user;
    });
  }

  loginWithGoogle(): void {
    signInWithPopup(this.auth, new GoogleAuthProvider()).then((result) => {
      if (result.user) {
        this.router.navigate(['/']);
      }
    });
  }

  isUserLoggedIn(): boolean {
    return this.user !== null;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

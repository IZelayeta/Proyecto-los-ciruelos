import { Injectable, inject } from '@angular/core';
import {
  Auth,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  User
} from '@angular/fire/auth';
import { Observable } from 'rxjs';

export interface Credential {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);

  readonly authState$: Observable<User | null> = authState(this.auth);

  registerWithEmailAndPassword(credential: Credential): Promise<UserCredential> {
    return createUserWithEmailAndPassword(
      this.auth,
      credential.email,
      credential.password
    );
  }

  loginWithEmailAndPassword(credential: Credential): Promise<UserCredential> {
    return signInWithEmailAndPassword(
      this.auth,
      credential.email,
      credential.password
    );
  }

  async getToken(): Promise<string> {
    const user = this.auth.currentUser;
    if (user) {
      try {
        return await user.getIdToken();
      } catch (error) {
        console.error('Error getting token:', error);
        throw new Error('Failed to get token');
      }
    } else {
      throw new Error('No user is logged in');
    }
  }
}

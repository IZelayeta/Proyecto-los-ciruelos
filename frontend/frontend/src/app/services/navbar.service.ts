import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private userRole: string | null = null; 

  constructor() {}

  getUserRole(): string | null {
    return this.userRole;
  }

  setUserRole(role: string): void {
    this.userRole = role;
  }


  logout(): void {
    this.userRole = null;
  }
}
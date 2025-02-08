import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  constructor() {}

  getUserRole(): string | null {
    return localStorage.getItem('userRole');  // Obtiene el rol almacenado
  }

  setUserRole(role: string) {
    localStorage.setItem('userRole', role);  // Guarda el rol en el almacenamiento local
  }

  logout() {
    localStorage.removeItem('userRole');  // Elimina el rol al cerrar sesión
  }
}

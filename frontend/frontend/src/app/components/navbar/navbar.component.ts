import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: Observable<User | null>;  // Observable que contiene el estado del usuario
  currentUrl: string = '';

  constructor(private router: Router, private authService: AuthService) {
    this.user = this.authService.authState$;  // Observa el estado del usuario
  }

  ngOnInit() {
    // Detecta cambios en la URL
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
  }

  navigateOrScroll(sectionId: string) {
    if (this.currentUrl !== '/') {
      // Si no está en el home, redirigir primero al home
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this.scrollToSection(sectionId), 100); // Espera a que cargue el home
      });
    } else {
      // Si ya está en el home, hacer scroll directo
      this.scrollToSection(sectionId);
    }
  }

  // Método para manejar el logout
  logout(): void {
    this.authService.logout();
  }

  private scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}


import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../../services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userRole: string | null = null;

  constructor(private navbarService: NavbarService) {}

  ngOnInit() {
    console.log('Navbar cargada');
    this.userRole = this.navbarService.getUserRole();
    console.log('Rol de usuario:', this.userRole);
  }
  
  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault(); // Evita que el enlace se abra como un link tradicional
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' }); // Desplazamiento suave hacia la sección
    }
  }
  logout() {
    this.navbarService.logout();
    this.userRole = null; 
  }
}

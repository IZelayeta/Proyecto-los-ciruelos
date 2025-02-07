
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
    this.userRole = this.navbarService.getUserRole(); 
  }

  logout() {
    this.navbarService.logout();
    this.userRole = null; 
  }
}

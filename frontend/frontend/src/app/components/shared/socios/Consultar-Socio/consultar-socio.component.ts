import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../services/auth.service';

// Interfaz para definir la estructura de socio
interface Socio {
  id: number;
  nombre: string;
  email: string; // Campo de correo electrónico añadido
  fechaAsociacion: Date;
  profesor: string;
}

// Interfaz para definir la estructura de jugador
interface Jugador {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-consultar-socio',
  templateUrl: './consultar-socio.component.html',
  styleUrls: ['./consultar-socio.component.css']
})
export class ConsultarSocioComponent implements OnInit {

  // Datos de ejemplo de socios, ahora con correo electrónico
  socios: Socio[] = [
    { id: 1, nombre: 'Juan Perez', email: 'juan.perez@example.com', fechaAsociacion: new Date(2023, 5, 1), profesor: 'Profesor 1' },
    { id: 2, nombre: 'Ana Gómez', email: 'ana.gomez@example.com', fechaAsociacion: new Date(2022, 3, 15), profesor: 'Profesor 2' },
    { id: 3, nombre: 'Carlos López', email: 'carlos.lopez@example.com', fechaAsociacion: new Date(2021, 7, 10), profesor: 'Profesor 1' },
  ];

  sociosFiltrados: Socio[] = [...this.socios]; // Inicializa con todos los socios
  searchTerm: string = '';
  searchEmail: string = ''; // Nueva propiedad para buscar por email
  filtroOrden: string = '';
  filtroProfesor: string = '';
  mostrarModal: boolean = false;
  socioSeleccionado: Socio | null = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.filtrarYOrdenar();
  }

  // Filtra y ordena la lista de socios
  filtrarYOrdenar(): void {
    let filtrados = this.socios.filter(socio =>
      socio.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      socio.email.toLowerCase().includes(this.searchEmail.toLowerCase()) // Filtrado por email
    );

    if (this.filtroProfesor) {
      filtrados = filtrados.filter(socio => socio.profesor === this.filtroProfesor);
    }

    switch (this.filtroOrden) {
      case 'nombre':
        filtrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case 'fecha':
        filtrados.sort((a, b) => a.fechaAsociacion.getTime() - b.fechaAsociacion.getTime());
        break;
    }

    this.sociosFiltrados = filtrados;
  }

  // Maneja el evento de búsqueda
  onSearch() {
    this.filtrarYOrdenar(); // Se llama a la función de filtrado y ordenación
  }

  // Cambia el orden de filtrado
  onOrdenarCambio(filtro: string): void {
    this.filtroOrden = filtro;
    this.filtrarYOrdenar();
  }

  // Filtra por profesor
  onFiltrarProfesorCambio(profesor: string): void {
    this.filtroProfesor = profesor;
    this.filtrarYOrdenar();
  }

  // Elimina filtros y muestra la lista completa
  eliminarFiltros(): void {
    this.searchTerm = '';
    this.searchEmail = ''; // Limpiar búsqueda por email
    this.filtroOrden = '';
    this.filtroProfesor = '';
    this.filtrarYOrdenar();
  }

  // Muestra los detalles del socio seleccionado
  verDetalles(socio: Socio): void {
    this.socioSeleccionado = socio;
    this.mostrarModal = true;
  }

  // Cierra el modal de detalles
  cerrarModal(): void {
    this.mostrarModal = false;
    this.socioSeleccionado = null;
  }

  // Elimina un socio por ID y actualiza la tabla
  eliminarSocio(id: number): void {
    this.socios = this.socios.filter(socio => socio.id !== id);
    this.filtrarYOrdenar();
  }
}

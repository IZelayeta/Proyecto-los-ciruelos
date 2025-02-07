import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../services/auth.service';

interface Socio {
  id: number;
  nombre: string;
  email: string;
  fechaAsociacion: Date;
  rol: string;
  categoria: string | null;
  fotoUrl: string;
  asociado: boolean; 
}

@Component({
  selector: 'app-consultar-socio',
  templateUrl: './consultar-socio.component.html',
  styleUrls: ['./consultar-socio.component.css']
})
export class ConsultarSocioComponent implements OnInit {

  socios: Socio[] = [];
  sociosFiltrados: Socio[] = [];
  sociosNoAsociados: Socio[] = [];  
  searchTerm: string = '';
  searchEmail: string = '';
  searchApellido: string = ''; 
  filtroOrden: string = '';
  filtroRol: string = '';  
  mostrarModal: boolean = false;
  mostrarModalAsociar: boolean = false;
  socioSeleccionado: Socio | null = null;

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarSocios();
  }

  cargarSocios(): void {

    this.http.get<Socio[]>('ruta-del-backend/socios').subscribe(data => {
      this.socios = data;
      this.sociosNoAsociados = data.filter(socio => !socio.asociado); 
      this.actualizarLista();
    });
  }

  actualizarLista(): void {
    this.sociosFiltrados = this.socios.filter(socio =>
      (this.searchTerm ? socio.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) : true) &&
      (this.searchEmail ? socio.email.toLowerCase().includes(this.searchEmail.toLowerCase()) : true) &&
      (this.searchApellido ? socio.nombre.split(' ')[1]?.toLowerCase().includes(this.searchApellido.toLowerCase()) : true) &&  // Filtro por apellido
      (this.filtroRol ? socio.rol.toLowerCase() === this.filtroRol.toLowerCase() : true)
    );

    if (this.filtroOrden) {
      this.sociosFiltrados.sort((a, b) =>
        this.filtroOrden === 'nombre'
          ? a.nombre.localeCompare(b.nombre)
          : a.fechaAsociacion.getTime() - b.fechaAsociacion.getTime()
      );
    }
  }

  onSearch(): void {
    this.actualizarLista();
  }

  onOrdenarCambio(filtro: string): void {
    this.filtroOrden = filtro;
    this.actualizarLista();
  }

  onRolCambio(filtro: string): void {
    this.filtroRol = filtro;
    this.actualizarLista();
  }

  eliminarFiltros(): void {
    this.searchTerm = '';
    this.searchEmail = '';
    this.searchApellido = '';
    this.filtroOrden = '';
    this.filtroRol = '';
    this.actualizarLista();
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.socioSeleccionado = null;
  }

  confirmarEliminacion(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este socio?')) {
      this.eliminarSocio(id);
    }
  }

  eliminarSocio(id: number): void {
    this.socios = this.socios.filter(socio => socio.id !== id);
    this.sociosNoAsociados = this.sociosNoAsociados.filter(socio => socio.id !== id); 
    this.actualizarLista();
  }

  asociarNuevo(): void {
    this.mostrarModalAsociar = true;
  }

  asociarSocio(socio: Socio): void {
    socio.asociado = true;  
    this.sociosNoAsociados = this.sociosNoAsociados.filter(s => s.id !== socio.id); 
    
    const linkPago = `https://www.mercadopago.com.ar/pagar/${socio.id}`;
    this.enviarCorreo(socio.email, linkPago);
    
    alert(`Socio ${socio.nombre} ha sido asociado y se le envió un correo con el link de pago.`);
    this.actualizarLista();
  }

  enviarCorreo(email: string, link: string): void {
    const payload = { email, link };
    this.http.post('ruta-del-backend/enviar-correo', payload).subscribe(
      response => console.log('Correo enviado con éxito', response),
      error => console.error('Error al enviar el correo', error)
    );
  }

  cerrarModalAsociar(): void {
    this.mostrarModalAsociar = false;
  }
}

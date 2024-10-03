import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface Reservation {
  courtId: number;
  timeSlot: string;
  price: number;
  date: string;
}

export interface Court {
  id: number;
  name: string;
}

@Component({
  selector: 'app-calendario_reserva',
  templateUrl: './calendario_reserva.component.html',
  styleUrl: './calendario_reserva.component.css'
})
export class CalendarioReservaComponent implements OnInit {

  ngOnInit() {
    this.loadReservations(this.selectedDate);
  }

  constructor(private router: Router) {}

// ---------------------------------------- VAR -----------------------------------------------
  selectedDate: string = new Date().toISOString().split('T')[0];
  minDate: string = this.getMinDate();
  currentHour: number = new Date().getHours();
  selectedCell: any = null;
  selectedDuration: number | null = null;
  selectedStartTime: string = '';


// ---------------------------------------- Intervalos de tiempo disponibles -----------------------------------------------
  timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
  ];

// ---------------------------------------- Canchas disponibles ----------------------------------------
  courts: Court[] = [
    { id: 1, name: 'Cancha 1' },
    { id: 2, name: 'Cancha 2' },
    { id: 3, name: 'Cancha 3' },
    { id: 4, name: 'Cancha 4' }
  ];

// ---------------------------------------- Reservas existentes ----------------------------------------
  reservations: Reservation[] = [
    { courtId: 1, timeSlot: '08:00', price: 20000, date: '2024-08-21' },
    { courtId: 1, timeSlot: '11:00', price: 20000, date: '2024-08-21' },
    { courtId: 2, timeSlot: '14:00', price: 20000, date: '2024-08-22' },
    { courtId: 3, timeSlot: '20:00', price: 20000, date: '2024-08-22' },
    { courtId: 3, timeSlot: '21:00', price: 20000, date: '2024-08-22' },
  ];

// ---------------------------------------- Tooltip ----------------------------------------

  tooltipVisible = false;
  tooltipCourt: Court | null = null;
  tooltipSlot: string = '';
  tooltipPrice!: number;
  tooltipPosition = { top: 0, left: 0 };

  showTooltip(event: MouseEvent, court: Court, slot: string) {
    this.tooltipVisible = true;
    this.tooltipCourt = court;
    this.tooltipSlot = slot;
    this.tooltipPosition.top = event.clientY + 15;
    this.tooltipPosition.left = event.clientX + 15;
  }

  hideTooltip() {
    this.tooltipVisible = false;
  }

// ---------------------------------------- Menú de opciones ----------------------------------------
  showOptionsMenu = false;
  showContinueButton = false; 
  optionsMenuPosition = { top: 0, left: 0 };
  highlightedCells: { courtId: number, slot: string }[] = [];
  halfHighlightedCell: { courtId: number, slot: string } | null = null;
  selectedCourt: any;
  selectedSlot: string | undefined;

  hideOptionsMenu(): void {
    this.showOptionsMenu = false; 
  }

  showTimeOptions(court: any, slot: string, event: any) {
    this.selectedCourt = court;
    this.selectedSlot = slot;
    this.showOptionsMenu = true;
    this.optionsMenuPosition.top = event.clientY;
    this.optionsMenuPosition.left = event.clientX;
  }

  selectOption(duration: number) {
    this.selectedDuration = duration;
    this.highlightCells();  // Agregar lógica para resaltar las celdas
    this.showOptionsMenu = true;
    this.showContinueButton = true; // Muestra el botón de continuar después de seleccionar el tiempo
}

  redirectToTicket() {
    console.log('Botón de continuar presionado');
    console.log('selectedDuration:', this.selectedDuration);
    console.log('selectedCell:', this.selectedSlot);
    
    if (this.selectedDuration != null) {
      
        this.router.navigate(['/ticket'], {
            queryParams: {
                date: this.selectedDate, //fecha
                time: this.selectedSlot, //hora
                court: this.selectedCourt.name, //cancha
                price: this.calculatePrice(this.selectedDuration), //precio
                senia: this.calculatePrice((this.selectedDuration)*0.5), //seña
                duracion: this.selectedDuration, 
            }
        });
    }
  }

//---------------------------------------- Logica de Dias ---------------------------------------- 
  getMinDate(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedDate = input.value;
    this.minDate = this.getMinDate(); // Actualiza la fecha mínima
    this.loadReservations(this.selectedDate);
  
    // Limpiar las celdas seleccionadas al cambiar de fecha
    this.clearSelectedCells();
    this.hideOptionsMenu();
  }

  
// ---------------------------------------- RESERVA ----------------------------------------
  loadReservations(date: string) {
    // Simular la carga de reservas para la fecha seleccionada
    console.log(`Cargando reservas para la fecha: ${date}`);
    // Aquí se podría llamar a un servicio para obtener las reservas reales desde el backend
  }

  makeReservation(courtId: number, timeSlot: string, date: string, price: number): void {
    const reservation: Reservation = {
      courtId,
      timeSlot,
      price,
      date
    };
    console.log('Reserva realizada:', reservation);
    // Aquí se podría llamar a un servicio para enviar la reserva al backend
  }

// ---------------------------------------- lOGICA DE CELDA ---------------------------------------- 
  clearSelectedCells(): void {
    this.highlightedCells = [];
    this.halfHighlightedCell = null;
    
  }

  selectCell(cell: any): void {
    this.selectedCell = cell;
    this.selectedStartTime = cell.time;
    this.selectedDuration = null;  // Reiniciar duración si se selecciona otra celda
  }

  isHighlighted(courtId: number, slot: string): boolean {
    return this.highlightedCells.some(cell => cell.courtId === courtId && cell.slot === slot);
  }

  isHalfHighlighted(courtId: number, slot: string): boolean {
    return this.halfHighlightedCell !== null && this.halfHighlightedCell.courtId === courtId && this.halfHighlightedCell.slot === slot;
  }

  highlightCells() {
    if (this.selectedCell && this.selectedDuration) {
        const startIndex = this.timeSlots.indexOf(this.selectedStartTime);
        for (let i = 0; i < this.selectedDuration; i++) {
            const timeIndex = startIndex + i;
            if (timeIndex < this.timeSlots.length) {
                this.highlightedCells.push({
                    courtId: this.selectedCourt.id,
                    slot: this.timeSlots[timeIndex]
                });
            }
        }
    }
  }

// ---------------------------------------- No deja seleccionar los horarios ocupados, los dias pasados y horarios pasados ---------------------------------------- 

  isPastTime(slot: string): boolean {
    const [hour, minute] = slot.split(':').map(Number);
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    if (this.selectedDate < this.minDate) {
      return true; // Si la fecha seleccionada es antes de la fecha mínima, marcar como pasada.
    }

    if (this.selectedDate === this.minDate) {
      return hour < currentHour || (hour === currentHour && minute <= currentMinute);
    }

    return false; 
  }

  isReserved(courtId: number, slot: string): boolean {
    return this.reservations.some(
      res => res.courtId === courtId && res.timeSlot === slot && res.date === this.selectedDate
    );
  }

// ---------------------------------------- Calculo del Precio ----------------------------------------
  calculatePrice(duration: number): number {
    return duration * 100; // Aquí, multiplicas la duración en horas por el costo por hora
  }

}

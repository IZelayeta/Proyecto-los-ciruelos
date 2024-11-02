import { Component, AfterViewInit } from "@angular/core";

declare var google: any; 

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
})
export class MapsComponent implements AfterViewInit {


  mapTypeId: google.maps.MapTypeId = google.maps.MapTypeId.ROADMAP;


  position = { 
    lat: -34.91956960311377,
    lng: -57.98581307808964
  };


  markerOptions = {
    icon: {
      url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
      scaledSize: new google.maps.Size(40, 40)
    },
    label: {
      color: 'black',
      fontWeight: 'bold',
      text: 'Los Ciruelos Club'
    }
  };


  zoom = 15;


  private map!: google.maps.Map;
  private marker!: google.maps.Marker;

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
    const mapOptions = {
      center: this.position, 
      zoom: this.zoom,
      mapTypeId: this.mapTypeId 
    };


    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);


    this.marker = new google.maps.Marker({
      position: this.position,
      map: this.map,
      icon: this.markerOptions.icon,
      label: {
        text: this.markerOptions.label.text,
        color: this.markerOptions.label.color,
        fontWeight: this.markerOptions.label.fontWeight
      }
    });

    this.addMarkerClickListener();
  }

  // Método para agregar el listener al marcador
  private addMarkerClickListener() {
    this.marker.addListener('click', () => {
      this.map.setZoom(18); 
      this.map.setCenter(this.marker.getPosition()!); 
    });
  }
}

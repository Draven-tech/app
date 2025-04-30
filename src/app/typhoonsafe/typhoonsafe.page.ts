import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-typhoon-safe',
  templateUrl: './typhoonsafe.page.html',
  styleUrls: ['./typhoonsafe.page.scss']
})
export class TyphoonSafePage implements AfterViewInit {
  selectedRoute: 'default' | 'safe' = 'default'; // which route to display
  private map!: L.Map;

  constructor(
    private http: HttpClient,
    private platform: Platform
  ) {}

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      setTimeout(() => this.initializeMap(), 300);
    });
  }

  private initializeMap() {
    const container = document.getElementById('mainMap');
    if (!container) return;

    this.map = L.map('mainMap', {
      zoomControl: false
    }).setView([13.5, 122.5], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3
    }).addTo(this.map);

    this.plotRoutes(); // draw initial route
  }

  selectRoute(type: any) {
    if (type === 'default' || type === 'safe') {
      this.selectedRoute = type;
      this.clearRoutes();
      this.plotRoutes();
    }
  }
  

  
  private clearRoutes() {
    this.map.eachLayer((layer: any) => {
      if (layer instanceof L.Polyline || layer instanceof L.Polygon) {
        this.map.removeLayer(layer);
      }
    });
  }

  private plotRoutes() {
    const routes: { [key: string]: L.LatLngTuple[] } = {
      default: [
        [13.4, 122.5],
        [13.7, 123.0],
        [14.0, 123.4]
      ],
      safe: [
        [13.4, 122.5],
        [13.5, 122.8],
        [13.6, 123.1],
        [14.0, 123.4]
      ]
    };
  
    const color = this.selectedRoute === 'default' ? '#3366ff' : '#33cc33';
  
    L.polyline(routes[this.selectedRoute], {
      color,
      weight: 4,
      opacity: 0.9,
      dashArray: this.selectedRoute === 'default' ? '5, 5' : undefined
    }).addTo(this.map);
  }
  
}

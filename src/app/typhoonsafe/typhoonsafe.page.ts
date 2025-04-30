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
  constructor(
    private http: HttpClient,
    private platform: Platform
  ) {}

  private defaultMap!: L.Map;
  private safeMap!: L.Map;

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      setTimeout(() => this.initializeMaps(), 300);
    });
  }

  private initializeMaps() {
    if (!this.checkMapContainers()) {
      setTimeout(() => this.initializeMaps(), 100);
      return;
    }
  
    this.defaultMap = this.createMap('defaultMap', [13.5, 122.5]);
    this.safeMap = this.createMap('safeMap', [13.5, 122.5]);
  
    // Invalidate size AFTER a slight delay to allow DOM layout
    setTimeout(() => {
      this.defaultMap.invalidateSize();
      this.safeMap.invalidateSize();
    }, 300);
  
    this.plotRoutes();
    this.loadCycloneZones();
  }

  private createMap(elementId: string, center: L.LatLngExpression): L.Map {
    const map = L.map(elementId, {
      renderer: L.canvas(),
      zoomControl: true,
      preferCanvas: true,
      attributionControl: true
    }).setView(center, 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      detectRetina: true
    }).addTo(map);

    return map;
  }

  private checkMapContainers(): boolean {
    const defaultMapEl = document.getElementById('defaultMap');
    const safeMapEl = document.getElementById('safeMap');
    
    if (!defaultMapEl || !safeMapEl) {
      console.warn('Map containers not found');
      return false;
    }
    
    return defaultMapEl.offsetHeight > 0 && safeMapEl.offsetHeight > 0;
  }

  private plotRoutes() {
    const routes = {
      default: [
        [13.4, 122.5] as L.LatLngTuple,
        [13.7, 123.0] as L.LatLngTuple,
        [14.0, 123.4] as L.LatLngTuple
      ],
      safe: [
        [13.4, 122.5] as L.LatLngTuple,
        [13.5, 122.8] as L.LatLngTuple,
        [13.6, 123.1] as L.LatLngTuple,
        [14.0, 123.4] as L.LatLngTuple
      ]
    };

    L.polyline(routes.default, {
      color: '#3366ff',
      weight: 4,
      opacity: 0.9,
      dashArray: '5, 5'
    }).addTo(this.defaultMap);

    L.polyline(routes.safe, {
      color: '#33cc33',
      weight: 4,
      opacity: 0.9
    }).addTo(this.safeMap);
  }

  private loadCycloneZones() {
    const mockData = [{
      name: "Typhoon Sample",
      impactZone: [
        { lat: 13.5, lng: 122.5 },
        { lat: 13.6, lng: 122.7 },
        { lat: 13.4, lng: 122.6 }
      ]
    }];

    this.processCyclones(mockData);
  }

  private processCyclones(cyclones: Array<{name: string, impactZone: Array<{lat: number, lng: number}>}>) {
    cyclones.forEach(cyclone => {
      const zone = cyclone.impactZone.map((p: {lat: number, lng: number}) => [p.lat, p.lng] as L.LatLngTuple);
      const popup = `<b>${cyclone.name}</b><br>Risk Zone`;
      
      const polygon = L.polygon(zone, {
        color: '#ff3333',
        weight: 2,
        opacity: 0.9,
        fillOpacity: 0.3
      });

      polygon.bindPopup(popup);
      polygon.addTo(this.defaultMap);
      polygon.addTo(this.safeMap);
    });
  }
}
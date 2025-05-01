import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  standalone: false,
  selector: 'app-typhoon-safe',
  templateUrl: './typhoonsafe.page.html',
  styleUrls: ['./typhoonsafe.page.scss']
})
export class TyphoonSafePage implements AfterViewInit {
  selectedRoute: 'default' | 'safe' = 'default'; 
  selectedPackage = 'PKG-001';
  private map!: L.Map;
  private userMarker?: L.Marker;

  constructor(
    private http: HttpClient,
    private platform: Platform
  ) {}

  async ngAfterViewInit() {
    await this.platform.ready();
    setTimeout(() => {
      this.initializeMap();
    }, 300);
  }

  private async initializeMap() {
    const container = document.getElementById('mainMap');
    if (!container) return;

    this.map = L.map('mainMap', {
      zoomControl: false
    }).setView([11.0, 123.0], 3);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3
    }).addTo(this.map);

    this.plotRoutes(); 
    await this.showUserLocation();
  }

  selectRoute(type: any) {
    if (type === 'default' || type === 'safe') {
      this.selectedRoute = type;
      this.clearRoutes();
      this.plotRoutes();
    }
  }

  async showUserLocation() {
    try {
      const position = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = position.coords;

      if (this.userMarker) this.map.removeLayer(this.userMarker); // remove old

      this.userMarker = L.marker([latitude, longitude], {
        icon: L.icon({
          iconUrl: 'assets/you.png', // Make sure this file exists
          iconSize: [32, 32],
          iconAnchor: [16, 32]
        })
      }).addTo(this.map).bindPopup('You are here');

      this.map.setView([latitude, longitude], 13); // focus on user
    } catch (error) {
      console.error('Geolocation error:', error);
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
        [10.287399212544297, 123.86270604487086],
        [10.29619430775431, 123.89805430220503],
        [10.292478549769497, 123.90861147672332],
        [10.319417649857005, 123.95525790736646],
        [10.351423362368516, 124.00892997849762],
        [10.649098096553239, 124.18387601178694],
        [11.825959886253475, 124.15445689816129],
        [12.256945711325605, 123.90866545551664],
        [12.870706564550574, 122.77888718150574],
        [13.640630662596854, 121.00612419662977],
        [13.751957818087034, 121.0362271612416]
      ],
      safe: [
        [10.287435058208686, 123.86268671917087],
        [10.263788979198237, 123.83904002238557],
        [10.29379985279226, 123.81825452298192],
        [10.326691029227161, 123.81231356988492],
        [10.315562669489257, 123.75923787004564],
        [10.304584183628883, 123.73896054858456],
        [10.316752243383196, 123.69013457707497],
        [10.358536666911393, 123.65795815092585],
        [10.385763689653302, 123.64829546425757],
        [10.377681532442761, 123.6348731982635],
        [10.48445961198248, 123.41804985258096],
        [10.665736779786291, 122.95111704905025],
        [10.745711347509317, 122.59157938527575],
        [11.575461368345124, 122.71195513829716],
        [11.920553497505576, 121.96733811037059],
        [12.275553324827975, 121.73828936017513],
        [13.209314793070051, 121.54335334385344],
        [13.601939012519873, 120.99413118888869],
        [13.75272031483647, 121.0421963736874]
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

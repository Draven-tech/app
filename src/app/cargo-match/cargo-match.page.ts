import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Preferences } from '@capacitor/preferences';
import { AlertController } from '@ionic/angular';

interface CargoListing {
  id: string;
  driverName: string;
  vehicleType: string;
  capacity: number;
  remainingCapacity: number;
  origin: string;
  destination: string;
  currentLocation: { lat: number; lng: number };
  pricePerKg: number;
  phone: string;
  vehiclePhoto: string;
  rating: number;
}

@Component({
  standalone: false,
  selector: 'app-cargo-match',
  templateUrl: './cargo-match.page.html',
  styleUrls: ['./cargo-match.page.scss'],
})
export class CargoMatchPage {
  listings: CargoListing[] = [];
  userLocation: { lat: number; lng: number } | null = null;
  isDriverView: boolean = false;
  headerHidden = false;
  lastScrollTop = 0;

  onScroll(event: any) {
    const currentScroll = event.detail.scrollTop;

    if (currentScroll > this.lastScrollTop + 10) {
      this.headerHidden = true;
    } else if (currentScroll < this.lastScrollTop - 10 || currentScroll <= 0) {
      this.headerHidden = false;
    }

    this.lastScrollTop = currentScroll;
  }

  
  
  newListing = {
    vehicleType: 'L300',
    capacity: null as number | null,
    pricePerKg: 10,
    origin: '',
    destination: ''
  };

  

  constructor(private alertCtrl: AlertController) {}



  async ionViewDidEnter() {
    await this.getUserLocation();
    this.loadListings();
  }

  async getUserLocation() {
    try {
      const position = await Geolocation.getCurrentPosition();
      this.userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
    } catch {
      this.userLocation = { lat: 14.5995, lng: 120.9842 }; // Default Manila
    }
  }

  async loadListings() {
    const { value } = await Preferences.get({ key: 'cargoListings' });
    this.listings = value ? JSON.parse(value) : this.getDefaultListings();
  }

  getDefaultListings(): CargoListing[] {
    return [
      {
        id: '1',
        driverName: 'Juan Dela Cruz',
        vehicleType: '6-Wheeler',
        capacity: 2000,
        remainingCapacity: 1500,
        origin: 'Manila',
        destination: 'Cebu',
        currentLocation: this.getOffsetLocation(0.01),
        pricePerKg: 15,
        phone: '+639123456789',
        vehiclePhoto: 'assets/truck1.jpg',
        rating: 4.5
      },
      {
        id: '2',
        driverName: 'Maria Santos',
        vehicleType: 'L300',
        capacity: 500,
        remainingCapacity: 300,
        origin: 'Manila',
        destination: 'Batangas',
        currentLocation: this.getOffsetLocation(0.02),
        pricePerKg: 10,
        phone: '+639987654321',
        vehiclePhoto: 'assets/truck2.jpg',
        rating: 4.2
      }
    ];
  }

  getOffsetLocation(offset: number) {
    return this.userLocation ? {
      lat: this.userLocation.lat + offset,
      lng: this.userLocation.lng + offset
    } : { lat: 14.6012, lng: 120.9765 };
  }

  toggleView() {
    this.isDriverView = !this.isDriverView;
  }

  async addDriverListing() {
    if (!this.newListing.capacity || !this.newListing.origin || !this.newListing.destination) {
      const alert = await this.alertCtrl.create({
        header: 'Missing Info',
        message: 'Please fill all fields',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const newListing: CargoListing = {
      id: Date.now().toString(),
      driverName: 'You',
      vehicleType: this.newListing.vehicleType,
      capacity: this.newListing.capacity!,
      remainingCapacity: this.newListing.capacity!,
      origin: this.newListing.origin,
      destination: this.newListing.destination,
      currentLocation: this.userLocation || { lat: 0, lng: 0 },
      pricePerKg: this.newListing.pricePerKg,
      phone: '+639000000000',
      vehiclePhoto: 'assets/driver-truck.jpg',
      rating: 5
    };

    this.listings.push(newListing);
    await Preferences.set({
      key: 'cargoListings',
      value: JSON.stringify(this.listings)
    });

    const alert = await this.alertCtrl.create({
      header: 'Success!',
      message: `Your ${newListing.vehicleType} is now available for bookings`,
      buttons: ['OK']
    });
    await alert.present();
    
    this.resetDriverForm();
    this.isDriverView = false;
  }

  resetDriverForm() {
    this.newListing = {
      vehicleType: 'L300',
      capacity: null,
      pricePerKg: 10,
      origin: '',
      destination: ''
    };
  }

  async bookCargo(listing: CargoListing) {
    const alert = await this.alertCtrl.create({
      header: `Book ${listing.driverName}'s ${listing.vehicleType}`,
      inputs: [
        {
          name: 'customerName',
          placeholder: 'Your Name',
          type: 'text'
        },
        {
          name: 'cargoWeight',
          placeholder: `Cargo Weight (max ${listing.remainingCapacity}kg)`,
          type: 'number',
          min: '1',
          max: listing.remainingCapacity.toString()
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Book Now',
          handler: (data) => {
            if (data.cargoWeight > listing.remainingCapacity) {
              this.showErrorAlert('Weight exceeds available capacity');
              return false;
            }
            this.processBooking(listing, data);
            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  async processBooking(listing: CargoListing, data: any) {
    const weight = Number(data.cargoWeight);
    const totalCost = weight * listing.pricePerKg;

    listing.remainingCapacity -= weight;
    await Preferences.set({
      key: 'cargoListings',
      value: JSON.stringify(this.listings)
    });

    const alert = await this.alertCtrl.create({
      header: 'Booking Confirmed!',
      message: `
        <p><strong>Driver:</strong> ${listing.driverName}</p>
        <p><strong>Cost:</strong> ₱${totalCost.toLocaleString()}</p>
        <p><strong>Contact:</strong> ${listing.phone}</p>
      `,
      buttons: ['OK']
    });
    await alert.present();
  }

  async showErrorAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
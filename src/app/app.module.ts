import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SideNavModule } from './components/side-nav/side-nav.module';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Firebase SDK v9 compatibility (AngularFire)
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC7OyrM3e-CREkQ19Uih8qqZlnhT2Ee9-w",
  authDomain: "sentinel-3d420.firebaseapp.com",
  projectId: "sentinel-3d420",
  storageBucket: "sentinel-3d420.appspot.com",
  messagingSenderId: "96011730165",
  appId: "1:96011730165:web:6cfa4a0d02296dcc9119bc",
  measurementId: "G-NM85HFKYRG"
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    SideNavModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig), // ✅ Use this for modules
    AngularFirestoreModule // ✅ Firestore support
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

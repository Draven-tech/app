import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // MUST BE IMPORTED
import { IonicModule } from '@ionic/angular';

import { TyphoonSafePageRoutingModule } from './typhoonsafe-routing.module';
import { TyphoonSafePage } from './typhoonsafe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule, // Critical for HTTP requests
    IonicModule,
    TyphoonSafePageRoutingModule
  ],
  declarations: [TyphoonSafePage]
})
export class TyphoonSafePageModule {}
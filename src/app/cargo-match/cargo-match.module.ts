import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CargoMatchPageRoutingModule } from './cargo-match-routing.module';

import { CargoMatchPage } from './cargo-match.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CargoMatchPageRoutingModule
  ],
  declarations: [CargoMatchPage]
})
export class CargoMatchPageModule {}

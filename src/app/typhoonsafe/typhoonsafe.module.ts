import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TyphoonsafePageRoutingModule } from './typhoonsafe-routing.module';

import { TyphoonsafePage } from './typhoonsafe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TyphoonsafePageRoutingModule
  ],
  declarations: [TyphoonsafePage]
})
export class TyphoonsafePageModule {}

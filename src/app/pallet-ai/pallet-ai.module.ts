import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PalletAiPageRoutingModule } from './pallet-ai-routing.module';

import { PalletAiPage } from './pallet-ai.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PalletAiPageRoutingModule
  ],
  declarations: [PalletAiPage]
})
export class PalletAiPageModule {}

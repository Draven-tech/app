import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FraudWatchPageRoutingModule } from './fraud-watch-routing.module';

import { FraudWatchPage } from './fraud-watch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FraudWatchPageRoutingModule
  ],
  declarations: [FraudWatchPage]
})
export class FraudWatchPageModule {}

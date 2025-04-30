import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FraudWatchPage } from './fraud-watch.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: FraudWatchPage
      }
    ])
  ],
  declarations: [FraudWatchPage]
})
export class FraudWatchPageModule {}
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FraudWatchPage } from './fraud-watch.page';

const routes: Routes = [
  {
    path: '',
    component: FraudWatchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FraudWatchPageRoutingModule {}

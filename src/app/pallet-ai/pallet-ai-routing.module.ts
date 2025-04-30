import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PalletAiPage } from './pallet-ai.page';

const routes: Routes = [
  {
    path: '',
    component: PalletAiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PalletAiPageRoutingModule {}

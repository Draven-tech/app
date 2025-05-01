import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CargoMatchPage } from './cargo-match.page';

const routes: Routes = [
  {
    path: '',
    component: CargoMatchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CargoMatchPageRoutingModule {}

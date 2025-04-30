import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TyphoonsafePage } from './typhoonsafe.page';

const routes: Routes = [
  {
    path: '',
    component: TyphoonsafePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TyphoonsafePageRoutingModule {}

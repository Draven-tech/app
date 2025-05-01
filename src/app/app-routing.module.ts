import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FraudWatchPage } from './fraud-watch/fraud-watch.page';

const routes: Routes = [
  { path: '', redirectTo: 'page1', pathMatch: 'full' },
  { path: 'page1', loadChildren: () => import('./page1/page1.module').then(m => m.Page1PageModule) },
  { path: 'page2', loadChildren: () => import('./page2/page2.module').then(m => m.Page2PageModule) },
  { path: 'page3', loadChildren: () => import('./page3/page3.module').then(m => m.Page3PageModule) },
  { path: 'page4', loadChildren: () => import('./page4/page4.module').then(m => m.Page4PageModule) },
  { path: 'page5', loadChildren: () => import('./page5/page5.module').then(m => m.Page5PageModule) },
  { path: 'page6', loadChildren: () => import('./page6/page6.module').then(m => m.Page6PageModule) },
  { 
    path: 'typhoonsafe',
    loadChildren: () => import('./typhoonsafe/typhoonsafe.module')
      .then(m => m.TyphoonSafePageModule) // Must match EXACTLY
  },
  { 
    path: 'fraud-watch',
    component: FraudWatchPage
  },  {
    path: 'cargo-match',
    loadChildren: () => import('./cargo-match/cargo-match.module').then( m => m.CargoMatchPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { 
      preloadingStrategy: PreloadAllModules,
      enableTracing: false // Set to true to debug routes in console
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
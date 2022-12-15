import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'ngrx-store',
    loadChildren: () => import('./ngrx-demo/ngrx-demo.module').then(m => m.NgrxDemoModule)
  },
  {
    path: '**',
    redirectTo: 'ngrx-store'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
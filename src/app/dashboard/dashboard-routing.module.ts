import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'calendarizacion',
        loadChildren: () =>
          import('./calendarizacion/calendarizacion.module').then((m) => m.CalendarizacionPageModule),
      },
      {
        path: 'sesion',
        loadChildren: () =>
          import('./sesion/sesion.module').then((m) => m.SesionPageModule),
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}

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
      },
      {
        path: 'solicitud',
        loadChildren: () =>
          import('./solicitud/solicitud.module').then((m) => m.SolicitudPageModule),
      },
      {
        path: 'alertas',
        loadChildren: () =>
          import('./alertas/alertas.module').then((m) => m.AlertasPageModule),
      },
      {
        path: 'misdatos',
        loadChildren: () =>
          import('./mis-datos/mis-datos.module').then((m) => m.MisDatosPageModule),
      },
      {
        path: 'cambiar-contrasenna',
        loadChildren: () => import('./cambiar-contrasenna/cambiar-contrasenna.module').then( m => m.CambiarContrasennaPageModule)
      }
    ],
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}

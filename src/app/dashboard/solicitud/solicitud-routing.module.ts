import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitudPage } from './solicitud.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitudPage,
    children: [
      {
        path: 'crear/:sessionID',
        loadChildren: () => import('./crear-solicitud/crear-solicitud.module').then( m => m.CrearSolicitudPageModule)
      },
      {
        path: 'listado',
        loadChildren: () => import('./listado-solicitud/listado-solicitud.module').then( m => m.ListadoSolicitudPageModule)
      },
      {
        path:'detalle/:requestID',
        loadChildren: () => import('./detalle-solicitud/detalle-solicitud.module').then( m => m.DetalleSolicitudPageModule)
      },
      {
        path: '**',
        redirectTo: 'listado',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudPageRoutingModule {}

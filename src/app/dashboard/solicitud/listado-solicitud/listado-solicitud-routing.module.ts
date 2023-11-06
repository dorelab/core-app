import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoSolicitudPage } from './listado-solicitud.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoSolicitudPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoSolicitudPageRoutingModule {}

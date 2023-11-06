import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearSolicitudPage } from './crear-solicitud.page';

const routes: Routes = [
  {
    path: '',
    component: CrearSolicitudPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearSolicitudPageRoutingModule {}

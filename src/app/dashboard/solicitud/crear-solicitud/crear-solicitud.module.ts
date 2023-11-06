import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearSolicitudPageRoutingModule } from './crear-solicitud-routing.module';

import { CrearSolicitudPage } from './crear-solicitud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearSolicitudPageRoutingModule
  ],
  declarations: [CrearSolicitudPage]
})
export class CrearSolicitudPageModule {}

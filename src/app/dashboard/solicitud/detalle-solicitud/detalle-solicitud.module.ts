import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleSolicitudPageRoutingModule } from './detalle-solicitud-routing.module';

import { DetalleSolicitudPage } from './detalle-solicitud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleSolicitudPageRoutingModule
  ],
  declarations: [DetalleSolicitudPage]
})
export class DetalleSolicitudPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearSolicitudPageRoutingModule } from './crear-solicitud-routing.module';

import { CrearSolicitudPage } from './crear-solicitud.page';
import { SharedModule } from '@app/shared';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    CrearSolicitudPageRoutingModule
  ],
  declarations: [CrearSolicitudPage]
})
export class CrearSolicitudPageModule {}

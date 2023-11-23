import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarizacionPageRoutingModule } from './calendarizacion-routing.module';

import { CalendarizacionPage } from './calendarizacion.page';
import { ModalVotarComponent } from './components/modal-votar/modal-votar.component';
import { ModalSesionComponent } from './components/modal-sesion/modal-sesion.component';
import { ModalSesionActivaComponent } from './components/modal-sesion-activa/modal-sesion-activa.component';
import { TableVotesComponent } from './components/table-votes/table-votes.component';
import { TableAttendanceComponent } from './components/table-attendance/table-attendance.component';

import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarizacionPageRoutingModule,
    SharedModule
  ],
  declarations: [
    CalendarizacionPage,
    ModalVotarComponent,
    ModalSesionComponent,
    ModalSesionActivaComponent,
    TableVotesComponent,
    TableAttendanceComponent
  ]
})

export class CalendarizacionPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarizacionPageRoutingModule } from './calendarizacion-routing.module';

import { CalendarizacionPage } from './calendarizacion.page';
import { ModalVotarComponent } from './components/modal-votar/modal-votar.component';
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
    ModalVotarComponent
  ]
})
export class CalendarizacionPageModule {}

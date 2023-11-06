import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoSolicitudPageRoutingModule } from './listado-solicitud-routing.module';

import { ListadoSolicitudPage } from './listado-solicitud.page';
import { FormFiltersListComponent } from '../components/form-filters-list/form-filters-list.component';

import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoSolicitudPageRoutingModule,
    SharedModule
  ],
  declarations: [ListadoSolicitudPage, FormFiltersListComponent]
})
export class ListadoSolicitudPageModule {}

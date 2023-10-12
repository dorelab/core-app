import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SesionPageRoutingModule } from './sesion-routing.module';

import { SesionPage } from './sesion.page';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SesionPageRoutingModule,
    SharedModule
  ],
  declarations: [
    SesionPage
  ]
})
export class SesionPageModule {}

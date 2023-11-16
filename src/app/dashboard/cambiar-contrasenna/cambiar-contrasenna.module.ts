import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiarContrasennaPageRoutingModule } from './cambiar-contrasenna-routing.module';

import { CambiarContrasennaPage } from './cambiar-contrasenna.page';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CambiarContrasennaPageRoutingModule
  ],
  declarations: [CambiarContrasennaPage]
})
export class CambiarContrasennaPageModule {}

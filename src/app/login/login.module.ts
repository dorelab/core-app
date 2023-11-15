import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { ModalResetPasswordComponent } from './components/modal-reset-password/modal-reset-password.component';
import { ModalNewPasswordComponent } from './components/modal-new-password/modal-new-password.component';
import { LoginStoreModule } from './+state/login-store.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule,
    SharedModule
  ],
  declarations: [LoginPage, ModalResetPasswordComponent, ModalNewPasswordComponent]
})
export class LoginPageModule {}

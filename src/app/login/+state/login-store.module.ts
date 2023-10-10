import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromLogin from './login.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './login.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromLogin.loginFeatureKey, fromLogin.reducer),
    EffectsModule.forFeature([LoginEffects])
  ]
})
export class LoginStoreModule { }

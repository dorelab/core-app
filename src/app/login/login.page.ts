import { UserLoginModel } from './../shared/interfaces/auth.interface';
import { Component, Inject, OnInit, inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService, AlertsService, ControlModalService, NotificationsService } from '../shared/services';
import { ModalResetPasswordComponent } from './components/modal-reset-password/modal-reset-password.component';
import { ModalNewPasswordComponent } from './components/modal-new-password/modal-new-password.component';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable, from, mergeMap, of, switchMap, tap, zip } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromReducer from './+state/login.reducer';
import * as fromActions from './+state/login.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formData: FormGroup;
  errorLogin: boolean = false;
  displayModal: boolean = false;
  private codigo: any;
  public NotificationsService_ = inject(NotificationsService);
  private _authService: AuthService = inject(AuthService);
  public dataUserLogin: UserLoginModel | null = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    public alertsService: AlertsService,
    private modalCtrl: ModalController,
    private store: Store<fromReducer.State>,
    private controlModalService: ControlModalService,
    private route: ActivatedRoute
  ) {
    this.formData = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
    });

    this.codigo = this.route.snapshot.paramMap.get('codigo');
  }

  ngOnInit() {
    if (this.authService.userHasToken()) {
      this.router.navigate(['/dashboard/home']);
    }

    if(this.codigo !== '' && this.codigo !== null) {
      this.handlerNewPswModal();
    }
  }

  login(): void {
    if(!this.formData.valid) {
      this.alertsService.openSnackBar('¡Por favor, ingrese todos los datos!', 'error');
      return;
    }

    const dataLogin = this.formData.value;

    this.authService.loginByApi(dataLogin).pipe(
      switchMap((data: any) => {
        if (data.success !== 1) {
          this.alertsService.openSnackBar('ERROR al Iniciar Sesión', 'error');
          return of({ Successful: false });
        }

        if (data.perfil.id_perfil !== 3) {
          this.alertsService.openSnackBar('¡Solo pueden Iniciar Sesión los Usuarios Consejeros/as!', 'error');
          return of({ Successful: false });
        }

        data.imagen = `${(!data.imagen ? '' : (environment.urlFiles + data.imagen))}`

        localStorage.setItem(
          environment.nameLocalStorageInfoUser,
          JSON.stringify(data)
        );

        this.dataUserLogin = data;

        if(data.usuario_id) {
          this.store.dispatch(fromActions.loadDataUserLogin({ payload: data }));
          this.store.dispatch(fromActions.loadUserAlerts({filters: { usuario__id: data.usuario_id, visto: false}}));
          this.NotificationsService_.initPush(data);

          return of({ Successful: true });
        } else {
          return of({ Successful: false });
        }
      })
    ).subscribe({
      next: (data) => {
        if (data.Successful === true && this.dataUserLogin !== null && this.dataUserLogin.usuario_id) {
          this.router.navigate(['/dashboard/home']);
        }
        
        return true;
      },
      error: (error) => {
        let msg = 'Error al iniciar sesión, contacte al administrador.';
        if (error && error.error && error.error['blank']) {
          msg = error.error['blank'];
        } else if (error && error.error) {
          const keys =
            typeof error.error == 'object' ? Object.keys(error.error) : [];
          if (keys.length > 0) {
            msg = 'Se han encontrado los siguientes errores: ';
            keys.forEach((k) => {
              msg = `${msg} ${error.error[k]}`;
            });
          }
        }
        this.alertsService.openSnackBar(msg, 'error');
        this.errorLogin = true;
      },
      complete: () => {
        console.info('complete');
      },
    });

    /*this.authService.loginByApi(dataLogin).subscribe({
      next: (data: UserLoginModel) => {
        if (data.success !== 1) {
          this.alertsService.openSnackBar('ERROR al Iniciar Sesión', 'error');
          return false;
        }

        if (data.perfil.id_perfil !== 3) {
          this.alertsService.openSnackBar('¡Solo pueden Iniciar Sesión los Usuarios Consejeros/as!', 'error');
          return false;
        }
        
        data.imagen = `${(!data.imagen ? '' : (environment.urlFiles + data.imagen))}`

        localStorage.setItem(
          environment.nameLocalStorageInfoUser,
          JSON.stringify(data)
        );

        this.dataUserLogin = data;

        this.store.dispatch(fromActions.loadDataUserLogin({ payload: data }));
        this.store.dispatch(fromActions.loadUserAlerts({filters: { usuario__id: data.usuario_id, visto: false}}));
        this.router.navigate(['/dashboard/home']);
        
        return true;
      },
      error: (error) => {
        let msg = 'Error al iniciar sesión, contacte al administrador.';
        if (error && error.error && error.error['blank']) {
          msg = error.error['blank'];
        } else if (error && error.error) {
          const keys =
            typeof error.error == 'object' ? Object.keys(error.error) : [];
          if (keys.length > 0) {
            msg = 'Se han encontrado los siguientes errores: ';
            keys.forEach((k) => {
              msg = `${msg} ${error.error[k]}`;
            });
          }
        }
        this.alertsService.openSnackBar(msg, 'error');
        this.errorLogin = true;
      },
      complete: () => {
        console.info('complete');

        if (this.dataUserLogin !== null && this.dataUserLogin.usuario_id) {
          this._authService.updateTokenUser(this.dataUserLogin.usuario_id, {token: "cLfJAvmSTM-O7raHB2DDqF:APA91bFkFCCG7cI5BfybD4BvxCwPGYom3P_Ws9h6KNN9NFotGI5SVdhMPFy_WfVueKci35HJcIHZ4XVMVlgALVo32fpvoKmgKobqGw_ER1YTpIHv5HeoE-0ljrMuNJN8b1Nahb7cmNNB"});
        }
      },
    });*/
    
  }

  registrar() {}

  restablecerContrasenna(email: string) {
    this.authService.sendEmailRestore(email).subscribe({
      next: (resp) => {
        if(resp.success === 1){
          this.alertsService.openSnackBar(resp.message);
        }

        return true;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  async handlerModal() {
    this.controlModalService
      .create({
        component: ModalResetPasswordComponent,
      })
      .subscribe((detail) => {
        if (detail && detail.data && detail.role === 'confirm') {
          this.restablecerContrasenna(detail.data);
        }
      });
  }

  handlerNewPswModal() {
    this.controlModalService
      .create({
        component: ModalNewPasswordComponent,
      })
      .subscribe(({ data }) => {
        this.store.dispatch(
          fromActions.loadRestorePsw({
            data: {
              codigo: this.codigo,
              password: data.password,
            },
          })
        );
      });
  }

  prueba(data: UserLoginModel) {
    this._authService.updateTokenUser(data.usuario_id, {token: "cLfJAvmSTM-O7raHB2DDqF:APA91bFkFCCG7cI5BfybD4BvxCwPGYom3P_Ws9h6KNN9NFotGI5SVdhMPFy_WfVueKci35HJcIHZ4XVMVlgALVo32fpvoKmgKobqGw_ER1YTpIHv5HeoE-0ljrMuNJN8b1Nahb7cmNNB"});
  }
}

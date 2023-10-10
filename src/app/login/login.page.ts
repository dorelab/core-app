import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService, AlertsService } from '../shared/services';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable, from, mergeMap, switchMap, tap, zip } from 'rxjs';
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

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    public alertsService: AlertsService,
    private modalCtrl: ModalController,
    private store: Store<fromReducer.State>,
    private route: ActivatedRoute,
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
  }

  login(): void {
    if(!this.formData.valid) {
      this.alertsService.openSnackBar('¡Por favor, ingrese todos los datos!', 'error');
      return;
    }

    const dataLogin = this.formData.value;

    this.authService.loginByApi(dataLogin).subscribe({
      next: (data) => {
        if (data.estado === 'fallo') {
          this.alertsService.openSnackBar(data.mensaje, 'error');
          return false;
        }

        localStorage.setItem(
          environment.nameLocalStorageInfoUser,
          JSON.stringify(data)
        );

        this.store.dispatch(fromActions.loadDataUserLogin({ payload: data }));
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
      complete: () => console.info('complete'),
    });
  }

  registrar() {}

  restablecerContrasenna(email: string) {
    this.authService.sendEmailRestore(email).subscribe({
      next: (resp) => {
        this.alertsService.openSnackBar(resp.mensaje);
        return true;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  redirectTo(code: number) {
    this.router.navigate(['../registro', code]);
  }
}
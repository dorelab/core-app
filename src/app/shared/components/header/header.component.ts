import { Component, OnInit, inject } from '@angular/core';
import {
  Observable,
  Subject,
  fromEvent,
  of,
  switchMap,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { getLocalStorageUser } from '../../helpers/auth.helpers';
import { AuthService } from '../../services/auth.service';
import * as FromLogin from '@app/login-store';
import { Store, select } from '@ngrx/store';
import {
  AlertFiltersHeaderModel,
  AlertListService,
  AlertModel,
  AlertsService,
  UserLoginModel,
} from '@app/shared';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  infoUser: any;
  vista: boolean = false;
  userLogin: UserLoginModel | null = null;
  userLogin$: Observable<UserLoginModel | null> = this.store.select(
    FromLogin.getUserLogin
  );
  alerts$: Observable<AlertModel[] | null> = this.store.pipe(
    select(FromLogin.getNotifications)
  );
  public alertsFilters: AlertFiltersHeaderModel = {
    usuario__id: 0,
    visto: this.vista
  };
  public alertsList: AlertModel[] = [];
  public countAlerts: number = 0;
  private _alertListService: AlertListService = inject(AlertListService);

  constructor(
    private authService: AuthService,
    private store: Store<FromLogin.State>,
    public alertsService: AlertsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userLogin$.subscribe((u) => (this.userLogin = u));
    this.infoUser = JSON.parse(getLocalStorageUser() || '');

    if(this.infoUser.usuario_id > 0) {
      this.alertsFilters.usuario__id = this.infoUser.usuario_id;

      this.alerts$.pipe(
        switchMap((alert) => alert ? this._alertListService.getAlertsList(this.alertsFilters) : of(null))
      ).subscribe((response) => {
        if (response) {
          this.countAlerts = response.count;
        }
      });

      fromEvent(window, 'online').subscribe((_) => {
        console.log('ONLINE');
        this.notificationValidation();
      });

      fromEvent(window, 'offline').subscribe((_) => {
        console.log('Offline');
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
      });

      this.notificationValidation();
    }
  }

  notificationValidation() {
    timer(0, 300000)
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((_) =>
          this._alertListService.getAlertsList(this.alertsFilters)
        )
      )
      .subscribe((res) => {
        if (res.count > 0) {
          this.countAlerts = res.count;

          const msj = `Tienes ${res.count} ${
            res.count === 1 ? 'mensaje' : 'mensajes'
          } sin leer`;

          this.alertsService.openSnackBar(msj, 'info', 10000);
        }
      });
  }

  getAlertsList() {
    this.alertsFilters = {
      visto: this.vista,
      usuario__id: this.infoUser.usuario_id
    };

    console.log(this.alertsFilters);

    this.store.dispatch(
      FromLogin.loadUserAlerts({filters: this.alertsFilters})
    );
  }

  marcarLeido(alert: AlertModel, event: any) {
    this.store.dispatch(
      FromLogin.updateStatusAlert({ idAlert: alert.id })
    );

    event.stopPropagation();
  }

  changeToggle(event: any) {
    event.stopPropagation();
    this.getAlertsList();
  }

  cerrarSessionUser() {
    this.store.dispatch(FromLogin.loadLogOut());
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.authService.cerrarSessionUser();
  }
}

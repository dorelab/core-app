import { Component, OnInit } from '@angular/core';
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
  AlertsService,
  UserLoginModel,
} from '@app/shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  infoUser: any;
  vista: boolean = false;
  userLogin$: Observable<UserLoginModel | null> = this.store.select(
    FromLogin.getUserLogin
  );
  userLogin: UserLoginModel | null = null;
  countNotifications = 0;

  constructor(
    private authService: AuthService,
    private store: Store<FromLogin.State>,
    public alertsService: AlertsService,
    private router:Router
  ) {}

  ngOnInit() {
    this.userLogin$.subscribe((u) => (this.userLogin = u));
    this.infoUser = JSON.parse(getLocalStorageUser() || '');
    console.log(this.userLogin);

    console.log(this.infoUser);

    if(this.infoUser.usuario_id > 0) {}

  }

  cerrarSessionUser() {
    this.store.dispatch(FromLogin.loadLogOut());
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.authService.cerrarSessionUser();
  }
}

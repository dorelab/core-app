import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as LoginActions from './login.actions';
import { AlertListService, AlertsService, AuthService, NotificationsService } from '@app/shared';
import * as LoginReducer from './login.reducer';
import * as LoginSelectors from './login.selectors';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoginEffects {
  loadRestorePsw$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginActions.loadRestorePsw),
      map((action) => action.data),
      concatMap((data) =>
        this.authService.restorePassword(data).pipe(
          map((response) =>
            LoginActions.loadRestorePswSuccess({ payload: response })
          ),
          catchError((error) => of(LoginActions.loadLoginsFailure({ error })))
        )
      )
    );
  });

  loadRestorePswSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(LoginActions.loadRestorePswSuccess),
        map((action) => action.payload),
        tap((data) => {
          if (data.estado === 'fallo') {
            this.alertsService.openSnackBar(data.mensaje, 'error');
          } else if (data.estado === 'ok') {
            this.alertsService.openSnackBar(data.mensaje, 'success');
          }
        })
      );
    },
    { dispatch: false }
  );

  loadUserAlerts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        LoginActions.loadUserAlerts
      ),
      map((data) => data),
      concatMap((data) =>
        this._alertListService.getAlertsList(data.filters).pipe(
          map((response) =>
            LoginActions.loadUserAlertsSuccess({ payload: response })
          ),
          catchError((error) => of(LoginActions.loadLoginsFailure({ error })))
        )
      )
    );
  });

  loadUserAlertsSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(LoginActions.loadUserAlertsSuccess),
        concatLatestFrom(() => this.store.select(LoginSelectors.getNotifications)),
        tap(([, notifications]) => {
          localStorage.setItem(
            environment.storageAlerts,
            JSON.stringify(notifications)
          );
        })
      );
    },
    { dispatch: false }
  );

  updateStatusAlert$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginActions.updateStatusAlert),
      map((action) => action.idAlert),
      concatMap((idAlert) =>
        this._alertListService.changeStatusAlert(idAlert).pipe(
          map((payload) =>
            LoginActions.updateStatusAlertSuccess({ payload })
          ),
          catchError((error) =>
            of(LoginActions.loadLoginsFailure({ error }))
          )
        )
      )
    );
  });

  updateStatusAlertSuccess$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(
          LoginActions.updateStatusAlertSuccess
        ),
        concatLatestFrom(() => this.store.select(LoginSelectors.getUserLogin)),
        tap(([, user]) => {
          this.alertsService.openSnackBar(
            '¡La Notificación se ha marcada como Leída ✔️!',
            'success',
            3000,
            'top',
            'end'
          );
          if (user?.usuario_id) {
            this.store.dispatch(
              LoginActions.loadUserAlerts({ filters: {usuario__id: user?.usuario_id, visto: false} })
            );
          }
        })
      );
    },
    { dispatch: false }
  );

  loadErrors$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(LoginActions.loadLoginsFailure),
        map((action) => action.error),
        tap((error) => {
          console.log('❌ ERROR:', error);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    public alertsService: AlertsService,
    private _alertListService: AlertListService,
    private store: Store<LoginReducer.State>
  ) {}
}

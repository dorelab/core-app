import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as LoginActions from './login.actions';
import { AlertsService, AuthService } from '@app/shared';
import * as LoginReducer from './login.reducer';
import { Store } from '@ngrx/store';

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
    private store: Store<LoginReducer.State>,
  ) {}
}

import { AlertFiltersHeaderModel, AlertModel, ApiResponseModel, PasswordRecoverModel, UserLoginModel } from '@app/shared';
import { createAction, props } from '@ngrx/store';

export const loadRestorePsw = createAction(
  '[Login] Load data by restore password',
  props<{data:PasswordRecoverModel}>()
);

export const loadRestorePswSuccess = createAction(
  '[Login] Load data response by restore password',
  props<{ payload: ApiResponseModel }>()
);

export const loadLoginsFailure = createAction(
  '[Login] Load Logins Failure',
  props<{ error: any }>()
);

export const loadDataUserLogin = createAction(
  '[Login] Load data user login',
  props<{ payload: UserLoginModel }>()
);

export const loadLogOut = createAction(
  '[Login] log Out'
);

export const loadUserAlerts = createAction(
  '[Login] Load User Alerts',
  props<{ filters: AlertFiltersHeaderModel }>()
);

export const loadUserAlertsSuccess = createAction(
  '[Login] Load User Alerts Success',
  props<{ payload: AlertModel[] }>()
);

export const updateStatusAlert = createAction(
  '[Login] Update Status Alert',
  props<{ idAlert: number }>()
);

export const updateStatusAlertSuccess = createAction(
  '[Login] Update Status Alert Success',
  props<{ payload: AlertModel[] }>()
);

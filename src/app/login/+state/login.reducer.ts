import { createFeature, createReducer, on } from '@ngrx/store';
import * as LoginActions from './login.actions';
import { AlertFiltersHeaderModel, AlertModel, UserLoginModel } from '@app/shared';
import { environment } from 'src/environments/environment';

export const loginFeatureKey = 'login';

export interface State {
  user: UserLoginModel | null;
  error: any;
  filters: AlertFiltersHeaderModel | null;
  alerts: AlertModel[] | null;
}

export const initialState: State = {
  user: localStorage.getItem(environment.nameLocalStorageInfoUser)
    ? JSON.parse(
        localStorage.getItem(environment.nameLocalStorageInfoUser) as string
      )
    : null,
  error: null,
  filters: null,
  alerts: localStorage.getItem(environment.storageAlerts)
    ? JSON.parse(
        localStorage.getItem(environment.storageAlerts) as string
      )
    : null
};

export const reducer = createReducer(
  initialState,

  on(LoginActions.loadDataUserLogin, (state, { payload }) => ({
    ...state,
    user:payload,
  })),

  on(LoginActions.loadLogOut, (state) => ({
    ...state,
    user:null,
  })),

  on(LoginActions.loadLoginsFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(LoginActions.loadUserAlerts, (state, { filters }) => ({
    ...state,
    filters,
  })),

  on(LoginActions.loadUserAlertsSuccess, (state, { payload }) => ({
    ...state,
    alerts: payload,
  })),
);

export const loginFeature = createFeature({
  name: loginFeatureKey,
  reducer,
});

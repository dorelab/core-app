import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLogin from './login.reducer';

export const selectLoginState = createFeatureSelector<fromLogin.State>(
  fromLogin.loginFeatureKey
);

export const getUserLogin = createSelector(
  selectLoginState,
  (state:fromLogin.State)=>state.user
)

export const getNotifications = createSelector(
  selectLoginState,
  (state: fromLogin.State) => state.alerts
);

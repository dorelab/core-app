import { createFeature, createReducer, on } from '@ngrx/store';
import * as LoginActions from './login.actions';
import { UserLoginModel } from '@app/shared';
import { environment } from 'src/environments/environment';

export const loginFeatureKey = 'login';

export interface State {
  user: UserLoginModel | null;
  error: any;
  userId: number | null
}

export const initialState: State = {
  user: localStorage.getItem(environment.nameLocalStorageInfoUser)
    ? JSON.parse(
        localStorage.getItem(environment.nameLocalStorageInfoUser) as string
      )
    : null,
  error: null,
  userId: null
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
  }))
);

export const loginFeature = createFeature({
  name: loginFeatureKey,
  reducer,
});

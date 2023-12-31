import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
} from "@ngrx/store";
import { environment } from "src/environments/environment";

export interface AppState {}

export const appReducers: ActionReducerMap<AppState> = {};

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action): any {
    console.log("state", state);
    console.log("action", action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : [];

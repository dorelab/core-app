import { InjectionToken } from "@angular/core";
import { EnvironmentModel } from "@app/shared";

export const environment: EnvironmentModel = {
    production: false,
    lcStorageKey: 'core-app',
    urlApi: 'http://127.0.0.1:8000/api/v1',
    urlFiles: 'http://127.0.0.1:8000/',
    nameLocalStorageInfoUser: 'currentUserCORE',
};

export const ENVIRONMENT:InjectionToken<EnvironmentModel> = new InjectionToken('env');

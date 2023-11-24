import { InjectionToken } from "@angular/core";
import { EnvironmentModel } from "@app/shared";

export const environment: EnvironmentModel = {
    /*production: false,
    lcStorageKey: 'core-app',
    urlApi: 'http://127.0.0.1:8000/api/v1',
    urlFiles: 'http://127.0.0.1:8000/',
    nameLocalStorageInfoUser: 'currentUserCORE',
    storageAlerts: 'alertsUser',*/
    production: false,
    lcStorageKey: 'core-app',
    urlApi: 'https://core-back.gobiernosantiago.cl/api/v1',
    urlFiles: 'https://core-back.gobiernosantiago.cl/',
    nameLocalStorageInfoUser: 'currentUserCORE',
    storageAlerts: 'alertsUser',
};

export const ENVIRONMENT:InjectionToken<EnvironmentModel> = new InjectionToken('env');

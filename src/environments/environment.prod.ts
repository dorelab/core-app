import { InjectionToken } from "@angular/core";
import { EnvironmentModel } from "@app/shared";

export const environment: EnvironmentModel = {
    production: true,
    lcStorageKey: 'core-app',
    urlApi: 'https://core-back.gobiernosantiago.cl/api/v1/',
    urlFiles: 'https://core-back.gobiernosantiago.cl/',
    nameLocalStorageInfoUser: 'currentUserCORE',
    storageAlerts: 'alertsUser',
};

export const ENVIRONMENT:InjectionToken<EnvironmentModel> = new InjectionToken('env');


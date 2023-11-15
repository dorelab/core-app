import { Inject, Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';
import { getToken, removeUserToken } from '../helpers/auth.helpers';
import { Router } from '@angular/router';
import { ChangePasswordModel, IApiFilterParties, IApiResponseParties, IApiResponseUserID, PasswordRecoverModel } from '../interfaces';
import { IApiFilterCommon } from '../interfaces';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private path = 'auth';

  constructor(
    private apiService: ApiService,
  ) {}

  getUsers(filters: IApiFilterCommon | null): Observable<any> {
    return this.apiService.get(`${this.path}/usuario/`).pipe(map((data) => this._transformUserList(data)));
  }

  private _transformUserList(data: any): any {
    return data.map((item: any) => ({
      ...item,
      display_bancada: item.bancada.nombre,
    }));
  }

  getProfiles(): Observable<any> {
    return this.apiService.get(`${this.path}/usuario/perfiles/`);
  }
}

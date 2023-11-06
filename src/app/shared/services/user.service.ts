import { Inject, Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';
import { getToken, removeUserToken } from '../helpers/auth.helpers';
import { Router } from '@angular/router';
import { ChangePasswordModel, PasswordRecoverModel } from '../interfaces';
import {
  IApiRequestAssignTeams,
  IApiRequestRemoveAssign,
  IApiResponseTypeProfile,
  IApiResponseUsers,
  IApiFilterCommon,
} from '../interfaces';


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

  /*getProfiles(): Observable<IApiResponseTypeProfile[]> {
    const url = `${this._urlBase}usuario/perfiles/`;
    return this._restClientService.get<IApiResponseTypeProfile[]>(
      url,
      null,
      'Error al consultar el listado de perfiles, intente nuevamente o contacte al administrador del sistema.'
    );
  }



  getUserByID(id: number): Observable<IApiResponseUsers> {
    const url = `${this._urlBase}usuario/`;
    return this._restClientService.getId(
      url,
      id,
      'Error al consultar la información del usuario. intente nuevamente o contacte al administrador del sistema.'
    );
  }

  updateUsers(body: IBodyModel, id: number): Observable<IApiResponseUsers> {
    const url = `${this._urlBase}usuario/${id}/`;
    return this._restClientService.upLoadFile<IApiResponseUsers>(
      'PUT',
      url,
      body,
      'Error al editar el usuario, intente nuevamente o contacte al administrador del sistema.'
    );
  }

  assignTeams(
    body: IApiRequestAssignTeams[]
  ): Observable<IApiResponseMessageCommon> {
    const url = `${this._urlBaseAdmin}equipo/asignar/`;
    return this._restClientService.post<IApiResponseMessageCommon>(
      url,
      body,
      'Error al asignar los usuarios al equipo, intente nuevamente o contacte al administrador del sistema.'
    );
  }

  removeUserTeams(
    body: IApiRequestRemoveAssign,
    id: number
  ): Observable<IApiResponseMessageCommon> {
    const url = `${this._urlBaseAdmin}equipo/remover-miembro/`;
    return this._restClientService.delete<IApiResponseMessageCommon>(
      url,
      id,
      body,
      'Error al eliminar el usuario del equipo, intente nuevamente o contacte al administrador del sistema.'
    );
  }

  */
}

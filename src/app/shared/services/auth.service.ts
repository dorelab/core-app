import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { getToken, removeUserToken } from '../helpers/auth.helpers';
import { Router } from '@angular/router';
import { ChangePasswordModel, IApiResponseUserID, PasswordRecoverModel } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private prefijoRuta = 'auth';
  private socialNet = '/assets/data/social_networks.json';

  constructor(
    private http: HttpClient,
    private ApiService: ApiService,
    private router: Router
  ) {}

  loginByApi(data: any): Observable<any> {
    return this.ApiService.post(`${this.prefijoRuta}/login/`, data);
  }

  cerrarSessionUser() {
    try {
      removeUserToken();
      this.router.navigate(['login']);
    } catch (e) {
      console.log('error');
    }
  }

  sendEmailRestore(email: string): Observable<any> {
    return this.ApiService.post(`${this.prefijoRuta}/recuperar-password/request/`, {
      email,
    });
  }

  restorePassword(data: PasswordRecoverModel): Observable<any> {
    return this.ApiService.post(`${this.prefijoRuta}/recuperar-password/recover/`, data);
  }

  changePassword(data: ChangePasswordModel): Observable<any> {
    return this.ApiService.post(`${this.prefijoRuta}/password/change/`, data);
  }

  userHasToken() {
    return getToken() !== '' ? true : false;
  }

  getUserByID(id:number): Observable<any>{
    return this.ApiService.get(`${this.prefijoRuta}/usuario/${id}`);
  }

  /*updateUsers(data: any, id: number): Observable<any> {
    return this.ApiService.put(`${this.prefijoRuta}/usuario/${id}/`, data);
  }*/

  updateUsers(body: any, id: number): Observable<any> {
    const url = `${this.prefijoRuta}/usuario/${id}/`;
    return this.ApiService.upLoadFile<any>(
      'PUT',
      url,
      body,
      'Error al editar el usuario, intente nuevamente o contacte al administrador del sistema.'
    );
  }
}

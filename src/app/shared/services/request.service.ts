import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Sesion } from '../_class';
import { Observable } from 'rxjs';
import { IAPIDocs, IBodyModel, IRequestModel, RequestFilters } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private path = 'administration';

  constructor(
    private apiService: ApiService,
  ) {}


  getListRequest(filters: RequestFilters | null): Observable<any>{
    return this.apiService.get(`${this.path}/solicitud/`, filters);
  }

  getTypesRequests(): Observable<any> {
    return this.apiService.get(`${this.path}/solicitud/tipos/`);
  }

  getRequestByID(id: number | string): Observable<any> {
    return this.apiService.get(`${this.path}/solicitud/${id}/`);
  }

  getResponseRequestByID(id: number | string): Observable<any> {
    return this.apiService.get(`${this.path}/solicitud-respuesta/${id}/`);
  }

  saveRequest(data: any): Observable<any> {
    return this.apiService.post(`${this.path}/solicitud/`, data);
  }

  uploadDocs(body: IBodyModel): Observable<IAPIDocs> {
    const url = `${this.path}/documento/`;
    return this.apiService.upLoadFile(
      'POST',
      url,
      body,
      'Error al subir el documento'
    );
  }
}

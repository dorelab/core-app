import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Sesion } from '../_class';
import { Observable, map } from 'rxjs';
import { IAPISummarySession } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class SesionService {
  private path = 'administration';

  constructor(
    private apiService: ApiService,
  ) {}

  createPrivateSession(body: Sesion): Observable<any>{
    return this.apiService.post(`${this.path}/sesion/`, body);
  }

  getSesionsByID(id: number): Observable<any> {
    return this.apiService.get(`${this.path}/sesion/${id}/`);
  }

  getSummarySession(id: number): Observable<any> {
    return this.apiService.get(`${this.path}/sesion/resumen/${id}/`).pipe(map((data) => this._transformSummarySession(data)));
  }

  private _transformSummarySession(
    data: any
  ): IAPISummarySession {
    return {
      ...data,
      asistentes: data.asistentes.map((i: any) => ({
        ...i,
        asistencia_display: i.asistencia ? 'Si' : 'No',
      })),
    };
  }
}

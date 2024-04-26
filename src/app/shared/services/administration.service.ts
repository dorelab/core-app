import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { IAPIFilterSession, IApiFilterCommon, IApiFilterParties, IApiResponseCircunscripciones, IApiResponseCommittessList } from '../interfaces';

@Injectable({
  providedIn: 'root',
})

export class AdministrationService {
  private path = 'administration';

  constructor(private apiService: ApiService) {}

  getDefinitions(): Observable<any> {
    return this.apiService.get(`${this.path}/informacion-historica/filtros/`);
  }

  getBenchesList(): Observable<any> {
    return this.apiService.get(`${this.path}/bancada/`);
  }

  getPartiesList(filter: IApiFilterParties | null): Observable<any> {
    return this.apiService.get(`${this.path}/partido-politico/`, filter);
  }

  getSesions(filter: IAPIFilterSession | null): Observable<any> {
    return this.apiService.get(`${this.path}/sesion/`, filter);
  }

  getCommittees(filters: IApiFilterCommon | null): Observable<any> {
    return this.apiService.get(`${this.path}/equipo/`, filters).pipe(map((data) => this.transformCommittees(data)));
  }

  getCallById(id: number | string): Observable<any> {
    return this.apiService.get(`${this.path}/convocatoria/${id}`);
  }

  getIniciativaById(id: number): Observable<any> {
    return this.apiService.get(`${this.path}/iniciativa/${id}`);
  }

  getCircunscripcionList(): Observable<any> {
    return this.apiService.get(`auth/usuario/circunscripciones/`);
  }

  transformCommittees(data: any): any {
    return {
      ...data,
      results: data.results.map((item: any) => ({
        ...item,
        display_type: item.tipo ? item.tipo.descripcion : '',
      })),
    };
  }

}

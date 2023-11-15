import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { IApiFilterParties } from '../interfaces';

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

  /*uploadDocs(body: IBodyModel): Observable<> {
    return this.apiService.post(`${this.path}/documento/`, body);
  }*/
}

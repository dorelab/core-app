import { Observable, catchError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root',
})
export class AdministrationService {
  private path = 'administration';

  constructor(private apiService: ApiService) {}

  getDefinitions(): Observable<any> {
    return this.apiService.get(`${this.path}/informacion-historica/filtros/`);
  }

  /*uploadDocs(body: IBodyModel): Observable<> {
    return this.apiService.post(`${this.path}/documento/`, body);
  }*/
}

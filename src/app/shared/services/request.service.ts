import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Sesion } from '../_class';
import { Observable } from 'rxjs';
import { RequestFilters } from '../interfaces';

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
}

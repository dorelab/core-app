import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Sesion } from '../_class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SchedulingService {
  private path = 'administration';

  constructor(
    private apiService: ApiService,
  ) {}


  /*createPrivateSession(body: Sesion): Observable<any>{
    return this.apiService.post(`${this.path}/sesion/`, body);
  }

  getSesionsByID(id: number): Observable<any> {
    return this.apiService.get(`${this.path}/sesion/${id}/`);
  }*/
}

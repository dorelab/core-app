import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AlertListService {
  private path = 'administration';

  constructor(private apiService: ApiService) {}

  getAlertsList(filter: any): Observable<any> {
    return this.apiService.get(`${this.path}/alerta/`, filter);
  }

  deleteAlerts(id: number): Observable<any> {
    return this.apiService.delete(`${this.path}/alerta/${id}`);
  }
}

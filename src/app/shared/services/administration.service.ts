import { Observable, catchError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root',
})
export class AdministrationService {
  private path = 'administration';

  constructor(private apiService: ApiService, private router: Router) {}

  /*createComuna(body: ComunaCreateModel): Observable<any> {
    const url = `${this.path}/comuna/`;
    return this.apiService.post(url, body);
  }

  getComunasId(regionId: number): Observable<any> {
    const url = `${this.path}/region/${regionId}/comunas/`;
    return this.apiService.get(url);
  }

  updateComuna(body: ComunaAdminModel): Observable<any> {
    const url = `${this.path}/comuna/${body.id}/`;
    return this.apiService.put(url, body);
  }*/
}

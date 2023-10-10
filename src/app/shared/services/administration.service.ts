import { Observable, catchError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import {
  UniversityCreateModel,
  UniversityModel,
  RegionCreateModel,
  RegionModel,
  ComunaCreateModel,
  ComunaAdminModel
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AdministrationService {
  private path = 'administration';

  constructor(private apiService: ApiService, private router: Router) {}

  //Universities
  createUniversities(body: UniversityCreateModel): Observable<any> {
    const url = `${this.path}/university/`;
    return this.apiService.post(url, body);
  }

  getUniversitiesList(): Observable<any> {
    const url = `${this.path}/university/`;
    return this.apiService.get(url);
  }

  updateUniversities(body: UniversityModel): Observable<any> {
    const url = `${this.path}/university/${body.id}/`;
    return this.apiService.put(url, body);
  }

  // Regiones
  getRegionesList(): Observable<any> {
    return this.apiService.get(`${this.path}/region/`);
  }

  getRegion(id: number): Observable<any> {
    return this.apiService.get(`${this.path}/region/${id}`);
  }

  getRegionesDefault(): Observable<any> {
    return this.apiService.get(`${this.path}/loads/regions/`);
  }

  createRegion(data: RegionCreateModel): Observable<any> {
    return this.apiService.post(`${this.path}/region/`, data);
  }

  updateRegion(data: RegionModel): Observable<any> {
    return this.apiService.put(`${this.path}/region/${data.id}/`, data);
  }

  //Comunas
  createComuna(body: ComunaCreateModel): Observable<any> {
    const url = `${this.path}/comuna/`;
    return this.apiService.post(url, body);
  }

  getComunasList(): Observable<any> {
    return this.apiService.get(`${this.path}/comuna/`);
  }

  getComuna(id: number): Observable<any> {
    return this.apiService.get(`${this.path}/comuna/${id}`);
  }

  getComunasId(regionId: number): Observable<any> {
    const url = `${this.path}/region/${regionId}/comunas/`;
    return this.apiService.get(url);
  }

  updateComuna(body: ComunaAdminModel): Observable<any> {
    const url = `${this.path}/comuna/${body.id}/`;
    return this.apiService.put(url, body);
  }
}

import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Sesion } from '../_class';
import { Observable } from 'rxjs';
import { AttendanceModel, EventsModelsFilters, IAPIFilterSession, IAPIRequestVote, IAPIResponseSesion } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class SchedulingService {
  private path = 'administration';

  constructor(
    private apiService: ApiService,
  ) {}

  vote(body: IAPIRequestVote): Observable<any> {
    return this.apiService.post(`${this.path}/voto/`, body);
  }

  getVoteInicitivaByUser(filters: any): Observable<any> {
    return this.apiService.get(`${this.path}/voto/`, filters);
  }

  getSesions(filter: IAPIFilterSession | null): Observable<any> {
    return this.apiService.get(`${this.path}/sesion/`, filter);
  }

  getEvents(filters: EventsModelsFilters | null): Observable<any> {
    return this.apiService.get(`${this.path}/convocatoria/`, filters);
  }

  attendance(body: AttendanceModel): Observable<any> {
    return this.apiService.post(`${this.path}/asistencia/`, body);
  }

  attendanceByUser(consejero__id: number, sesion__id: number): Observable<any> {
    return this.apiService.get(`${this.path}/asistencia/`, { consejero__id, sesion__id });
  }
}

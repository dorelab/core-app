import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Sesion } from '../_class';
import { Observable } from 'rxjs';
import { IAPIRequestVote } from '../interfaces';

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
}

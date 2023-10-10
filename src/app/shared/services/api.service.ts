import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private route = `${environment.endpoint}/v1`;
  private headersToSend = new HttpHeaders();

  constructor(
    private http:HttpClient,
  ) {
    this.headersToSend = this.headersToSend.set('Content-Type', 'application/json');
  }

  post(ruta: string, payload: object = {}):Observable<Response>{
    return this.http.post<Response>(`${this.route}/${ruta}`, payload);
  }

  get(ruta: string, payload: any = {}):Observable<Response>{
    return this.http.get<Response>(`${this.route}/${ruta}`, { params: payload });
  }

  getFile(ruta: string): Observable<any>{
    return this.http.get(`${ruta}`, { responseType: 'blob' });
  }


  put(ruta: string, payload: object = {}):Observable<Response>{
    return this.http.put<Response>(`${this.route}/${ruta}`, payload );
  }

  patch(ruta: string, payload: object = {}):Observable<Response>{
    return this.http.patch<Response>(`${this.route}/${ruta}`, payload );
  }

  delete(ruta: string, payload: object = {}):Observable<Response>{
    const params = new HttpParams(payload);
    return this.http.delete<Response>(`${this.route}/${ruta}`, {params});
  }
}

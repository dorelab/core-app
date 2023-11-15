import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, last, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlertsService } from './alerts.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private route = `${environment.urlApi}`;
  private headersToSend = new HttpHeaders();
  private _AlertsService: AlertsService = inject(AlertsService);

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

  upLoadFile<T>(
    method: 'POST' | 'PUT' | 'PATCH',
    url: string,
    body: any,
    errorMsg?: string
  ): Observable<T> {
    const formData: FormData = new FormData();
    if (body.additionalParams) {
      const params = body.additionalParams;
      const keys = Object.keys(body.additionalParams);
      keys.forEach((key) => {
        const value = params[key as keyof typeof params];
        if (value) {
          formData.append(
            key,
            typeof value === 'string' ? value : JSON.stringify(value)
          );
        }
      });
    }

    if (body.file && body.name) {
      formData.append(body.name, body.file);
    }

    const req = new HttpRequest(method, `${this.route}/${url}`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request<T>(req).pipe(
      map((event) => this._getPercent(event, body.file ?? null)),
      map((event) =>
        event.EventType === HttpEventType.Response ? event.response : event
      ),
      last(),
      catchError(
        err => {
          throw 'error in source. Details: ' + err;
        }
      )
    );
  }

  private _getPercent(
    event: HttpEvent<any>,
    file: File | null
  ): {
    percent?: number;
    fileName?: string;
    EventType: HttpEventType;
    response?: any;
  } {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        const percentDone = event.total
          ? Math.round((100 * event.loaded) / event.total)
          : 0;
        return {
          percent: percentDone,
          fileName: file ? file.name : '',
          EventType: event.type,
        };

      case HttpEventType.Response:
        return { response: event.body, EventType: event.type };

      default:
        return { EventType: event.type };
    }
  }
}

import { Injectable } from '@angular/core'
import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import { Observable, of, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { AlertsService } from '../services/alerts.service'
import { getToken } from '../helpers/auth.helpers'
import { AuthService } from '../services/auth.service'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    public router: Router,
    private alertsService: AlertsService,
    private authService: AuthService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = getToken();
    request = request.clone({
        setHeaders: {
            Authorization:  `Token ${token}`
        }
    });

    return next.handle(request).pipe(
      catchError((error: any) => {
        /* Si el usuario no esta autorizado para alguna request
        *  sera redirigido hacia la principal del adminpanel
        */
        if (error.status == 401 || error.status == 403) {
          if (error.error.detail) {
            this.alertsService.openSnackBar('Su session ha expirado!', 'error');
            this.authService.cerrarSessionUser();
            return of(error);
          }
          this.alertsService.openSnackBar('No esta autorizado para realizar esta accion!', 'error');
          this.router.navigate(['/admin']);

        } else if(error.status == 500 || error.status == 404) {
          this.alertsService.openSnackBar('Ha ocurrido un error interno, contacte con el administrador del sistema', 'error');
          console.log(error.message);

        } else {
          console.log(error);
          Object.values(error.error).forEach(objError => {
            if (typeof objError === 'object' && objError) {
              Object.values(objError).forEach(msjError => {
                if (typeof msjError === 'string') {
                  this.alertsService.openSnackBar(msjError, 'error');
                }
              });
            } else if(typeof objError === 'string' && objError != '') {
              this.alertsService.openSnackBar(objError, 'error');
            }

            return true;
          });
        }

        /**
         * Retorna throwError para poder capturar el error en los effects
         *
         */
        return throwError(()=>error);
      }),
    )
  }
}

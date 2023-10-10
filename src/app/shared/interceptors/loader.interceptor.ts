import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private countRequest = 0;

  constructor(private loaderService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.countRequest) {
      this.loaderService.show();
    }

    this.countRequest++;

    return next.handle(request)
      .pipe(
        finalize(() => {
          this.countRequest--;
          
          if (!this.countRequest) {
            this.loaderService.hide()
          }
        })
      );
  }
}

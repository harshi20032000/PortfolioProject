import {
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DialogData } from './models/dialog-data';
import { LoaderService } from './shared/services/loader.service';
import { MatDialogService } from './shared/services/mat-dialog.service';
import { WebService } from './shared/services/web.service';

export function appHttpInterceptor(
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  const webService = inject(WebService);
  const loaderService = inject(LoaderService);
  const router = inject(Router);
  const matDialogService = inject(MatDialogService);
  const authToken = webService.getAuthentication;
  const authReq = req.clone({
    headers: req.headers
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${authToken}`),
  });
  loaderService.setLoading(true, req.url);
  return next(req)
    .pipe(
      catchError((error: any) => {
        loaderService.setLoading(false, req.url);
        if (error) if (error.status === 401) logout(webService, router);
        matDialogService.openDialog({
          data: { message: error.error.extendedMessage } as DialogData,
        });
        return error;
      })
    )
    .pipe(
      map((evt: any) => {
        if (evt instanceof HttpResponse) {
          loaderService.setLoading(false, req.url);
          if (evt && evt.body.hasError) {
            matDialogService.openDialog({
              data: { message: evt.body.extendedMessage } as DialogData,
            });
          }
        }
        return evt;
      })
    );
}

function logout(webService: WebService, router: Router): void {
  webService.removeAuthentication();
  router.navigate(['pages/home']);
}

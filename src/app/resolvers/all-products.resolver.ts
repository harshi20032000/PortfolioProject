import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export const getAllProductsResolver: ResolveFn<boolean> = (route, state) => {
  const http = inject(HttpClient);
  const headers: any = new HttpHeaders({ mode: 'no-cors' });

  return http
    .get(`${environment.baseUrl}/getAllProductsForAdmin`, headers)
    .pipe(
      map((result: any) => {
        if (result && !result.hasError) {
          return result.responsePayload;
        }
        return null;
      })
    );
};

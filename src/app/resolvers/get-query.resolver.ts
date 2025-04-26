import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { environment } from 'src/environments/environment';
import { WebService } from '../shared/services/web.service';

export const getQueryResolver: ResolveFn<any> = (route, state) => {
  const http = inject(HttpClient);
  const webService = inject(WebService);
  // const headers = new HttpHeaders();
  const headers = new HttpHeaders({
    h1: 'v1',
    authorization: `Bearer ${webService.getAuthentication}`,
  });

  return http.post(`${environment.baseUrl}/getQuery`, {}, { headers });
};

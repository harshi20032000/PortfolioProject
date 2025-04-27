import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DataFetchService } from 'src/app/shared/services/data-fetch.service';
import { HOME_DETAILS } from '../constants/home-details';

@Injectable({
  providedIn: 'root',
})
class HomeDetailsResolver {
  private dataFetchService = inject(DataFetchService);

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const apiCall = () => this.dataFetchService['http']
      .get(`${environment.baseUrl}/getHomeDetails`)
      .pipe(map((data: any) => data?.responsePayload?.homeDetails));

    const mockData = HOME_DETAILS?.responsePayload?.homeDetails;

    return this.dataFetchService.fetch(apiCall, mockData);
  }
}

export const homeDetailsResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(HomeDetailsResolver).resolve(route);
};

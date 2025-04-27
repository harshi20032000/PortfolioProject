import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DataFetchService } from 'src/app/shared/services/data-fetch.service';
import { CONFIG_DETAILS } from '../constants/config-details';
import { ConfigPayload } from '../models/config-payload';

@Injectable({
  providedIn: 'root',
})
class ConfigResolver {
  private dataFetchService = inject(DataFetchService);

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const pageName = route.url[0].path;
    const specificParamKeys = route.params;

    const postBody: ConfigPayload = {
      pageName,
    };

    Object.values(specificParamKeys).forEach((eachParam: string) => {
      postBody.pageName = eachParam
        ? `${postBody.pageName}-${eachParam}`
        : postBody.pageName;
    });

    const apiCall = () => this.dataFetchService['http']
      .post(`${environment.baseUrl}/GetConfig`, postBody)
      .pipe(map((data: any) => data?.responsePayload));

    const mockData = CONFIG_DETAILS;

    return this.dataFetchService.fetch(apiCall, mockData);
  }
}

export const getConfigResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(ConfigResolver).resolve(route);
};

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {DataFetchService} from 'src/app/shared/services/data-fetch.service'
import { PRODUCT_DETAILS } from '../constants/product-details';

@Injectable({
  providedIn: 'root',
})
class ProductSpecResolver {
  private dataFetchService =inject(DataFetchService);

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const productId =route.params['id'];

    const apiCall =() => this.dataFetchService['http']
    .post(`${environment.baseUrl}/getProductDetails`, {productId})
      .pipe(map((data: any) => data.responsePayload));

      const mockData = {
        productDetails : PRODUCT_DETAILS.find(e=>e.productID==productId)
      };
      return this.dataFetchService.fetch(apiCall, mockData);
  }
}

export const productSpecResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(ProductSpecResolver).resolve(route);
};

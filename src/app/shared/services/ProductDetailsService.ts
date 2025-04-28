import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataFetchService } from 'src/app/shared/services/data-fetch.service';
import { PRODUCT_DETAILS } from 'src/app/constants/product-details';
import { PRODUCT_IMAGES } from 'src/app/constants/product-images';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  constructor(private http: HttpClient, private dataFetchService: DataFetchService) {}

  getProductDetails(productId: string) {

    const apiCall = () => this.http
      .post(`${environment.baseUrl}/getProductDetails`, { productId })
      .pipe(map((data: any) => data?.responsePayload));

    const mockData = PRODUCT_DETAILS.find((e) => e.productID === productId);

    return this.dataFetchService.fetch(apiCall, mockData);
  }

  getProductImages(productId: string, productColorHex: string): Observable<any> {
    const postBody = {
      productID: productId,
      productColorHex: productColorHex,
    };
    const apiCall = () => this.http.post(`${environment.baseUrl}/getImageByColor`, postBody);
    const mockData = of({
        responsePayload: PRODUCT_IMAGES.find(
          (ele) =>
            ele.productID === productId && ele.productColorHex === productColorHex
        ),
      });
    return this.dataFetchService.fetch(apiCall, mockData);
  }

  sendQuery(payload: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/createQuery`, payload);
  }
  
}

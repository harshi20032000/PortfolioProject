import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  createProduct(product: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/createProduct`, product);
  }

  updateProduct(product: any): Observable<any> {
    return this.http.patch(`${environment.baseUrl}/updateProduct`, product);
  }

  removeProduct(productID: string, secretKey: string): Observable<any> {
    const productToRemove = {
      productID,
      secretKey,
    };
    return this.http.post(
      `${environment.baseUrl}/deleteProduct`,
      productToRemove
    );
  }

  searchImageByColor(customProduct: any): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}/getImageByColor`,
      customProduct
    );
  }

  uploadImage(
    productID: string,
    productHexCode: string,
    images: File[]
  ): Observable<any> {
    const formData = new FormData();

    formData.append('productID', productID);
    formData.append('productHexCode', productHexCode);
    images.forEach((eachImage: File) => {
      formData.append('photos', eachImage, eachImage.name);
    });

    return this.http.post(`${environment.baseUrl}/uploadFiles`, formData);
  }

  deleteImage(imageUrl: string): Observable<any> {
    const imageToRemove = {
      imageUrl,
    };
    return this.http.post(`${environment.baseUrl}/deleteImage`, imageToRemove);
  }

  deleteColor(productID: string, colorHexCode: string): Observable<any> {
    const colorToRemove = {
      productID,
      colorHexCode,
    };
    return this.http.post(`${environment.baseUrl}/deleteColor`, colorToRemove);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root', })
export class DataFetchService {
    constructor(private http: HttpClient) { }
    fetch<T>(apiCall:() =>Observable<T>, mockData: T): Observable<T>{
        if(environment.useMockData){
            return of(mockData);
        }else{
            return apiCall();
        }
    }
}
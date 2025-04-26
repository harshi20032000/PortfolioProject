import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MagnifyService {
  private magnifySubject = new Subject<any>();
  magnifyObservable = this.magnifySubject.asObservable();

  showMagnify(content: any) {
    this.magnifySubject.next(content);
  }
}

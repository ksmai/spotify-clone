import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FakeTokenService {
  getAuthHeader(): Observable<Headers> {
    return Observable.of(new Headers());
  }
}

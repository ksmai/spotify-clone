import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FakeMarketService {
  getCountryCode() {
    return Observable.of('US');
  }
}

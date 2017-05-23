import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MarketService {
  private countryCode: string;

  constructor(private http: Http) {
  }

  getCountryCode(): Observable<string> {
    if (this.countryCode) {
      return Observable.of(this.countryCode);
    }

    return this.http
      .get('https://freegeoip.net/json/')
      .map((res: Response) => res.json().country_code as string)
      .do((country) => this.countryCode = country)
      .retry(5)
      .catch(() => Observable.of('US'));
  }
}

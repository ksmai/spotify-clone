import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subscription } from 'rxjs/Subscription';

import { AccessToken } from '../../data-models/access-token';

@Injectable()
export class TokenService {
  private headers: ReplaySubject<Headers>;
  private subscription: Subscription;

  constructor(private http: Http) {
    this.headers = new ReplaySubject(1);
  }

  getAuthHeader(): Observable<Headers> {
    if (!this.subscription) {
      this.scheduleUpdates();
    }

    return this.headers.asObservable().take(1);
  }

  private scheduleUpdates(): void {
    this.subscription = Observable
      .interval(1800000)
      .startWith(-1)
      .switchMap(() => this.updateToken())
      .map((token: AccessToken) => {
        const headers = new Headers();
        const auth = `${token.token_type} ${token.access_token}`;
        headers.append('Authorization', auth);

        return headers;
      })
      .subscribe(this.headers);
  }

  private updateToken(): Observable<AccessToken> {
    return this.http
      .get('https://ksmai-spotify-token.herokuapp.com/token')
      .map((res: Response) => res.json() as AccessToken)
      .retryWhen((errors) => errors.delay(3000));
  }
}

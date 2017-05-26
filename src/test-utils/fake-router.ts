/* tslint:disable no-empty */
import { Injectable } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FakeRouter {
  events = Observable.of(new NavigationEnd(1, '/', '/'));
  navigate(url: any) { }
}

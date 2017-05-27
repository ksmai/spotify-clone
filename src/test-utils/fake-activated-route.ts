import { Injectable } from '@angular/core';
import 'rxjs/add/observable/empty';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FakeActivatedRoute {
  data = Observable.empty();
}

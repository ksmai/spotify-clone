import { Injectable } from '@angular/core';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/scan';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { SearchHistory } from '../../data-models/search-history';

@Injectable()
export class SearchHistoryService {
  private results: Subject<SearchHistory>;
  private histories: Observable<SearchHistory[]>;
  private max = 10;

  constructor() {
    this.results = new Subject<SearchHistory>();
    this.histories = this.results
      .scan((histories, result) => {
        const duplicate = histories.find((record) => {
          return record.type === result.type &&
            record.id === result.id;
        });
        if (duplicate) {
          return histories;
        }

        return [result].concat(histories).slice(0, this.max);
      }, [])
      .publishReplay(1)
      .refCount();
  }

  nextResult(result: SearchHistory): void {
    this.results.next(result);
  }

  getHistories(): Observable<SearchHistory[]> {
    return this.histories;
  }
}

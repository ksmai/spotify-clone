import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/scan';
import {
  ConnectableObservable,
} from 'rxjs/observable/ConnectableObservable';
import { Subject } from 'rxjs/Subject';

import { SearchHistory } from '../../data-models/search-history';
import { StorageService } from './storage.service';

@Injectable()
export class PlayerHistoryService {
  private resets: Subject<SearchHistory[]>;
  private records: Subject<SearchHistory>;
  private histories: ConnectableObservable<SearchHistory[]>;
  private max = 10;
  private storageKey = 'playerHistory';

  constructor(private storageService: StorageService) {
    this.resets = new Subject<SearchHistory[]>();
    this.records = new Subject<SearchHistory>();

    this.histories = this.records
      .merge(this.resets)
      .scan((histories: SearchHistory[], current) => {
        if (Array.isArray(current)) {
          return current;
        }

        const duplicate = histories.find((record) => {
          return record.type === current.type &&
            record.id === current.id;
        });
        if (duplicate) {
          return histories;
        }

        return [{
          id: current.id,
          name: current.name,
          type: current.type,
        }].concat(histories).slice(0, this.max);
      }, [])
      .do((histories) => {
        this.storageService.store(this.storageKey, histories);
      })
      .publishReplay(1);

    this.histories.connect();
    this.initHistory();
  }

  getHistories(): ConnectableObservable<SearchHistory[]> {
    return this.histories;
  }

  nextRecord(record: SearchHistory) {
    this.records.next(record);
  }

  reset(records: SearchHistory[] = []): void {
    this.resets.next(records);
  }

  initHistory(): void {
    const initialHistories = this.storageService.retrieve(this.storageKey);
    if (Array.isArray(initialHistories)) {
      this.reset(initialHistories);
    }
  }
}

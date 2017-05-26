import { ReflectiveInjector } from '@angular/core';

import { FakeStorageService } from '../../test-utils/';
import { SearchHistoryService } from './search-history.service';
import { StorageService } from './storage.service';

describe('SearchHistoryService', () => {
  let injector: ReflectiveInjector;
  let storeSpy: jasmine.Spy;
  let retrieveSpy: jasmine.Spy;
  let searchHistoryService: SearchHistoryService;
  let storageService: StorageService;

  beforeEach(() => {
    injector = ReflectiveInjector.resolveAndCreate([
      { provide: StorageService, useClass: FakeStorageService },
      SearchHistoryService,
    ]);

    searchHistoryService = injector.get(SearchHistoryService);
    storageService = injector.get(StorageService);
    storeSpy = spyOn(storageService, 'store');
    retrieveSpy = spyOn(storageService, 'retrieve');
  });

  it('should be able to add items', (done) => {
    const item1 = { type: 'artist', id: '1', name: 'me' };
    const item2 = { type: 'album', id: '2', name: 'cool' };
    let emitCount = 0;
    searchHistoryService.getHistories().subscribe((histories) => {
      emitCount += 1;
      expect(storeSpy).toHaveBeenCalledTimes(emitCount);
      if (emitCount === 1) {
        expect(histories).toEqual([item1]);
      } else {
        expect(histories).toEqual([item2, item1]);
        done();
      }
    });

    searchHistoryService.nextResult(item1);
    searchHistoryService.nextResult(item2);
  });

  it('should be able to reset items', (done) => {
    const items = [
      { type: 'artist', id: '1', name: 'me' },
      { type: 'album', id: '2', name: 'cool' },
    ];
    searchHistoryService.getHistories().subscribe((histories) => {
      expect(histories).toEqual(items);
      done();
    });
    searchHistoryService.reset(items);
  });
});

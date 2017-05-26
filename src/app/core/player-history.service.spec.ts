import { ReflectiveInjector } from '@angular/core';

import { FakeStorageService } from '../../test-utils/';
import { PlayerHistoryService } from './player-history.service';
import { StorageService } from './storage.service';

describe('PlayerHistoryService', () => {
  let injector: ReflectiveInjector;
  let storeSpy: jasmine.Spy;
  let retrieveSpy: jasmine.Spy;
  let playerHistoryService: PlayerHistoryService;
  let storageService: StorageService;

  beforeEach(() => {
    injector = ReflectiveInjector.resolveAndCreate([
      { provide: StorageService, useClass: FakeStorageService },
      PlayerHistoryService,
    ]);

    playerHistoryService = injector.get(PlayerHistoryService);
    storageService = injector.get(StorageService);
    storeSpy = spyOn(storageService, 'store');
    retrieveSpy = spyOn(storageService, 'retrieve');
  });

  it('should be able to add items', (done) => {
    const item1 = { type: 'artist', id: '1', name: 'me' };
    const item2 = { type: 'album', id: '2', name: 'cool' };
    let emitCount = 0;
    playerHistoryService.getHistories().subscribe((histories) => {
      emitCount += 1;
      expect(storeSpy).toHaveBeenCalledTimes(emitCount);
      if (emitCount === 1) {
        expect(histories).toEqual([item1]);
      } else {
        expect(histories).toEqual([item2, item1]);
        done();
      }
    });

    playerHistoryService.nextRecord(item1);
    playerHistoryService.nextRecord(item2);
  });

  it('should be able to reset items', (done) => {
    const items = [
      { type: 'artist', id: '1', name: 'me' },
      { type: 'album', id: '2', name: 'cool' },
    ];
    playerHistoryService.getHistories().subscribe((histories) => {
      expect(histories).toEqual(items);
      done();
    });
    playerHistoryService.reset(items);
  });
});

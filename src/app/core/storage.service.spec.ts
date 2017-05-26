import { StorageService } from './storage.service';

let storageService: StorageService;
let getItemSpy: jasmine.Spy;
let setItemSpy: jasmine.Spy;

describe('StorageService', () => {
  beforeEach(() => {
    storageService = new StorageService();
    getItemSpy = spyOn(window.localStorage, 'getItem');
    setItemSpy = spyOn(window.localStorage, 'setItem');
  });

  it('should retrieve from localStorage', () => {
    storageService.retrieve('myKey');
    expect(getItemSpy).toHaveBeenCalledWith('myKey');
  });

  it('should store in localStorage', () => {
    storageService.store('someKey', 123);
    expect(setItemSpy).toHaveBeenCalledWith('someKey', '123');
  });
});

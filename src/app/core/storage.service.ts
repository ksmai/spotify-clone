import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  store(key: string, value: any): void {
    if (window && window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }

  retrieve(key: string): any {
    if (window && window.localStorage) {
      const json = window.localStorage.getItem(key);
      try {
        return JSON.parse(json);
      } catch (e) {
        return null;
      }
    }
  }
}

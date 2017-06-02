import { ReflectiveInjector } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http,
  RequestOptions,
  Response,
  ResponseOptions,
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { SearchResult } from '../../data-models/search-result';
import { FakeMarketService, FakeTokenService } from '../../test-utils/';
import { MarketService } from './market.service';
import { SearchService } from './search.service';
import { TokenService } from './token.service';

describe('SearchService', () => {
  let injector: ReflectiveInjector;
  let mockBackend: MockBackend;
  let lastConnection: any;
  let searchService: SearchService;
  let marketSpy: jasmine.Spy;
  let tokenSpy: jasmine.Spy;

  beforeEach(() => {
    injector = ReflectiveInjector.resolveAndCreate([
      { provide: RequestOptions, useClass: BaseRequestOptions },
      { provide: ConnectionBackend, useClass: MockBackend },
      { provide: MarketService, useClass: FakeMarketService },
      { provide: TokenService, useClass: FakeTokenService },
      Http,
      SearchService,
    ]);

    searchService = injector.get(SearchService);
    mockBackend = injector.get(ConnectionBackend) as MockBackend;
    mockBackend.connections.subscribe((conn: any) => lastConnection = conn);
    lastConnection = null;
    marketSpy = spyOn(injector.get(MarketService), 'getCountryCode')
      .and.callThrough();
    tokenSpy = spyOn(injector.get(TokenService), 'getAuthHeader')
      .and.callThrough();
  });

  afterEach(() => {
    mockBackend.verifyNoPendingRequests();
  });

  it('should send a request to Spoyify API', fakeAsync(() => {
    const testResult: SearchResult = {
      artists: null,
      albums: null,
      tracks: null,
      best_match: null,
      query: 'abc123*',
    };
    searchService.getResults().subscribe((result) => {
      expect(result).toEqual(testResult);
    });

    searchService.nextQuery(testResult.query);
    tick(10000); // debounceTime = 300

    expect(marketSpy).toHaveBeenCalled();
    expect(tokenSpy).toHaveBeenCalled();
    expect(lastConnection).toBeTruthy();
    expect(lastConnection.request.url)
      .toContain('https://api.spotify.com/v1/search');
    lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({
        albums: testResult.albums,
        artists: testResult.artists,
        tracks: testResult.tracks,
        best_match: testResult.best_match,
      }),
    })));

    tick();
  }));
});

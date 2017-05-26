import { ReflectiveInjector } from '@angular/core';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http,
  RequestOptions,
  Response,
  ResponseOptions,
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { MarketService } from './market.service';

describe('MarketService', () => {
  let injector: ReflectiveInjector;
  let mockBackend: MockBackend;
  let lastConnection: any;
  let marketService: MarketService;

  beforeEach(() => {
    injector = ReflectiveInjector.resolveAndCreate([
      { provide: RequestOptions, useClass: BaseRequestOptions },
      { provide: ConnectionBackend, useClass: MockBackend },
      Http,
      MarketService,
    ]);

    marketService = injector.get(MarketService);
    mockBackend = injector.get(ConnectionBackend) as MockBackend;
    mockBackend.connections.subscribe((conn: any) => lastConnection = conn);
    lastConnection = null;
  });

  afterEach(() => {
    mockBackend.verifyNoPendingRequests();
  });

  it('should send a request to freegeoip', (done) => {
    const testCode = 'Something weird';
    marketService.getCountryCode().subscribe((code: string) => {
      expect(code).toEqual(testCode);
      done();
    });

    expect(lastConnection).toBeTruthy();
    expect(lastConnection.request.url)
      .toEqual('https://freegeoip.net/json/');
    lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({ country_code: testCode }),
    })));
  });
});

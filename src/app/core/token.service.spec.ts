import { ReflectiveInjector } from '@angular/core';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Headers,
  Http,
  RequestOptions,
  Response,
  ResponseOptions,
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { AccessToken } from '../../data-models/access-token';
import { TokenService } from './token.service';

describe('MarketService', () => {
  let injector: ReflectiveInjector;
  let mockBackend: MockBackend;
  let lastConnection: any;
  let tokenService: TokenService;

  beforeEach(() => {
    injector = ReflectiveInjector.resolveAndCreate([
      { provide: RequestOptions, useClass: BaseRequestOptions },
      { provide: ConnectionBackend, useClass: MockBackend },
      Http,
      TokenService,
    ]);

    tokenService = injector.get(TokenService);
    mockBackend = injector.get(ConnectionBackend) as MockBackend;
    mockBackend.connections.subscribe((conn: any) => lastConnection = conn);
    lastConnection = null;
  });

  afterEach(() => {
    mockBackend.verifyNoPendingRequests();
  });

  it('should send a request to the backend server', (done) => {
    const testToken: AccessToken = {
      access_token: 'abc',
      token_type: 'def',
      expires_in: 123,
    };
    tokenService.getAuthHeader().subscribe((headers: Headers) => {
      const actual = headers.get('Authorization');
      const expected = `${testToken.token_type} ${testToken.access_token}`;
      expect(actual).toEqual(expected);
      done();
    });

    expect(lastConnection).toBeTruthy();
    expect(lastConnection.request.url)
      .toEqual('https://ksmai-spotify-token.herokuapp.com/token');
    lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify(testToken),
    })));
  });
});

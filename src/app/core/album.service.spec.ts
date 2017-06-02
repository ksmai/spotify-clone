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

import { Album } from '../../data-models/album';
import { FakeTokenService, testAlbum } from '../../test-utils/';
import { AlbumService } from './album.service';
import { TokenService } from './token.service';

const myAlbum: Album = testAlbum();

describe('AlbumService', () => {
  let injector: ReflectiveInjector;
  let mockBackend: MockBackend;
  let lastConnection: any;
  let albumService: AlbumService;
  let tokenSpy: jasmine.Spy;

  beforeEach(() => {
    injector = ReflectiveInjector.resolveAndCreate([
      { provide: RequestOptions, useClass: BaseRequestOptions },
      { provide: ConnectionBackend, useClass: MockBackend },
      { provide: TokenService, useClass: FakeTokenService },
      Http,
      AlbumService,
    ]);

    albumService = injector.get(AlbumService);
    mockBackend = injector.get(ConnectionBackend) as MockBackend;
    mockBackend.connections.subscribe((conn: any) => lastConnection = conn);
    lastConnection = null;
    tokenSpy = spyOn(injector.get(TokenService), 'getAuthHeader')
      .and.callThrough();
  });

  afterEach(() => {
    mockBackend.verifyNoPendingRequests();
  });

  it('should send a request to spotify api', (done) => {
    albumService.getById('123').subscribe((album: Album) => {
      expect(album).toEqual(myAlbum);
      done();
    });

    expect(tokenSpy).toHaveBeenCalled();
    expect(lastConnection).toBeTruthy();
    expect(lastConnection.request.url)
      .toEqual('https://api.spotify.com/v1/albums/123');
    lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify(myAlbum),
    })));
  });
});

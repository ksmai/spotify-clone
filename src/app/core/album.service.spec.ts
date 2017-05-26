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
import { testAlbum } from '../../test-utils/';
import { AlbumService } from './album.service';

const myAlbum: Album = testAlbum();

describe('AlbumService', () => {
  let injector: ReflectiveInjector;
  let mockBackend: MockBackend;
  let lastConnection: any;
  let albumService: AlbumService;

  beforeEach(() => {
    injector = ReflectiveInjector.resolveAndCreate([
      { provide: RequestOptions, useClass: BaseRequestOptions },
      { provide: ConnectionBackend, useClass: MockBackend },
      Http,
      AlbumService,
    ]);

    albumService = injector.get(AlbumService);
    mockBackend = injector.get(ConnectionBackend) as MockBackend;
    mockBackend.connections.subscribe((conn: any) => lastConnection = conn);
    lastConnection = null;
  });

  afterEach(() => {
    mockBackend.verifyNoPendingRequests();
  });

  it('should send a request to spotify api', (done) => {
    albumService.getById('123').subscribe((album: Album) => {
      expect(album).toEqual(myAlbum);
      done();
    });

    expect(lastConnection).toBeTruthy();
    expect(lastConnection.request.url)
      .toEqual('https://api.spotify.com/v1/albums/123');
    lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify(myAlbum),
    })));
  });
});

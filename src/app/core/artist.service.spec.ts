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

import {
  FakeMarketService,
  testAlbum,
  testArtist,
  testTrack,
} from '../../test-utils/';
import { ArtistService } from './artist.service';
import { MarketService } from './market.service';

const myArtist = testArtist();
const myTracks = [testTrack(), testTrack()];
const myAlbums = [testAlbum()];

describe('ArtistService', () => {
  let injector: ReflectiveInjector;
  let artistService: ArtistService;
  let mockBackend: MockBackend;
  let lastConnection: any;
  let marketSpy: jasmine.Spy;

  beforeEach(() => {
    injector = ReflectiveInjector.resolveAndCreate([
      { provide: MarketService, useClass: FakeMarketService },
      { provide: ConnectionBackend, useClass: MockBackend },
      { provide: RequestOptions, useClass: BaseRequestOptions },
      Http,
      ArtistService,
    ]);

    artistService = injector.get(ArtistService);
    mockBackend = injector.get(ConnectionBackend) as MockBackend;
    mockBackend.connections.subscribe((conn: any) => lastConnection = conn);
    lastConnection = null;
    marketSpy = spyOn(injector.get(MarketService), 'getCountryCode')
      .and.callThrough();
  });

  afterEach(() => {
    mockBackend.verifyNoPendingRequests();
  });

  it('should get artist data using id', (done) => {
    artistService.getArtist('123').subscribe((artist) => {
      expect(artist).toEqual(myArtist);
      done();
    });

    expect(lastConnection).toBeTruthy();
    expect(lastConnection.request.url)
      .toEqual('https://api.spotify.com/v1/artists/123');

    lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify(myArtist),
    })));
  });

  it('should get related artists using id', (done) => {
    artistService.getRelatedArtists('123').subscribe((artists) => {
      expect(artists).toEqual([myArtist]);
      done();
    });

    expect(lastConnection).toBeTruthy();
    expect(lastConnection.request.url)
      .toEqual('https://api.spotify.com/v1/artists/123/related-artists');

    lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({ artists: [myArtist] }),
    })));
  });

  it('should get top tracks using id', (done) => {
    artistService.getTopTracks('123').subscribe((tracks) => {
      expect(tracks).toEqual(myTracks);
      done();
    });

    expect(marketSpy).toHaveBeenCalled();
    expect(lastConnection).toBeTruthy();
    expect(lastConnection.request.url)
      .toContain('https://api.spotify.com/v1/artists/123/top-tracks');

    lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({ tracks: myTracks }),
    })));
  });

  it('should get albums using artist id', (done) => {
    artistService.getAlbums('123').subscribe((albums) => {
      expect(albums).toEqual(myAlbums);
      done();
    });

    expect(marketSpy).toHaveBeenCalled();
    expect(lastConnection).toBeTruthy();
    expect(lastConnection.request.url)
      .toContain('https://api.spotify.com/v1/artists/123/albums');

    lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({
        next: null,
        previous: null,
        total: 1,
        offset: 0,
        items: myAlbums,
        limit: 50,
        href: '/some/url',
      }),
    })));
  });
});

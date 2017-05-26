import { ReflectiveInjector } from '@angular/core';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http,
  RequestOptions,
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import {
  FakeMarketService,
  FakeStorageService,
  testAlbum,
  testArtist,
  testTrack,
} from '../../test-utils/';
import { AlbumService } from './album.service';
import { ArtistService } from './artist.service';
import { MarketService } from './market.service';
import { PlayerHistoryService } from './player-history.service';
import { PlayerService } from './player.service';
import { StorageService } from './storage.service';

describe('PlayerService', () => {
  let injector: ReflectiveInjector;
  let playerService: PlayerService;
  let albumService: AlbumService;
  let artistService: ArtistService;

  beforeEach(() => {
    injector = ReflectiveInjector.resolveAndCreate([
      { provide: RequestOptions, useClass: BaseRequestOptions },
      { provide: ConnectionBackend, useClass: MockBackend },
      { provide: MarketService, useClass: FakeMarketService },
      { provide: StorageService, useClass: FakeStorageService },
      Http,
      AlbumService,
      ArtistService,
      PlayerHistoryService,
      PlayerService,
    ]);

    playerService = injector.get(PlayerService);
    artistService = injector.get(ArtistService);
    albumService = injector.get(AlbumService);
  });

  it('should play', (done) => {
    playerService.getRequest().subscribe((req: boolean) => {
      expect(req).toBe(true);
      done();
    });

    playerService.play();
  });

  it('should pause', (done) => {
    playerService.getRequest().subscribe((req: boolean) => {
      expect(req).toBe(false);
      done();
    });

    playerService.pause();
  });

  it('should update player status', (done) => {
    const status = {
      track: testTrack(),
      paused: false,
      context: {
        type: 'album',
        id: testAlbum().id,
      },
    };

    playerService.updateStatus(status);
    // subscribe after updating since it is a behavior subject
    playerService.getCurrentStatus().subscribe((currentStatus: any) => {
      expect(currentStatus).toEqual(status);
      done();
    });
  });

  it('should play a list of track', (done) => {
    const tracks = [testTrack(), testTrack()];

    playerService.playTrackList(tracks, { type: '', id: '' });
    // subscribe after updating since it is a behaviour subject
    playerService.getPlaylist().subscribe((playlist) => {
      expect(playlist).toEqual(tracks);
      done();
    });
  });

  it('should play top tracks of an artist', (done) => {
    const tracks = [testTrack(), testTrack()];
    const topTrackSpy = spyOn(artistService, 'getTopTracks')
      .and.returnValue(Observable.of(tracks));

    playerService.playArtistWithID('123');
    expect(topTrackSpy).toHaveBeenCalled();
    // subscribe after updating since it is a behaviour subject
    playerService.getPlaylist().subscribe((playlist) => {
      expect(playlist).toEqual(tracks);
      done();
    });
  });

  it('should play an album', (done) => {
    const tracks = [testTrack(), testTrack()];
    const album = testAlbum();
    album.tracks.items = tracks;

    playerService.playAlbum(album);
    // subscribe after updating since it is a behaviour subject
    playerService.getPlaylist().subscribe((playlist) => {
      playlist.forEach((track, idx) => {
        expect(track.id).toEqual(tracks[idx].id);
      });
      done();
    });
  });

  it('should query for album data using its ID and play', (done) => {
    const tracks = [testTrack(), testTrack()];
    const album = testAlbum();
    album.tracks.items = tracks;

    const albumSpy = spyOn(albumService, 'getById')
      .and.returnValue(Observable.of(album));

    playerService.playAlbumWithID('123');
    expect(albumSpy).toHaveBeenCalled();
    // subscribe after updating since it is a behaviour subject
    playerService.getPlaylist().subscribe((playlist) => {
      playlist.forEach((track, idx) => {
        expect(track.id).toEqual(tracks[idx].id);
      });
      done();
    });
  });
});

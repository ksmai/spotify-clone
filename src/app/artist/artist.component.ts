import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/distinct';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { Artist } from '../../data-models/artist';
import { Playing } from '../../data-models/playing';
import { SimplifiedAlbum } from '../../data-models/simplified-album';
import { Track } from '../../data-models/track';
import { PlayerService } from '../core/player.service';

@Component({
  templateUrl: './artist.component.html',
  styleUrls: ['../shared/play-button.scss', './artist.component.scss'],
})
export class ArtistComponent implements OnInit {
  albums: Observable<SimplifiedAlbum[]>;
  latestAlbum: Observable<SimplifiedAlbum>;
  singles: Observable<SimplifiedAlbum[]>;
  compilations: Observable<SimplifiedAlbum[]>;
  artists: Observable<Artist[]>;
  tracks: Observable<Track[]>;
  artist: Observable<Artist>;
  playable: Observable<boolean>;
  currentStatus: Observable<Playing>;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
  ) {
  }

  ngOnInit() {
    this.artists = this.route.data
      .pluck('artists')
      .map((artists: Artist[]) => artists && artists.length > 0 ?
        artists :
        null);
    this.tracks = this.route.data.pluck('tracks');
    this.artist = this.route.data.pluck('artist');
    this.albums = this.filterAlbums('album');
    this.singles = this.filterAlbums('single');
    this.compilations = this.filterAlbums('compilation');
    this.playable = this.tracks
      .map((tracks: Track[]) => tracks.some((track) => !!track.preview_url));
    this.currentStatus = this.playerService.getCurrentStatus();
    this.latestAlbum = this.albums.map((albums) => albums && albums[0]);
  }

  play(tracks: Track[], info: Artist, status: Playing): void {
    if (this.matchArtist(info, status)) {
      this.playerService.play();
    } else {
      this.playerService.playTrackList(
        tracks,
        { type: 'artist', id: info.id },
      );
    }
  }

  pause(): void {
    this.playerService.pause();
  }

  matchArtist(info: Artist, status: Playing) {
    return status.context.type === 'artist' &&
      !!status.track &&
      status.context.id === info.id;
  }

  isPlaying(info: Artist, status: Playing) {
    return !status.paused && this.matchArtist(info, status);
  }

  private filterAlbums(albumType: string): Observable<SimplifiedAlbum[]> {
    return this.route.data
      .pluck('albums')
      .switchMap((albums: SimplifiedAlbum[]) => Observable.from(albums))
      .filter((album) => album.album_type === albumType)
      .distinct((album) => album.name
        .replace(/\s*\(.*\)\s*/g, '')
        .replace(/\s*\[.*\]\s*/g, ''))
      .scan((list, cur) => list.concat(cur), []);
  }
}

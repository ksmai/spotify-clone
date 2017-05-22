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
import { SimplifiedAlbum } from '../../data-models/simplified-album';
import { Track } from '../../data-models/track';
import { PlayerService } from '../core/player.service';

@Component({
  templateUrl: './artist.component.html',
  styleUrls: ['../shared/play-button.scss', './artist.component.scss'],
})
export class ArtistComponent implements OnInit {
  albums: Observable<SimplifiedAlbum[]>;
  singles: Observable<SimplifiedAlbum[]>;
  compilations: Observable<SimplifiedAlbum[]>;
  artists: Observable<Artist[]>;
  tracks: Observable<Track[]>;
  artist: Observable<Artist>;
  playable: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
  ) {
  }

  ngOnInit() {
    this.artists = this.route.data.pluck('artists');
    this.tracks = this.route.data.pluck('tracks');
    this.artist = this.route.data.pluck('artist');
    this.albums = this.filterAlbums('album');
    this.singles = this.filterAlbums('single');
    this.compilations = this.filterAlbums('compilation');
    this.playable = this.tracks
      .map((tracks: Track[]) => tracks.some((track) => !!track.preview_url));
  }

  play(tracks: Track[]): void {
    this.playerService.playTrackList(tracks, 'artist');
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

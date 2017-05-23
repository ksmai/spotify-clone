import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Artist } from '../../../data-models/artist';
import { Playing } from '../../../data-models/playing';
import { SimplifiedAlbum } from '../../../data-models/simplified-album';
import { Track } from '../../../data-models/track';
import { PlayerService } from '../../core/player.service';
import { SearchService } from '../../core/search.service';

@Component({
  selector: 'spot-top-result',
  templateUrl: './top-result.component.html',
  styleUrls: ['./top-result.component.scss'],
})
export class TopResultComponent implements OnInit {
  @Output() switchTab = new EventEmitter<string>();
  tracks: Observable<Track[]>;
  artists: Observable<Artist[]>;
  albums: Observable<SimplifiedAlbum[]>;
  best: Observable<Array<Track|Artist|SimplifiedAlbum>>;
  currentStatus: Observable<Playing>;

  constructor(
    private searchService: SearchService,
    private playerService: PlayerService,
  ) {
  }

  ngOnInit() {
    this.tracks = this.searchService.getTracks().let(this.first(5));
    this.artists = this.searchService.getArtists().let(this.first(8));
    this.albums = this.searchService.getAlbums().let(this.first(8));
    this.best = this.searchService.getBest();
    this.currentStatus = this.playerService.getCurrentStatus();
  }

  matchAlbum(album: SimplifiedAlbum, status: Playing): boolean {
    return status.context.type === 'album' &&
      status.context.id === album.id;
  }

  matchArtist(artist: Artist, status: Playing): boolean {
    return status.context.type === 'artist' &&
      status.context.id === artist.id;
  }

  playingAlbumID(status: Playing): string {
    return status.context.type === 'album' ?
      status.context.id :
      null;
  }

  playingArtistID(status: Playing): string {
    return status.context.type === 'artist' ?
      status.context.id :
      null;
  }

  onSwitchTab(tab: string): void {
    this.switchTab.emit(tab);
  }

  private first(n: number) {
    return (source: Observable<any>) => {
      return source.map((arr: any[]) => arr && arr.slice(0, n));
    };
  }
}

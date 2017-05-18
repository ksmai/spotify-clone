import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Artist } from '../../../data-models/artist';
import { SimplifiedAlbum } from '../../../data-models/simplified-album';
import { Track } from '../../../data-models/track';
import { SearchService } from '../../core/search.service';

@Component({
  selector: 'spot-top-result',
  templateUrl: './top-result.component.html',
  styleUrls: ['./top-result.component.scss'],
})
export class TopResultComponent implements OnInit {
  tracks: Observable<Track[]>;
  artists: Observable<Artist[]>;
  albums: Observable<SimplifiedAlbum[]>;
  best: Observable<Array<Track|Artist|SimplifiedAlbum>>;

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
    this.tracks = this.searchService.getTracks().let(this.first(5));
    this.artists = this.searchService.getArtists().let(this.first(8));
    this.albums = this.searchService.getAlbums().let(this.first(8));
    this.best = this.searchService.getBest();
  }

  private first(n: number) {
    return (source: Observable<any>) => {
      return source.map((arr: any[]) => arr && arr.slice(0, n));
    };
  }
}

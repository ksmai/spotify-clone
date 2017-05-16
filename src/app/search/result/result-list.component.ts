import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Artist } from '../../../data-models/artist';
import { SimplifiedAlbum } from '../../../data-models/simplified-album';
import { Track } from '../../../data-models/track';
import { SearchService } from '../../core/search.service';

@Component({
  selector: 'spot-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss'],
})
export class ResultListComponent implements OnInit {
  albums: Observable<SimplifiedAlbum[]>;
  artists: Observable<Artist[]>;
  tracks: Observable<Track[]>;

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
    this.albums = this.searchService.getAlbums();
    this.artists = this.searchService.getArtists();
    this.tracks = this.searchService.getTracks();
  }
}

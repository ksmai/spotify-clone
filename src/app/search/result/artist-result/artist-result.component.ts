import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Artist } from '../../../../data-models/artist';
import { SearchService } from '../../../core/search.service';

@Component({
  selector: 'spot-artist-result',
  templateUrl: './artist-result.component.html',
  styleUrls: ['./artist-result.component.scss'],
})
export class ArtistResultComponent implements OnInit {
  artists: Observable<Artist[]>;

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
    this.artists = this.searchService.getArtists();
  }
}

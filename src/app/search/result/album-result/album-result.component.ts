import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {
  SimplifiedAlbum,
} from '../../../../data-models/simplified-album';
import { SearchService } from '../../../core/search.service';

@Component({
  templateUrl: './album-result.component.html',
  styleUrls: ['./album-result.component.scss'],
  selector: 'spot-album-result',
})
export class AlbumResultComponent implements OnInit {
  albums: Observable<SimplifiedAlbum[]>;

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
    this.albums = this.searchService.getAlbums();
  }
}

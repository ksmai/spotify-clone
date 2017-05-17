import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Track } from '../../../../data-models/track';
import { SearchService } from '../../../core/search.service';

@Component({
  selector: 'spot-track-result',
  templateUrl: './track-result.component.html',
  styleUrls: ['./track-result.component.scss'],
})
export class TrackResultComponent implements OnInit {
  tracks: Observable<Track[]>;

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
    this.tracks = this.searchService.getTracks();
  }
}

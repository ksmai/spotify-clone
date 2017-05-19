import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/let';

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
  best: Observable<Array<SimplifiedAlbum|Artist|Track>>;
  isLoading: Observable<boolean>;
  selectedIndex: number;

  constructor(private searchService: SearchService) {
  }

  switchTab(label: string) {
    if (label === 'artists') {
      this.selectedIndex = 1;
    } else if(label === 'albums') {
      this.selectedIndex = 3;
    }
  }

  ngOnInit() {
    this.albums = this.searchService.getAlbums().let(this.hasItem);
    this.artists = this.searchService.getArtists().let(this.hasItem);
    this.tracks = this.searchService.getTracks().let(this.hasItem);
    this.best = this.searchService.getBest();
    this.isLoading = this.searchService.getLoadingStatus();
  }

  private hasItem<T>(src: Observable<T[]>): Observable<T[]> {
    return src.map((arr) => arr.length ? arr : null);
  }

  @HostListener('window:scroll')
  private onScroll(): void {
    const bottom = window.scrollY + window.innerHeight;
    const target = 0.9 * document.body.scrollHeight;
    const toLoad = !!this.selectedIndex && bottom > target;

    if (!toLoad) {
      return;
    }

    switch (this.selectedIndex) {
      case 1:
        this.searchService.nextArtists();
        break;

      case 2:
        this.searchService.nextTracks();
        break;

      case 3:
        this.searchService.nextAlbums();
        break;

      default:
        break;
    }
  }
}

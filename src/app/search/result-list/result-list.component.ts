import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MdTab } from '@angular/material';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Artist } from '../../../data-models/artist';
import { Playing } from '../../../data-models/playing';
import { SearchHistory } from '../../../data-models/search-history';
import { SimplifiedAlbum } from '../../../data-models/simplified-album';
import { Track } from '../../../data-models/track';
import { PlayerService } from '../../core/player.service';
import { SearchHistoryService } from '../../core/search-history.service';
import { SearchService } from '../../core/search.service';

@Component({
  selector: 'spot-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss'],
})
export class ResultListComponent implements OnInit, OnDestroy {
  albums: Observable<SimplifiedAlbum[]>;
  artists: Observable<Artist[]>;
  tracks: Observable<Track[]>;
  best: Observable<Array<SimplifiedAlbum|Artist|Track>>;
  isLoading: Observable<boolean>;
  selectedIndex: number;
  currentStatus: Observable<Playing>;
  histories: Observable<SearchHistory[]>;
  subscription: Subscription;

  @ViewChildren(MdTab) private tabs: QueryList<MdTab>;

  constructor(
    private searchService: SearchService,
    private playerService: PlayerService,
    private searchHistoryService: SearchHistoryService,
  ) {
  }

  switchTab(label: string) {
    if (!this.tabs) {
      return;
    }

    const idx = this.tabs
      .map((tab: MdTab) => tab.textLabel.toLowerCase())
      .findIndex((textLabel) => textLabel.includes(label));

    if (idx > -1) {
      this.selectedIndex = idx;
    }
  }

  ngOnInit() {
    this.albums = this.searchService.getAlbums().let(this.hasItem);
    this.artists = this.searchService.getArtists().let(this.hasItem);
    this.tracks = this.searchService.getTracks().let(this.hasItem);
    this.best = this.searchService.getBest();
    this.isLoading = this.searchService.getLoadingStatus();
    this.currentStatus = this.playerService.getCurrentStatus();
    this.histories = this.searchHistoryService
      .getHistories()
      .let(this.hasItem);

    this.subscription = this.best.subscribe((item) => {
      if (!!item) {
        setTimeout(() => this.switchTab('top'), 0);
      }
    });

    // prevent switching tab to the left
    // when the "recent searches" tab appears from thin air
    this.subscription.add(
      this.histories.subscribe((histories) => {
        if (histories.length === 1) {
          setTimeout(() => this.selectedIndex += 1, 0);
        }
      }),
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  playingArtistID(currentStatus: Playing): string {
    return currentStatus.context.type === 'artist' ?
      currentStatus.context.id :
      null;
  }

  playingAlbumID(currentStatus: Playing): string {
    return currentStatus.context.type === 'album' ?
      currentStatus.context.id :
      null;
  }

  private hasItem<T>(src: Observable<T[]>): Observable<T[]> {
    return src.map((arr) => arr && arr.length ? arr : null);
  }

  @HostListener('window:scroll')
  private onScroll(): void {
    const bottom = window.scrollY + window.innerHeight;
    const target = 0.9 * document.body.scrollHeight;
    const toLoad = !!this.selectedIndex && bottom > target;

    if (!toLoad) {
      return;
    }

    const activeTab = this.tabs && this.tabs.toArray()[this.selectedIndex];
    if (!activeTab) {
      return;
    }

    switch (activeTab.textLabel) {
      case 'ARTISTS':
        this.searchService.nextArtists();
        break;

      case 'TRACKS':
        this.searchService.nextTracks();
        break;

      case 'ALBUMS':
        this.searchService.nextAlbums();
        break;

      default:
        break;
    }
  }
}

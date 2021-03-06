import { Component, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Artist } from '../../../data-models/artist';
import { PlayerService } from '../../core/player.service';
import { SearchHistoryService } from '../../core/search-history.service';

@Component({
  selector: 'spot-simple-artist',
  templateUrl: './simple-artist.component.html',
  styleUrls: ['./simple-artist.component.scss'],
})
export class SimpleArtistComponent {
  @Input() artist: Artist;
  @Input() matchArtist: boolean;
  @HostBinding('class.playing') @Input() isPlaying: boolean;
  @HostBinding('class.empty-artist') @Input() isEmpty: boolean;
  placeholder = require('../../../../assets/placeholder-artist.jpg');

  constructor(
    private playerService: PlayerService,
    private router: Router,
    private searchHistoryService: SearchHistoryService,
  ) {
  }

  play(): void {
    let player: Promise<boolean>;
    if (this.matchArtist) {
      this.playerService.play();
      player = Promise.resolve(true);
    } else {
      player = this.playerService.playArtistWithID(this.artist.id);
    }

    player.then((success) => {
      if (!success) {
        this.isEmpty = true;
        this.view();
      }

      return success;
    });
  }

  pause(): void {
    this.playerService.pause();
  }

  view(): void {
    if (this.router.routerState.snapshot.url === '/') {
      this.searchHistoryService.nextResult(this.artist);
    }

    this.router.navigate(['/artist', this.artist.id]);
  }
}

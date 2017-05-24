import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Playing } from '../../data-models/playing';
import { SearchHistory } from '../../data-models/search-history';
import { PlayerHistoryService } from '../core/player-history.service';
import { PlayerService } from '../core/player.service';

@Component({
  selector: 'spot-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  histories: Observable<SearchHistory[]>;
  playerStatus: Observable<Playing>;

  constructor(
    private playerHistoryService: PlayerHistoryService,
    private playerService: PlayerService,
  ) {
  }

  ngOnInit() {
    this.playerStatus = this.playerService.getCurrentStatus();
    this.histories = this.playerHistoryService
      .getHistories()
      .map((histories) => histories && histories.length ?
        histories :
        null);
  }

  isPlaying(record: SearchHistory, status: Playing): boolean {
    return record.type === status.context.type &&
      record.id === status.context.id &&
      !status.paused;
  }

  clear(): void {
    this.playerHistoryService.reset();
  }
}

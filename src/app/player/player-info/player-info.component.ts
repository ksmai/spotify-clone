import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Playing } from '../../../data-models/playing';
import { PlayerService } from '../../core/player.service';

@Component({
  selector: 'spot-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss'],
})
export class PlayerInfoComponent implements OnInit {
  currentStatus: Observable<Playing>;

  constructor(private playerService: PlayerService) {
  }

  ngOnInit() {
    this.currentStatus = this.playerService
      .getCurrentStatus()
      .map((status: Playing) => status.track ? status : null);
  }
}

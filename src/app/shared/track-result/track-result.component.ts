import { Component, Input } from '@angular/core';

import { Track } from '../../../data-models/track';
import { PlayerService } from '../../core/player.service';

@Component({
  selector: 'spot-track-result',
  templateUrl: './track-result.component.html',
  styleUrls: ['./track-result.component.scss'],
})
export class TrackResultComponent {
  @Input() tracks: Track[];
  @Input() isPlaylist: boolean;

  constructor(private playerService: PlayerService) {
  }

  play(idx: number) {
    if (this.isPlaylist) {
      this.playerService.playArtist(this.tracks, idx);
    } else {
    }
  }
}

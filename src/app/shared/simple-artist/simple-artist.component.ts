import { Component, Input } from '@angular/core';

import { Artist } from '../../../data-models/artist';
import { PlayerService } from '../../core/player.service';

@Component({
  selector: 'spot-simple-artist',
  templateUrl: './simple-artist.component.html',
  styleUrls: ['./simple-artist.component.scss'],
})
export class SimpleArtistComponent {
  @Input() artist: Artist;
  placeholder = require('../../../../assets/placeholder-artist.jpg');

  constructor(private playerService: PlayerService) {
  }

  play(): void {
    this.playerService.playArtistWithID(this.artist.id);
  }
}

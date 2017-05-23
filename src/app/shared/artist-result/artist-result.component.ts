import { Component, Input } from '@angular/core';

import { Artist } from '../../../data-models/artist';

@Component({
  selector: 'spot-artist-result',
  templateUrl: './artist-result.component.html',
  styleUrls: ['./artist-result.component.scss'],
})
export class ArtistResultComponent {
  @Input() artists: Artist[];
  @Input() playingID: string;
  @Input() paused: boolean;

  matchArtist(currentArtist: Artist): boolean {
    return this.playingID === currentArtist.id;
  }

  isPlaying(currentArtist: Artist): boolean {
    return !this.paused && this.matchArtist(currentArtist);
  }
}

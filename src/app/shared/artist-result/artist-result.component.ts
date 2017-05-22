import { Component, Input } from '@angular/core';

import { Artist } from '../../../data-models/artist';

@Component({
  selector: 'spot-artist-result',
  templateUrl: './artist-result.component.html',
  styleUrls: ['./artist-result.component.scss'],
})
export class ArtistResultComponent {
  @Input() artists: Artist[];
  @Input() playingArtists: Artist[];
  @Input() paused: boolean;

  matchArtist(currentArtist: Artist): boolean {
    return !!this.playingArtists &&
      this.playingArtists.some((artist) => artist.id === currentArtist.id);
  }

  isPlaying(currentArtist: Artist): boolean {
    return !this.paused && this.matchArtist(currentArtist);
  }
}

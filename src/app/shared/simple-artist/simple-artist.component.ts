import { Component, Input } from '@angular/core';

import { Artist } from '../../../data-models/artist';

@Component({
  selector: 'spot-simple-artist',
  templateUrl: './simple-artist.component.html',
  styleUrls: ['./simple-artist.component.scss'],
})
export class SimpleArtistComponent {
  @Input() artist: Artist;
  placeholder = require('../../../../assets/placeholder-artist.jpg');

  play(): void {
    console.log('playing');
  }
}

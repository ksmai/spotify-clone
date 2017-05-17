import { Component, Input } from '@angular/core';

import { Artist } from '../../../../data-models/artist';

@Component({
  selector: 'spot-artist-result',
  templateUrl: './artist-result.component.html',
  styleUrls: ['./artist-result.component.scss'],
})
export class ArtistResultComponent {
  @Input() artists: Artist[];
}

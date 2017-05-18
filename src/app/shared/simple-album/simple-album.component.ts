import { Component, Input } from '@angular/core';

import { SimplifiedAlbum } from '../../../data-models/simplified-album';

@Component({
  selector: 'spot-simple-album',
  templateUrl: './simple-album.component.html',
  styleUrls: ['./simple-album.component.scss'],
})
export class SimpleAlbumComponent {
  @Input() album: SimplifiedAlbum;
}

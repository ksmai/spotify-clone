import { Component, Input } from '@angular/core';

import { SimplifiedAlbum } from '../../../data-models/simplified-album';

@Component({
  selector: 'spot-album-result',
  templateUrl: './album-result.component.html',
  styleUrls: ['./album-result.component.scss'],
})
export class AlbumResultComponent {
  @Input() albums: SimplifiedAlbum[];
  @Input() playingID: string;
  @Input() paused: boolean;

  matchAlbum(album: SimplifiedAlbum): boolean {
    return album.id === this.playingID;
  }

  isPlaying(album: SimplifiedAlbum): boolean {
    return !this.paused && this.matchAlbum(album);
  }
}

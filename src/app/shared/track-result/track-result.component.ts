import { Component, Input } from '@angular/core';

import { Album } from '../../../data-models/album';
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
  @Input() album: Album;

  constructor(private playerService: PlayerService) {
  }

  play(track: Track) {
    if (this.isPlaylist) {
      this.playerService.playTrackList(this.tracks, track.id);
    } else if (this.album) {
      this.playerService.playAlbum(this.album, track.id);
    } else {
      this.playerService.playAlbumWithID(track.album.id, track.id);
    }
  }
}

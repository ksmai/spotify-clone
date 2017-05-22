import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';
import { Observable } from 'rxjs/Observable';

import { Album } from '../../data-models/album';
import { Playing } from '../../data-models/playing';
import { PlayerService } from '../core/player.service';

@Component({
  templateUrl: './album.component.html',
  styleUrls: ['../shared/play-button.scss', './album.component.scss'],
})
export class AlbumComponent implements OnInit {
  @HostBinding('style.background-image') background: string;

  album: Observable<Album>;
  playable: Observable<boolean>;
  currentStatus: Observable<Playing>;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
  ) {
  }

  ngOnInit() {
    this.album = this.route.data.pluck('album');
    this.playable = this.album
      .map((album: Album) => {
        return album.tracks.items.some((track) => {
          return !!track.preview_url;
        });
      });
    this.currentStatus = this.playerService.getCurrentStatus();
  }

  play(album: Album, currentStatus: Playing): void {
    if (this.matchAlbum(album, currentStatus)) {
      this.playerService.play();
    } else {
      this.playerService.playAlbum(album);
    }
  }

  pause(): void {
    this.playerService.pause();
  }

  isPlaying(album: Album, currentStatus: Playing): boolean {
    return !currentStatus.paused && this.matchAlbum(album, currentStatus);
  }

  matchAlbum(album: Album, currentStatus: Playing): boolean {
    return currentStatus.type === 'album' &&
      !!currentStatus.track &&
      currentStatus.track.album.id === album.id;
  }

  updateBackground(color: string): void {
    this.background = `linear-gradient(${color}, #212121)`;
  }
}

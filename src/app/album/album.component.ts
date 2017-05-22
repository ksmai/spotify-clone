import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';
import { Observable } from 'rxjs/Observable';

import { Album } from '../../data-models/album';
import { PlayerService } from '../core/player.service';

@Component({
  templateUrl: './album.component.html',
  styleUrls: ['../shared/play-button.scss', './album.component.scss'],
})
export class AlbumComponent implements OnInit {
  @HostBinding('style.background-image') background: string;

  album: Observable<Album>;
  playable: Observable<boolean>;

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
  }

  play(album: Album): void {
    this.playerService.playAlbum(album);
  }

  updateBackground(color: string): void {
    this.background = `linear-gradient(${color}, #212121)`;
  }
}

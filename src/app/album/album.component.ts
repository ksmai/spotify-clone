import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/pluck';
import { Observable } from 'rxjs/Observable';

import { Album } from '../../data-models/album';

@Component({
  templateUrl: './album.component.html',
  styleUrls: ['../shared/play-button.scss', './album.component.scss'],
})
export class AlbumComponent implements OnInit {
  @HostBinding('style.background-image') background: string;

  album: Observable<Album>;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.album = this.route.data.pluck('album');
  }

  play(): void {
    console.log('playing');
  }

  updateBackground(color: string): void {
    this.background = `linear-gradient(${color}, #212121)`;
  }
}

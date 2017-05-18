import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/pluck';
import { Observable } from 'rxjs/Observable';

import { Album } from '../../data-models/album';

@Component({
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {
  album: Observable<Album>;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.album = this.route.data.pluck('album');
  }
}

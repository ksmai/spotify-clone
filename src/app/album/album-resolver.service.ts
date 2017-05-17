import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';

import { Album } from '../../data-models/album';
import { AlbumService } from '../core/album.service';

@Injectable()
export class AlbumResolver implements Resolve<Album> {
  constructor(
    private albumService: AlbumService,
    private router: Router,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Album> {
    return this.albumService
      .getById(route.params.id)
      .do((album: Album) => {
        if (!album) {
          this.router.navigate(['/']);
        }
      });
  }
}

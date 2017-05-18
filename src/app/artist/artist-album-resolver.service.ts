import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { SimplifiedAlbum } from '../../data-models/simplified-album';
import { ArtistService } from '../core/artist.service';

@Injectable()
export class ArtistAlbumResolver implements Resolve<SimplifiedAlbum[]> {
  constructor(private artistService: ArtistService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.artistService.getAlbums(route.params.id);
  }
}

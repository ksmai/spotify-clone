import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Artist } from '../../data-models/artist';
import { ArtistService } from '../core/artist.service';

@Injectable()
export class RelatedArtistsResolver implements Resolve<Artist[]> {
  constructor(private artistService: ArtistService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.artistService.getRelatedArtists(route.params.id);
  }
}

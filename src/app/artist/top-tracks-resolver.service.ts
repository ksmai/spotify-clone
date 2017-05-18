import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Track } from '../../data-models/track';
import { ArtistService } from '../core/artist.service';

@Injectable()
export class TopTracksResolver implements Resolve<Track[]> {
  constructor(private artistService: ArtistService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.artistService.getTopTracks(route.params.id);
  }
}

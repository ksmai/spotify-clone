import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';

import { Artist } from '../../data-models/artist';
import { ArtistService } from '../core/artist.service';

@Injectable()
export class ArtistResolver implements Resolve<Artist> {
  constructor(
    private artistService: ArtistService,
    private router: Router,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Artist> {
    return this.artistService
      .getArtist(route.params.id)
      .do((artist: Artist) => {
        if (!artist) {
          this.router.navigate(['/']);
        }
      });
  }
}

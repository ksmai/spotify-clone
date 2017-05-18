import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArtistAlbumResolver } from './artist-album-resolver.service';
import { ArtistResolver } from './artist-resolver.service';
import { ArtistComponent } from './artist.component';
import { RelatedArtistsResolver } from './related-artists-resolver.service';
import { TopTracksResolver } from './top-tracks-resolver.service';

const routes: Routes = [
  {
    path: 'artist/:id',
    component: ArtistComponent,
    resolve: {
      artists: RelatedArtistsResolver,
      albums: ArtistAlbumResolver,
      tracks: TopTracksResolver,
      artist: ArtistResolver,
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],

  exports: [
    RouterModule,
  ],

  providers: [
    ArtistAlbumResolver,
    RelatedArtistsResolver,
    TopTracksResolver,
    ArtistResolver,
  ],
})
export class ArtistRoutingModule {
}

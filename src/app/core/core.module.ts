import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AlbumService } from './album.service';
import { ArtistService } from './artist.service';
import { PlayerService } from './player.service';
import { SearchService } from './search.service';

@NgModule({
  imports: [
    HttpModule,
  ],

  providers: [
    SearchService,
    AlbumService,
    ArtistService,
    PlayerService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() coreModule: CoreModule) {
    if (coreModule) {
      throw new Error('CoreModule should only be imported once');
    }
  }
}

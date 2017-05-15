import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ArtistRoutingModule } from './artist-routing.module';
import { ArtistComponent } from './artist.component';

@NgModule({
  imports: [
    ArtistRoutingModule,
    SharedModule,
  ],

  declarations: [
    ArtistComponent,
  ],
})
export class ArtistModule {
}

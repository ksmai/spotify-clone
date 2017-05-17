import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import {
  AlbumResultComponent,
} from './result/album-result/album-result.component';
import {
  ArtistResultComponent,
} from './result/artist-result/artist-result.component';
import { ResultListComponent } from './result/result-list.component';
import {
  TopResultComponent,
} from './result/top-result/top-result.component';
import {
  TrackResultComponent,
} from './result/track-result/track-result.component';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';

@NgModule({
  imports: [
    SearchRoutingModule,
    SharedModule,
  ],

  declarations: [
    SearchComponent,
    ResultListComponent,
    AlbumResultComponent,
    ArtistResultComponent,
    TrackResultComponent,
    TopResultComponent,
  ],

  exports: [
    ResultListComponent,
    AlbumResultComponent,
    ArtistResultComponent,
    TrackResultComponent,
    TopResultComponent,
  ],
})
export class SearchModule {
}

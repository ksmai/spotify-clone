import { NgModule } from '@angular/core';

import { SearchModule } from '../search/search.module';
import { SharedModule } from '../shared/shared.module';
import { AlbumRoutingModule } from './album-routing.module';
import { AlbumComponent } from './album.component';

@NgModule({
  imports: [
    AlbumRoutingModule,
    SharedModule,
    SearchModule,
  ],

  declarations: [
    AlbumComponent,
  ],
})
export class AlbumModule {
}

import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AlbumRoutingModule } from './album-routing.module';
import { AlbumComponent } from './album.component';

@NgModule({
  imports: [
    AlbumRoutingModule,
    SharedModule,
  ],

  declarations: [
    AlbumComponent,
  ],
})
export class AlbumModule {
}

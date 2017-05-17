import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlbumResolver } from './album-resolver.service';
import { AlbumComponent } from './album.component';

const routes: Routes = [
  {
    path: 'album/:id',
    component: AlbumComponent,
    resolve: {
      album: AlbumResolver,
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
    AlbumResolver,
  ],
})
export class AlbumRoutingModule {
}

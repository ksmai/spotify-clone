import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { TrackComponent } from './track.component';

@NgModule({
  imports: [
    SharedModule,
  ],

  declarations: [
    TrackComponent,
  ],

  exports: [
    TrackComponent,
  ],
})
export class TrackModule {
}

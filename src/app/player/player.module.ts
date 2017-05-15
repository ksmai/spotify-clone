import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PlayerComponent } from './player.component';

@NgModule({
  imports: [
    SharedModule,
  ],

  declarations: [
    PlayerComponent,
  ],

  exports: [
    PlayerComponent,
  ],
})
export class PlayerModule {
}

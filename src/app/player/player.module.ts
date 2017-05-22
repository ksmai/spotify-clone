import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import {
  PlayerControlComponent,
} from './player-control/player-control.component';
import { PlayerInfoComponent } from './player-info/player-info.component';
import { PlayerTimeComponent } from './player-time/player-time.component';
import {
  PlayerVolumeComponent,
} from './player-volume/player-volume.component';
import { PlayerComponent } from './player.component';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
  ],

  declarations: [
    PlayerComponent,
    PlayerInfoComponent,
    PlayerTimeComponent,
    PlayerVolumeComponent,
    PlayerControlComponent,
  ],

  exports: [
    PlayerComponent,
    PlayerInfoComponent,
    PlayerTimeComponent,
    PlayerVolumeComponent,
    PlayerControlComponent,
  ],
})
export class PlayerModule {
}

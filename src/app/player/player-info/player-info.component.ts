import { Component, Input } from '@angular/core';

import { Track } from '../../../data-models/track';

@Component({
  selector: 'spot-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss'],
})
export class PlayerInfoComponent {
  @Input() track: Track;
}

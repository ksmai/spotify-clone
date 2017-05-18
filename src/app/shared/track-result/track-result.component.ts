import { Component, Input } from '@angular/core';

import { Track } from '../../../data-models/track';

@Component({
  selector: 'spot-track-result',
  templateUrl: './track-result.component.html',
  styleUrls: ['./track-result.component.scss'],
})
export class TrackResultComponent {
  @Input() tracks: Track[];
}

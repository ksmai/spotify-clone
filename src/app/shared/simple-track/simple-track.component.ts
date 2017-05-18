import { Component, Input } from '@angular/core';

import { Track } from '../../../data-models/track';
import { TimeFormatter } from '../../core/time-formatter.service';

@Component({
  selector: 'spot-simple-track',
  templateUrl: './simple-track.component.html',
  styleUrls: ['./simple-track.component.scss'],
})
export class SimpleTrackComponent {
  @Input() idx: number;
  @Input() track: Track;

  constructor(private timeFormatter: TimeFormatter) {
  }

  format(ms: number): string {
    return this.timeFormatter.msToString(ms);
  }
}

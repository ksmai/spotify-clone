import { Component, Input } from '@angular/core';

import { Track } from '../../../data-models/track';

@Component({
  selector: 'spot-simple-track',
  templateUrl: './simple-track.component.html',
  styleUrls: ['./simple-track.component.scss'],
})
export class SimpleTrackComponent {
  @Input() idx: number;
  @Input() track: Track;

  play(): void {
    console.log('playing');
  }
}

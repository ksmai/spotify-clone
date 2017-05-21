import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'spot-player-time',
  templateUrl: './player-time.component.html',
  styleUrls: ['./player-time.component.scss'],
})
export class PlayerTimeComponent implements OnChanges {
  @Input() currentTimeMS: number;
  @Input() durationMS: number;
  @Output() seek = new EventEmitter<number>();
  value = 0;

  ngOnChanges() {
    this.value = this.durationMS > 0 ?
      this.currentTimeMS * 100 / this.durationMS :
      0;
  }

  onSlide(value: number) {
    const targetFraction = value / 100;
    this.seek.emit(targetFraction);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'spot-player-control',
  templateUrl: './player-control.component.html',
  styleUrls: ['./player-control.component.scss'],
})
export class PlayerControlComponent {
  @Input() paused: boolean;
  @Input() shuffled: boolean;
  @Input() repeated: boolean;
  @Output() shuffledChange = new EventEmitter<boolean>();
  @Output() repeatedChange = new EventEmitter<boolean>();
  @Output() play = new EventEmitter();
  @Output() pause = new EventEmitter();

  onPlay(): void {
    this.play.emit();
  }

  onPause(): void {
    this.pause.emit();
  }

  toggleShuffle(): void {
    this.shuffledChange.emit(!this.shuffled);
  }

  toggleRepeat(): void {
    this.repeatedChange.emit(!this.repeated);
  }
}

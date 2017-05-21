import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'spot-player-volume',
  templateUrl: './player-volume.component.html',
  styleUrls: ['./player-volume.component.scss'],
})
export class PlayerVolumeComponent {
  @Input() volume: number;
  @Output() volumeChange = new EventEmitter<number>();
  @Output() mute = new EventEmitter();

  toggleMute(): void {
    this.mute.emit();
  }

  onVolumeChange(volume: number): void {
    this.volumeChange.emit(volume);
  }
}

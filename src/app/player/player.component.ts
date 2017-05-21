import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'spot-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  @ViewChild('audio') audio: ElementRef;

  paused = true;
  loop = false;
  shuffle = false;
  currentTimeMS = 0;
  durationMS = 0;
  playbackFraction = 0;
  volume = 1;
  volumeBeforeMute = 1;
  src = 'https://p.scdn.co/mp3-preview/f0783f5eedabf52a2400602a3412c7ec3560ede0?cid=null';

  play(): void {
    this.audioEl.play();
  }

  pause(): void {
    this.audioEl.pause();
  }

  mute(): void {
    this.volumeBeforeMute = this.audioEl.volume;
    this.audioEl.volume = 0;
  }

  unmute(): void {
    this.audioEl.volume = this.volumeBeforeMute;
  }

  toggleRepeat(): void {
    this.loop = !this.loop;
  }

  toggleShuffle(): void {
    this.shuffle = !this.shuffle;
  }

  changeVolume(volume: number): void {
    this.audioEl.volume = volume;
  }

  onPlaying(): void {
    this.paused = false;
  }

  onPause(): void {
    this.paused = true;
  }

  onSeek(val: number): void {
    this.audioEl.currentTime = (val / 100) * this.audioEl.duration;
    this.audioEl.play();
  }

  onLoadedMetadata(): void {
    this.durationMS = this.audioEl.duration * 1000;
    this.onTimeUpdate();
    this.onVolumeChange();
  }

  onTimeUpdate(): void {
    this.currentTimeMS = this.audioEl.currentTime * 1000;
    this.playbackFraction = this.durationMS > 0 ?
      this.currentTimeMS / this.durationMS :
      0;
  }

  onVolumeChange(): void {
    this.volume = this.audioEl.volume;
  }

  private get audioEl(): HTMLAudioElement {
    return this.audio.nativeElement;
  }
}

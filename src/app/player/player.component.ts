import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'spot-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  @ViewChild('audio') audio: ElementRef;

  paused = true;
  repeated = false;
  shuffled = false;
  currentTimeMS = 0;
  durationMS = 0;
  volume = 1;
  volumeBeforeMute = 1;
  src = 'https://p.scdn.co/mp3-preview/f0783f5eedabf52a2400602a3412c7ec3560ede0?cid=null';

  play(): void {
    this.audioEl.play();
  }

  pause(): void {
    this.audioEl.pause();
  }

  seek(frac: number): void {
    this.audioEl.currentTime = frac * this.audioEl.duration;
    this.audioEl.play();
  }

  toggleMute(): void {
    if (this.volume > 0) {
      this.volumeBeforeMute = this.volume;
      this.volume = 0;
    } else {
      this.volume = this.volumeBeforeMute;
    }
  }

  onPlaying(): void {
    this.paused = false;
  }

  onPause(): void {
    this.paused = true;
  }

  onLoadedMetadata(): void {
    this.durationMS = this.audioEl.duration * 1000;
    this.onTimeUpdate();
  }

  onTimeUpdate(): void {
    this.currentTimeMS = this.audioEl.currentTime * 1000;
  }

  private get audioEl(): HTMLAudioElement {
    return this.audio.nativeElement;
  }
}

import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import 'rxjs/add/operator/pluck';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Track } from '../../data-models/track';
import { PlayerService } from '../core/player.service';

@Component({
  selector: 'spot-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, OnDestroy {
  @ViewChild('audio') audio: ElementRef;

  repeated = false;
  shuffled = false;
  currentTimeMS = 0;
  durationMS = 0;
  volume = 1;
  src: string;
  currentTrack: Track;

  private tracks: Track[];
  private currentIndex: number;
  private shuffleMap: Array<{ prev: number, next: number }>;
  private volumeBeforeMute = 1;
  private subscription: Subscription;

  constructor(private playerService: PlayerService) {
  }

  ngOnInit() {
    this.subscription = this.playerService
      .getPlaylist()
      .subscribe((tracks: Track[]) => {
        if (!tracks || !tracks.length) {
          return;
        }

        this.tracks = tracks;
        this.shuffleMap = null;
        this.updateIndex(0);
      });

    this.subscription.add(
      this.playerService
        .getRequest()
        .subscribe((play: boolean) => {
          if (play) {
            this.play();
          } else {
            this.pause();
          }
        }),
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  prev(): void {
    if (!this.tracks || !this.tracks.length) {
      return;
    }

    // lazily generate the shuffle map
    if (this.shuffled && !this.shuffleMap) {
      this.generateShuffleMap();
    }

    const idx = this.shuffled ?
      this.shuffleMap[this.currentIndex].prev :
      (this.currentIndex - 1 + this.tracks.length) % this.tracks.length;
    this.updateIndex(idx);
  }

  next(): void {
    if (!this.tracks || !this.tracks.length) {
      return;
    }

    // lazily generate the shuffle map
    if (this.shuffled && !this.shuffleMap) {
      this.generateShuffleMap();
    }

    const idx = this.shuffled ?
      this.shuffleMap[this.currentIndex].next :
      (this.currentIndex + 1) % this.tracks.length;
    this.updateIndex(idx);
  }

  seek(frac: number): void {
    this.audioEl.currentTime = frac * this.audioEl.duration;
    this.play();
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
    this.playerService.updateStatus({ paused: false });
  }

  onPause(): void {
    this.playerService.updateStatus({ paused: true });
  }

  onLoadedMetadata(): void {
    this.durationMS = this.audioEl.duration * 1000;
    this.onTimeUpdate();
  }

  onTimeUpdate(): void {
    this.currentTimeMS = this.audioEl.currentTime * 1000;
  }

  private generateShuffleMap(): void {
    if (!this.tracks || this.shuffleMap) {
      return;
    }

    const indexes = Array(this.tracks.length)
      .fill(undefined)
      .map((e: any, i: number) => i);

    // a double linked list from the shuffled indexes
    const nodes = this.shuffleArrayInPlace(indexes)
      .map((el, idx, arr) => {
        const prevIdx = (idx - 1 + arr.length) % arr.length;
        const nextIdx = (idx + 1) % arr.length;

        return {
          cur: el,
          prev: arr[prevIdx],
          next: arr[nextIdx],
        };
      });

    // sort the nodes in ascending order to create the map
    this.shuffleMap = nodes.sort((a, b) => a.cur < b.cur ? -1 : 1);
  }

  private shuffleArrayInPlace<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(1 + Math.random() * i);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  }

  private play(): void {
    if (this.src) {
      this.audioEl.play();
    }
  }

  private pause(): void {
    this.audioEl.pause();
  }

  private updateIndex(idx: number): void {
    this.currentIndex = idx;
    this.currentTrack = this.tracks[this.currentIndex];
    this.src = this.currentTrack.preview_url;
    this.playerService.updateStatus({ track: this.currentTrack });
  }

  private get audioEl(): HTMLAudioElement {
    return this.audio.nativeElement;
  }
}

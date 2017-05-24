import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import Vibrant = require('node-vibrant');

import { Album } from '../../../data-models/album';
import { SimplifiedAlbum } from '../../../data-models/simplified-album';
import { PlayerService } from '../../core/player.service';
import { SearchHistoryService } from '../../core/search-history.service';

@Component({
  selector: 'spot-simple-album',
  templateUrl: './simple-album.component.html',
  styleUrls: ['./simple-album.component.scss'],
})
export class SimpleAlbumComponent {
  placeholder = require('../../../../assets/placeholder-album.png');
  @Input() album: SimplifiedAlbum;
  @Input() isPlayable: boolean;
  @Input() emitColor = false;
  @Input() matchAlbum: boolean;
  @HostBinding('class.empty-album') @Input() isEmpty: boolean;
  @HostBinding('class.playing') @Input() isPlaying: boolean;
  @Output() dominantColor = new EventEmitter<string>();
  @ViewChild('image') private imageEl: any;

  constructor(
    private playerService: PlayerService,
    private router: Router,
    private searchHistoryService: SearchHistoryService,
  ) {
  }

  play(): void {
    let player: Promise<boolean>;
    if (this.matchAlbum) {
      this.playerService.play();
      player = Promise.resolve(true);
    } else if (this.isPlayable) {
      player = this.playerService.playAlbum(this.album as Album);
    } else {
      player = this.playerService.playAlbumWithID(this.album.id);
    }

    player.then((success) => {
      if (!success) {
        this.isEmpty = true;
        this.view();
      }

      return success;
    });
  }

  pause(): void {
    this.playerService.pause();
  }

  view(): void {
    if (this.router.routerState.snapshot.url === '/') {
      this.searchHistoryService.nextResult(this.album);
    }

    this.router.navigate(['/album', this.album.id]);
  }

  onLoad() {
    if (!this.emitColor) {
      return;
    }

    const vibrant = new Vibrant(this.imageEl.nativeElement);
    vibrant
      .getPalette()
      .then((swatches) => {
        const sortedSwatches = Object
          .keys(swatches)
          .map((key: string) => swatches[key])
          .filter((swatch) => !!swatch)
          .sort((a, b) => a.getPopulation() > b.getPopulation() ? -1 : 1)
          .filter((swatch) => this.contrast(swatch.getRgb()) >= 4.5);

        if (sortedSwatches.length > 0) {
          const dominantColor = sortedSwatches[0].getHex();
          this.dominantColor.emit(dominantColor);

          return dominantColor;
        }
      })
      .catch((err: any) => {
        // do something useful with the error
        return null;
      });
  }

  // http://stackoverflow.com/questions/9733288/how-to-programmatically-calculate-the-contrast-ratio-between-two-colors
  private luminance(r: number, g: number, b: number) {
    const a = [r, g, b].map((v) => {
      v /= 255;

      return v <= 0.03928 ?
        v / 12.92 :
        Math.pow((v + 0.055) / 1.055, 2.4);
    });

    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }
  private contrast([r, g, b]: [number, number, number]) {
    return (this.luminance(255, 255, 255) + 0.05) /
      (this.luminance(r, g, b) + 0.05);
  }
}

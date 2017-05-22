import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import 'rxjs/add/operator/pluck';
import { Observable } from 'rxjs/Observable';

import { PlayerService } from '../../core/player.service';

@Component({
  selector: 'spot-player-control',
  templateUrl: './player-control.component.html',
  styleUrls: ['./player-control.component.scss'],
})
export class PlayerControlComponent implements OnInit {
  @Input() shuffled: boolean;
  @Input() repeated: boolean;
  @Output() shuffledChange = new EventEmitter<boolean>();
  @Output() repeatedChange = new EventEmitter<boolean>();
  @Output() prev = new EventEmitter();
  @Output() next = new EventEmitter();
  paused: Observable<boolean>;

  constructor(private playerService: PlayerService) {
  }

  ngOnInit() {
    this.paused = this.playerService
      .getCurrentStatus()
      .pluck('paused');
  }

  onPlay(): void {
    this.playerService.play();
  }

  onPause(): void {
    this.playerService.pause();
  }

  onPrev(): void {
    this.prev.emit();
  }

  onNext(): void {
    this.next.emit();
  }

  toggleShuffle(): void {
    this.shuffledChange.emit(!this.shuffled);
  }

  toggleRepeat(): void {
    this.repeatedChange.emit(!this.repeated);
  }
}

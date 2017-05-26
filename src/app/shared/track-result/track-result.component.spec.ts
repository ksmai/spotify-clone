/* tslint:disable max-classes-per-file */
import { Component, DebugElement, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Album } from '../../../data-models/album';
import {
  FakePlayerService,
  testAlbum,
  testArtist,
  testTrack,
} from '../../../test-utils/';
import { PlayerService } from '../../core/player.service';
import { MaterialModule } from '../material.module';
import { TrackResultComponent } from './track-result.component';

const tracks = [
  testTrack(),
  testTrack(),
  testTrack(),
];

const album = testAlbum();
const artist = testArtist();

@Component({
  template: `
    <spot-track-result
      [tracks]="tracks"
      [playingID]="playingID"
      [paused]="paused"
      [artistID]="artistID"
      [album]="album"
    ></spot-track-result>
  `,
})
class DummyComponent {
  paused = false;
  playingID: string = null;
  tracks = tracks;
  artistID: string = null;
  album: Album = null;
}

@Component({
  selector: 'spot-simple-track',
  template: '',
})
class FakeSimpleTrackComponent {
  @Input() track: any;
  @Input() isPlaying: any;
  @Input() paused: any;
  @Input() idx: any;
}

class Page {
  tracks: DebugElement[];

  playSpy: jasmine.Spy;
  playTrackListSpy: jasmine.Spy;
  playAlbumSpy: jasmine.Spy;
  playAlbumIDSpy: jasmine.Spy;
  pauseSpy: jasmine.Spy;

  constructor() {
    const fakePlayerService: FakePlayerService = TestBed
      .get(PlayerService) as any as FakePlayerService;
    this.playSpy = spyOn(fakePlayerService, 'play');
    this.playTrackListSpy = spyOn(fakePlayerService, 'playTrackList');
    this.playAlbumSpy = spyOn(fakePlayerService, 'playAlbum');
    this.playAlbumIDSpy = spyOn(fakePlayerService, 'playAlbumWithID');
    this.pauseSpy = spyOn(fakePlayerService, 'pause');
  }

  createElements() {
    this.tracks = fixture.debugElement
      .queryAll(By.directive(FakeSimpleTrackComponent));
  }

  callMethod(methodName: string, ...args: any[]) {
    const hostDE = fixture.debugElement
      .query(By.directive(TrackResultComponent));
    const instance = hostDE.injector.get(TrackResultComponent);

    return instance[methodName](...args);
  }
}

let fixture: ComponentFixture<DummyComponent>;
let component: DummyComponent;
let page: Page;

function createComponent() {
  fixture = TestBed.createComponent(DummyComponent);
  component = fixture.componentInstance;
  page = new Page();
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.createElements();
  });
}

describe('TrackResultComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          MaterialModule,
        ],
        declarations: [
          DummyComponent,
          TrackResultComponent,
          FakeSimpleTrackComponent,
        ],
        providers: [
          { provide: PlayerService, useClass: FakePlayerService },
        ],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should create a SimpleTrackComponent for each track', () => {
    expect(page.tracks.length).toEqual(tracks.length);
  });

  it('should pause', () => {
    page.callMethod('pause');
    expect(page.pauseSpy).toHaveBeenCalled();
  });

  it('should play directly if track id matches', () => {
    component.playingID = tracks[0].id;
    fixture.detectChanges();
    page.callMethod('play', tracks[0]);
    expect(page.playSpy).toHaveBeenCalled();
  });

  it('should play all its tracks if artistID exists', () => {
    component.artistID = artist.id;
    fixture.detectChanges();
    page.callMethod('play', tracks[0]);
    expect(page.playTrackListSpy).toHaveBeenCalled();
  });

  it('should play its album if it exists', () => {
    component.album = album;
    fixture.detectChanges();
    page.callMethod('play', tracks[0]);
    expect(page.playAlbumSpy).toHaveBeenCalled();
  });

  it('should query for album ID if nothing else exists', () => {
    page.callMethod('play', tracks[0]);
    expect(page.playAlbumIDSpy).toHaveBeenCalled();
  });
});

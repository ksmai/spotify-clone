import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import {
  FakeActivatedRoute,
  FakeRouterLink,
  testArtist,
  testTrack,
} from '../../test-utils/';
import { CoreModule } from '../core/core.module';
import { PlayerService } from '../core/player.service';
import { MaterialModule } from '../shared/material.module';
import { SplitNumberPipe } from '../shared/pipes/split-number.pipe';
import { ArtistComponent } from './artist.component';

let fixture: ComponentFixture<ArtistComponent>;
let component: ArtistComponent;

function createComponent() {
  fixture = TestBed.createComponent(ArtistComponent);
  component = fixture.componentInstance;

  return fixture.whenStable();
}

describe('ArtistComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          MaterialModule,
          CoreModule,
        ],
        declarations: [
          FakeRouterLink,
          ArtistComponent,
          SplitNumberPipe,
        ],
        providers: [
          { provide: ActivatedRoute, useClass: FakeActivatedRoute },
        ],
        schemas: [
          NO_ERRORS_SCHEMA,
        ],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should get player status on init', () => {
    const spy = spyOn(TestBed.get(PlayerService), 'getCurrentStatus');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should just play if album match', () => {
    spyOn(component, 'matchArtist').and.returnValue(true);
    const spy = spyOn(TestBed.get(PlayerService), 'play');
    component.play(null, null, null);
    expect(spy).toHaveBeenCalled();
  });

  it('should send the tracks to play if not match', () => {
    spyOn(component, 'matchArtist').and.returnValue(false);
    const spy = spyOn(TestBed.get(PlayerService), 'playTrackList');
    const tracks = [testTrack()];
    const artist = testArtist();
    const context = { type: 'artist', id: artist.id };
    component.play(tracks, artist, null);
    expect(spy).toHaveBeenCalledWith(tracks, context);
  });

  it('should pause', () => {
    const spy = spyOn(TestBed.get(PlayerService), 'pause');
    component.pause();
    expect(spy).toHaveBeenCalled();
  });

  it('should match currently playing artist', () => {
    const artist = testArtist();
    const track = testTrack();
    const status = {
      track: testTrack(),
      paused: false,
      context: { type: 'artist', id: artist.id },
    };
    expect(component.matchArtist(artist, status)).toBe(true);

    status.context.id += '123';
    expect(component.matchArtist(artist, status)).toBe(false);
  });

  it('should detect if its artist is being played', () => {
    const artist = testArtist();
    const track = testTrack();
    const status = {
      track: testTrack(),
      paused: false,
      context: { type: 'artist', id: artist.id },
    };
    expect(component.isPlaying(artist, status)).toBe(true);

    status.paused = true;
    expect(component.isPlaying(artist, status)).toBe(false);
  });
});

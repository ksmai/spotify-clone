/* tslint:disable max-classes-per-file */
import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FakeRouterLink, testTrack } from '../../../test-utils/';
import { MaterialModule } from '../../shared/material.module';
import { MSToStringPipe } from '../../shared/pipes/ms-to-string.pipe';
import { SimpleTrackComponent } from './simple-track.component';

const track = testTrack();

@Component({
  template: `<spot-simple-track
    [idx]="idx"
    [track]="track"
    [paused]="paused"
    [isPlaying]="isPlaying"
    (play)="play()"
    (pause)="pause()"
  ></spot-simple-track>`,
})
class DummyComponent {
  idx = 0;
  track = track;
  paused = true;
  isPlaying = false;
  play = jasmine.createSpy('play');
  pause = jasmine.createSpy('pause');
}

class Page {
  playSpy: jasmine.Spy;
  pauseSpy: jasmine.Spy;
  button: DebugElement;
  trackName: DebugElement;
  albumName: DebugElement;
  artistNames: DebugElement[];
  trackDuration: DebugElement;
  hostElement: DebugElement;

  constructor() {
    this.playSpy = component.play;
    this.pauseSpy = component.pause;
  }

  updateElements() {
    fixture.detectChanges();
    this.button = fixture.debugElement.query(By.css('.icon-button'));
    this.trackName = fixture.debugElement.query(By.css('.name'));
    this.albumName = fixture.debugElement.query(By.css('.album'));
    this.artistNames = fixture.debugElement.queryAll(By.css('.artist'));
    this.trackDuration = fixture.debugElement.query(By.css('.time'));
    this.hostElement = fixture.debugElement
      .query(By.directive(SimpleTrackComponent));
  }

  clickButton() {
    this.button.nativeElement.click();
  }

  assertPlayButton() {
    expect(this.button).toBeDefined();
    expect(this.button.nativeElement.textContent).toMatch(/play_arrow/);
  }

  assertPauseButton() {
    expect(this.button).toBeDefined();
    expect(this.button.nativeElement.textContent).toMatch(/pause/);
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
    page.updateElements();
  });
}

describe('SimpleTrackComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          MaterialModule,
        ],
        declarations: [
          MSToStringPipe,
          SimpleTrackComponent,
          DummyComponent,
          FakeRouterLink,
        ],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should show a play button if not playing', () => {
    component.isPlaying = false;
    component.paused = false;
    page.updateElements();
    page.assertPlayButton();
    page.clickButton();
    expect(component.play).toHaveBeenCalled();
  });

  it('should show a play button if playing but paused', () => {
    component.isPlaying = true;
    component.paused = true;
    page.updateElements();
    page.assertPlayButton();
    page.clickButton();
    expect(component.play).toHaveBeenCalled();
  });

  it('should show a pause button if playing', () => {
    component.isPlaying = true;
    component.paused = false;
    page.updateElements();
    page.assertPauseButton();
    page.clickButton();
    expect(component.pause).toHaveBeenCalled();
  });

  it('should add a class when playing', () => {
    component.isPlaying = true;
    fixture.detectChanges();
    expect(page.hostElement.nativeElement.classList.contains('playing'))
      .toBe(true);
  });

  it('should show track name', () => {
    track.name = 'awesome track name 123';
    fixture.detectChanges();
    expect(page.trackName.nativeElement.textContent).toEqual(track.name);
  });

  it('should show album name', () => {
    track.album.name = 'some cool ALBUM name abc';
    fixture.detectChanges();
    expect(page.albumName.nativeElement.textContent)
      .toEqual(track.album.name);
  });

  it('should show all artist names', () => {
    page.artistNames.forEach((artistName: DebugElement, idx: number) => {
      expect(artistName.nativeElement.textContent)
        .toEqual(track.artists[idx].name);
    });
  });

  it('should show track duration', () => {
    expect(page.trackDuration.nativeElement.textContent).toBeTruthy();
  });
});

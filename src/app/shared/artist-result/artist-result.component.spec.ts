/* tslint:disable max-classes-per-file */
import { Component, DebugElement, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { testArtist } from '../../../test-utils/';
import { ArtistResultComponent } from './artist-result.component';

const artists = [
  testArtist(),
  testArtist(),
  testArtist(),
];

@Component({
  template: `
    <spot-artist-result
      [artists]="artists"
      [playingID]="playingID"
      [paused]="paused"
    ></spot-artist-result>
  `,
})
class DummyComponent {
  paused = false;
  playingID: string = null;
  artists = artists;
}

@Component({
  selector: 'spot-simple-artist',
  template: '',
})
class FakeSimpleArtistComponent {
  @Input() artist: any;
  @Input() matchArtist: any;
  @Input() isPlaying: any;
}

class Page {
  artists: DebugElement[];

  createElements() {
    this.artists = fixture.debugElement
      .queryAll(By.directive(FakeSimpleArtistComponent));
  }

  callMethod(methodName: string, ...args: any[]) {
    const hostDE = fixture.debugElement
      .query(By.directive(ArtistResultComponent));
    const instance = hostDE.injector.get(ArtistResultComponent);

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

describe('ArtistResultComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          DummyComponent,
          ArtistResultComponent,
          FakeSimpleArtistComponent,
        ],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should create a SimpleArtistComponent for each artist', () => {
    expect(page.artists.length).toEqual(artists.length);
  });

  it('should match artists using playingID', () => {
    component.playingID = null;
    fixture.detectChanges();
    expect(page.callMethod('matchArtist', artists[0])).toBe(false);

    component.playingID = artists[0].id;
    fixture.detectChanges();
    expect(page.callMethod('matchArtist', artists[0])).toBe(true);
  });

  it('should check whether album is being played', () => {
    component.playingID = artists[0].id;
    component.paused = false;
    fixture.detectChanges();
    expect(page.callMethod('isPlaying', artists[0])).toBe(true);
    expect(page.callMethod('isPlaying', artists[1])).toBe(false);
  });
});

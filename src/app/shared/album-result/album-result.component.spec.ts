/* tslint:disable max-classes-per-file */
import { Component, DebugElement, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { testAlbum } from '../../../test-utils/';
import { AlbumResultComponent } from './album-result.component';

const albums = [
  testAlbum(),
  testAlbum(),
  testAlbum(),
];

@Component({
  template: `
    <spot-album-result
      [albums]="albums"
      [playingID]="playingID"
      [paused]="paused"
    ></spot-album-result>
  `,
})
class DummyComponent {
  paused = false;
  playingID: string = null;
  albums = albums;
}

@Component({
  selector: 'spot-simple-album',
  template: '',
})
class FakeSimpleAlbumComponent {
  @Input() album: any;
  @Input() matchAlbum: any;
  @Input() isPlaying: any;
}

class Page {
  albums: DebugElement[];

  createElements() {
    this.albums = fixture.debugElement
      .queryAll(By.directive(FakeSimpleAlbumComponent));
  }

  callMethod(methodName: string, ...args: any[]) {
    const hostDE = fixture.debugElement
      .query(By.directive(AlbumResultComponent));
    const instance = hostDE.injector.get(AlbumResultComponent);

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

describe('AlbumResultComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          DummyComponent,
          AlbumResultComponent,
          FakeSimpleAlbumComponent,
        ],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should create a SimpleAlbumComponent for each album', () => {
    expect(page.albums.length).toEqual(albums.length);
  });

  it('should match albums using playingID', () => {
    component.playingID = null;
    fixture.detectChanges();
    expect(page.callMethod('matchAlbum', albums[0])).toBe(false);

    component.playingID = albums[0].id;
    fixture.detectChanges();
    expect(page.callMethod('matchAlbum', albums[0])).toBe(true);
  });

  it('should check whether album is being played', () => {
    component.playingID = albums[0].id;
    component.paused = false;
    fixture.detectChanges();
    expect(page.callMethod('isPlaying', albums[0])).toBe(true);
    expect(page.callMethod('isPlaying', albums[1])).toBe(false);
  });
});

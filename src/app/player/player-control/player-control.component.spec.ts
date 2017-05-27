/* tslint:disable max-classes-per-file */
import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { CoreModule } from '../../core/core.module';
import { PlayerService } from '../../core/player.service';
import { MaterialModule } from '../../shared/material.module';
import { PlayerControlComponent } from './player-control.component';

@Component({
  template: `
    <spot-player-control
      [(shuffled)]="shuffled"
      [(repeated)]="repeated"
      (prev)="prev()"
      (next)="next()"
    ></spot-player-control>

  `,
})
class DummyComponent {
  shuffled = false;
  repeated = false;
  prev = jasmine.createSpy('prev');
  next = jasmine.createSpy('next');
}

let fixture: ComponentFixture<DummyComponent>;
let component: DummyComponent;
let page: Page;

class Page {
  testComponent: PlayerControlComponent;
  shuffleButton: DebugElement;
  repeatButton: DebugElement;
  playButton: DebugElement;
  pauseButton: DebugElement;
  prevButton: DebugElement;
  nextButton: DebugElement;

  constructor() {
    this.testComponent = fixture.debugElement
      .query(By.directive(PlayerControlComponent))
      .injector
      .get(PlayerControlComponent);
  }

  createElements() {
    [
      this.shuffleButton,
      this.prevButton,
      ,
      this.nextButton,
      this.repeatButton,
    ] = fixture.debugElement.queryAll(By.css('.button'));
    this.playButton = fixture.debugElement.query(By.css('.play-button'));
    this.pauseButton = fixture.debugElement.query(By.css('.pause-button'));
  }
}

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

describe('PlayerControlComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          CoreModule,
          MaterialModule,
        ],
        declarations: [
          PlayerControlComponent,
          DummyComponent,
        ],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should get player status on init', () => {
    const spy = spyOn(TestBed.get(PlayerService), 'getCurrentStatus')
      .and.returnValue(Observable.empty());
    page.testComponent.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should toggle shuffle', () => {
    component.shuffled = false;
    page.shuffleButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.shuffled).toBe(true);

    page.shuffleButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.shuffled).toBe(false);
  });

  it('should toggle repeat', () => {
    component.repeated = false;
    page.repeatButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.repeated).toBe(true);

    page.repeatButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.repeated).toBe(false);
  });

  it('should emit prev', () => {
    expect(component.prev).not.toHaveBeenCalled();
    page.prevButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.prev).toHaveBeenCalled();
  });

  it('should emit next', () => {
    expect(component.next).not.toHaveBeenCalled();
    page.nextButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.next).toHaveBeenCalled();
  });

  it('should play if paused', () => {
    const spy = spyOn(TestBed.get(PlayerService), 'play');
    page.testComponent.paused = Observable.of(true);
    fixture.detectChanges();

    page.createElements();
    expect(page.playButton).toBeTruthy();
    expect(page.pauseButton).toBeFalsy();

    page.playButton.nativeElement.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should pause if not paused', () => {
    const spy = spyOn(TestBed.get(PlayerService), 'pause');
    page.testComponent.paused = Observable.of(false);
    fixture.detectChanges();

    page.createElements();
    expect(page.playButton).toBeFalsy();
    expect(page.pauseButton).toBeTruthy();

    page.pauseButton.nativeElement.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
});

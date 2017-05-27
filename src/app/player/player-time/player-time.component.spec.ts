/* tslint:disable max-classes-per-file */
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MaterialModule } from '../../shared/material.module';
import { MSToStringPipe } from '../../shared/pipes/ms-to-string.pipe';
import { PlayerTimeComponent } from './player-time.component';

@Component({
  template: `
    <spot-player-time
      [currentTimeMS]="currentTimeMS"
      [durationMS]="durationMS"
      (seek)="seek($event)"
    ></spot-player-time>
  `,
})
class DummyComponent {
  currentTimeMS = 0;
  durationMS = 1000 * 60;
  seek = jasmine.createSpy('seek');
}

let fixture: ComponentFixture<DummyComponent>;
let component: DummyComponent;
let page: Page;

class Page {
  testComponent: PlayerTimeComponent;

  constructor() {
    this.testComponent = fixture.debugElement
      .query(By.directive(PlayerTimeComponent))
      .injector
      .get(PlayerTimeComponent);
  }

  createElements() {
    return;
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

describe('PlayerTimeComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          MaterialModule,
        ],
        declarations: [
          MSToStringPipe,
          PlayerTimeComponent,
          DummyComponent,
        ],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should emit seeking event', () => {
    page.testComponent.onSlide(42);
    fixture.detectChanges();
    expect(component.seek).toHaveBeenCalledWith(0.42);
  });

  it('should calculate current time value based on input', () => {
    component.durationMS = 10000;
    component.currentTimeMS = 4200;
    fixture.detectChanges();
    expect(page.testComponent.value).toEqual(42);
  });
});

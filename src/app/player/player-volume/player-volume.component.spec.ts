/* tslint:disable max-classes-per-file */
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MaterialModule } from '../../shared/material.module';
import { PlayerVolumeComponent } from './player-volume.component';

@Component({
  template: `
    <spot-player-volume
      [(volume)]="volume"
      (mute)="mute()"
    ></spot-player-volume>
  `,
})
class DummyComponent {
  volume = 1;
  mute = jasmine.createSpy('mute');
}

let fixture: ComponentFixture<DummyComponent>;
let component: DummyComponent;
let page: Page;

class Page {
  testComponent: PlayerVolumeComponent;

  constructor() {
    this.testComponent = fixture.debugElement
      .query(By.directive(PlayerVolumeComponent))
      .injector
      .get(PlayerVolumeComponent);
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

describe('PlayerVolumeComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          MaterialModule,
        ],
        declarations: [
          PlayerVolumeComponent,
          DummyComponent,
        ],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should emit volume changes', () => {
    component.volume = 1;
    page.testComponent.onVolumeChange(0.42);
    fixture.detectChanges();
    expect(component.volume).toBe(0.42);
  });

  it('should toggle mute', () => {
    expect(component.mute).not.toHaveBeenCalled();
    page.testComponent.toggleMute();
    fixture.detectChanges();
    expect(component.mute).toHaveBeenCalled();
  });
});

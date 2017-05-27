import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FakeRouterLink } from '../../../test-utils/';
import { MaterialModule } from '../../shared/material.module';
import { RecentSearchComponent } from './recent-search.component';

let fixture: ComponentFixture<RecentSearchComponent>;
let component: RecentSearchComponent;
let page: Page;

class Page {
  links: DebugElement[];

  createElements() {
    this.links = fixture.debugElement.queryAll(By.css('.link'));
  }
}

function createComponent() {
  fixture = TestBed.createComponent(RecentSearchComponent);
  component = fixture.componentInstance;
  page = new Page();
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.createElements();
  });
}

describe('RecentSearchComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          MaterialModule,
        ],
        declarations: [
          RecentSearchComponent,
          FakeRouterLink,
        ],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should create as many links as history items', () => {
    component.histories = 'abcdefgh'
      .split('')
      .map((name: string, idx: number) => {
        return {
          name,
          type: idx % 2 === 0 ? 'album' : 'artist',
          id: String(idx),
        };
      });

    fixture.detectChanges();
    page.createElements();
    fixture.detectChanges();
    expect(page.links.length).toEqual('abcdefgh'.length);
  });
});

import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'spot-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private searchPageScrollX = 0;
  private searchPageScrollY = 0;

  constructor(private router: Router) {
  }

  // For the search page, scroll to previous scroll position
  // For all other pages, scroll to top
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationStart) {
        if (this.router.routerState.snapshot.url === '/') {
          this.searchPageScrollX = window.scrollX;
          this.searchPageScrollY = window.scrollY;
        }
      } else if (evt instanceof NavigationEnd) {
        if (evt.url !== '/') {
          window.scrollTo(0, 0);
        } else {
          window.scrollTo(this.searchPageScrollX, this.searchPageScrollY);
        }
      }
    });
  }
}

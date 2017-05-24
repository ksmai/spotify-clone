import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'spot-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events
      .filter((evt) => evt instanceof NavigationEnd && evt.url !== '/')
      .subscribe(() => window.scrollTo(0, 0));
  }
}

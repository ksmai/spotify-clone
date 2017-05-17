import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SearchService } from '../core/search.service';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  isLoading: Observable<boolean>;

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
    this.isLoading = this.searchService.getLoadingStatus();
  }

  onKeyup(query: string): void {
    this.searchService.nextQuery(query);
  }
}

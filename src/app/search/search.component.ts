import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SearchService } from '../core/search.service';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  constructor(private searchService: SearchService) {
  }

  onKeyup(query: string): void {
    this.searchService.nextQuery(query);
  }
}

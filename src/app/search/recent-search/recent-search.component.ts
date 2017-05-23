import { Component, Input } from '@angular/core';

import { SearchHistory } from '../../../data-models/search-history';

@Component({
  selector: 'spot-recent-search',
  templateUrl: './recent-search.component.html',
  styleUrls: ['./recent-search.component.scss'],
})
export class RecentSearchComponent {
  @Input() histories: SearchHistory[];
}

import { Component, EventEmitter, Output, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LinkModule, SearchModule } from 'carbon-components-angular';

@Component({
  selector: 'app-search',
  imports: [FormsModule, SearchModule, LinkModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() search = new EventEmitter<{
    term: string;
    errorCallback: (error: string) => void;
  }>();
  searchTerm = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {      
        this.onSearch(params['search']??'');
    });
  }

  /**
   * Handles the search input and emits a search event.
   *
   * @param val The search term entered by the user.
   */
  onSearch(val: string) {
    this.searchTerm = val;
    this.search.emit({
      term: val,
      errorCallback: (error: string) => alert(error),
    });
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: val },
      queryParamsHandling: 'merge'
    });
  }
}

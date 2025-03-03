import { Component, EventEmitter, Output } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { SearchModule } from 'carbon-components-angular';

@Component({
  selector: 'app-search',
  imports: [FormsModule, SearchModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Output() search = new EventEmitter<{
    term: string;
    errorCallback: (error: string) => void;
  }>();
  searchTerm = '';

  onSearch(val: string) {
    this.searchTerm = val;
    this.search.emit({
      term: val,
      errorCallback: (error: string) => alert(error),
    });
  }
}

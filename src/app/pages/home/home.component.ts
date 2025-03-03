import { PackageEntry, SearchResult } from '../../models/package.model';
import { LinkModule, PaginationModule, ThemeModule } from 'carbon-components-angular';

import { Component } from '@angular/core';
import { NpmRegistryService } from '../../services/npm-registry.service';
import { PackageListComponent } from '../../components/package-list/package-list.component';
import { SearchComponent } from '../../components/search/search.component';

@Component({
  selector: 'app-home',
  imports: [
    SearchComponent,
    PackageListComponent,
    ThemeModule,
    PaginationModule,
    LinkModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})

/**
 * Component representing the home page, displaying search functionality and package results.
 */
export class HomeComponent {
  packageEntries: PackageEntry[] = [];
  pagination = {
    currentPage: 1,
    pageLength: 10,
    totalDataLength: 10,
  };
  loading = false;
  lastSearchTerm = '';
  lastSearchErrorCallback = (error: string) => alert(error);

  constructor(private npmRegistryService: NpmRegistryService) {}
  ngOnInit(): void {
    console.log('abc')
    
  }

  /**
   * Handles the search event, resets pagination, and initiates a search.
   *
   * @param event An object containing the search term and error callback.
   */
  onSearch(event: { term: string; errorCallback: (error: string) => void }) {
    this.pagination.currentPage = 1;
    this.searchPackages(event.term, event.errorCallback);
  }

  /**
   * Handles page selection, updates pagination, and initiates a search.
   *
   * @param page The selected page number.
   */
  selectPage(page: number) {
    this.pagination.currentPage = page;
    this.searchPackages(this.lastSearchTerm, this.lastSearchErrorCallback);
  }

  /**
   * Initiates a search for packages based on the search term.
   *
   * @param searchTerm The search term to use.
   * @param errorCallback Callback function to handle errors during search.
   */
  private searchPackages(
    searchTerm: string,
    errorCallback: (error: string) => void,
  ) {
    this.lastSearchTerm = searchTerm;
    this.lastSearchErrorCallback = errorCallback;

    if (searchTerm.length > 2) {
      this.loading = true;
      this.npmRegistryService
        .searchPackages(
          searchTerm,
          this.pagination.pageLength,
          (this.pagination.currentPage - 1) * this.pagination.pageLength,
        )
        .subscribe({
          next: (result: SearchResult) => {
            this.packageEntries = result.objects;
            this.pagination.totalDataLength = result.total;
            this.loading = false;
          },
          error: (error) => {
            this.loading = false;
            errorCallback(error);
          },
        });
    } else {
      this.packageEntries = [];
      this.pagination.totalDataLength = 0;
    }
  }
}

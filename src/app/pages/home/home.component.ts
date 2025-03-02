import { PackageEntry, SearchResult } from '../../models/package.model';
import { PaginationModule, ThemeModule } from 'carbon-components-angular';

import { Component } from '@angular/core';
import { NpmRegistryService } from '../../services/npm-registry.service';
import { PackageListComponent } from '../../components/package-list/package-list.component';
import { SearchComponent } from '../../components/search/search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SearchComponent,
    PackageListComponent,
    ThemeModule,
    PaginationModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
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

  onSearch(event: { term: string; errorCallback: (error: string) => void }) {
    this.pagination.currentPage = 1;
    this.searchPackages(event.term, event.errorCallback);
  }

  selectPage(page: number) {
    this.pagination.currentPage = page;
    this.searchPackages(this.lastSearchTerm, this.lastSearchErrorCallback);
  }

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

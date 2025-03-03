import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchResult } from '../models/package.model';

import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environment';
import { PackageDetails } from '../models/packageDetails.model';
import { GlobalErrorHandler } from './globa-error-handler';

@Injectable({
  providedIn: 'root',
})

/**
 * Service for interacting with the npm registry API.
 */
export class NpmRegistryService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private errorhandler: GlobalErrorHandler) {}

    /**
   * Searches for packages in the npm registry.
   *
   * @param searchTerm The search term to use.
   * @param size The number of results to return.
   * @param from The starting index of the results.
   * @returns An Observable of SearchResult, which contains the search results.
   * @throws HttpErrorResponse if there's an HTTP error.
   */
  searchPackages(
    searchTerm: string,
    size: number,
    from: number,
  ): Observable<SearchResult> {
    const url = `${this.baseUrl}/-/v1/search?text=${searchTerm}&size=${size}&from=${from}`;
    return this.http.get<SearchResult>(url).pipe(catchError(this.errorhandler.createErrorHandler()));
  }

  /**
   * Retrieves detailed information about a specific package.
   *
   * @param packageName The name of the package to retrieve details for.
   * @returns An Observable of PackageDetails, which contains the package details.
   * @throws HttpErrorResponse if there's an HTTP error.
   */
  getPackageDetails(packageName: string): Observable<PackageDetails> {
    const url = `${this.baseUrl}/${packageName}`;
    return this.http
      .get<PackageDetails>(url)
      .pipe(catchError(this.errorhandler.createErrorHandler()));
  }

}

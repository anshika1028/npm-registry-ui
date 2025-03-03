import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { PackageDetails, SearchResult } from '../models/package.model';

import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

/**
 * Service for interacting with the npm registry API.
 */
export class NpmRegistryService {
  private baseUrl = 'https://registry.npmjs.org';

  constructor(private http: HttpClient) {}

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
    return this.http.get<SearchResult>(url).pipe(catchError(this.handleError));
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
      .pipe(catchError(this.handleError));
  }

  /**
   * Handles HTTP errors by logging them and returning a user-friendly error message.
   *
   * @param error The HttpErrorResponse object representing the error.
   * @returns An Observable that emits an error message.
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`,
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}

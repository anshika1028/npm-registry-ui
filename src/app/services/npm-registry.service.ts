import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { PackageDetails, SearchResult } from '../models/package.model';

import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NpmRegistryService {
  private baseUrl = 'https://registry.npmjs.org';

  constructor(private http: HttpClient) {}

  searchPackages(
    searchTerm: string,
    size: number,
    from: number,
  ): Observable<SearchResult> {
    const url = `${this.baseUrl}/-/v1/search?text=${searchTerm}&size=${size}&from=${from}`;
    return this.http.get<SearchResult>(url).pipe(catchError(this.handleError));
  }

  getPackageDetails(packageName: string): Observable<PackageDetails> {
    const url = `${this.baseUrl}/${packageName}`;
    return this.http
      .get<PackageDetails>(url)
      .pipe(catchError(this.handleError));
  }

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

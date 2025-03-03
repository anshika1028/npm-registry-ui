import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NpmRegistryService } from './npm-registry.service';
import { SearchResult } from '../models/package.model';

describe('NpmRegistryService', () => {
  let service: NpmRegistryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NpmRegistryService],
    });
    service = TestBed.inject(NpmRegistryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search packages', () => {
    const dummySearchResult: SearchResult = {
      objects: [],
      total: 0,
    };

    service.searchPackages('angular', 10, 0).subscribe((result) => {
      expect(result).toEqual(dummySearchResult);
    });

    const req = httpMock.expectOne(
      'https://registry.npmjs.org/-/v1/search?text=angular&size=10&from=0',
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummySearchResult);
  });

  it('should handle error on search packages', () => {
    service.searchPackages('angular', 10, 0).subscribe(
      () => fail('should have failed with the 500 error'),
      (error) => {
        expect(error).toBe('Something bad happened; please try again later.');
      },
    );

    const req = httpMock.expectOne(
      'https://registry.npmjs.org/-/v1/search?text=angular&size=10&from=0',
    );
    expect(req.request.method).toBe('GET');
    req.flush('Something bad happened', {
      status: 500,
      statusText: 'Server Error',
    });
  });
});

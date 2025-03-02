import { TestBed } from '@angular/core/testing';

import { NpmRegistryService } from './npm-registry.service';

describe('NpmRegistryService', () => {
  let service: NpmRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NpmRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

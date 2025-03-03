import { PaginationModule, ThemeModule } from 'carbon-components-angular';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NpmRegistryService } from '../../services/npm-registry.service';
import { PackageListComponent } from '../../components/package-list/package-list.component';
import { SearchComponent } from '../../components/search/search.component';
import { TestBed } from '@angular/core/testing';

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SearchComponent,
        PackageListComponent,
        ThemeModule,
        PaginationModule,
        HomeComponent
      ],
      providers: [NpmRegistryService],
    }).compileComponents();
  });

  it('should create the home component', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize with default values', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    expect(app.packageEntries).toEqual([]);
    expect(app.pagination.currentPage).toBe(1);
    expect(app.pagination.pageLength).toBe(10);
    expect(app.pagination.totalDataLength).toBe(10);
    expect(app.loading).toBeFalse();
    expect(app.lastSearchTerm).toBe('');
  });

  it('should call searchPackages on onSearch', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    spyOn(app as any, 'searchPackages');
    const event = { term: 'test', errorCallback: jasmine.createSpy() };
    app.onSearch(event);
    expect((app as any).searchPackages).toHaveBeenCalledWith('test', event.errorCallback);
  });

  it('should call searchPackages on selectPage', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    spyOn(app as any, 'searchPackages');
    app.lastSearchTerm = 'test';
    app.lastSearchErrorCallback = jasmine.createSpy();
    app.selectPage(2);
    expect((app as any).searchPackages).toHaveBeenCalledWith('test', app.lastSearchErrorCallback);
  });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationModule, ThemeModule } from 'carbon-components-angular';
import { of, throwError } from 'rxjs';

import { HomeComponent } from './home.component';
import { NpmRegistryService } from '../../services/npm-registry.service';
import { PackageListComponent } from '../../components/package-list/package-list.component';
import { SearchComponent } from '../../components/search/search.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let npmRegistryService: jasmine.SpyObj<NpmRegistryService>;

  beforeEach(async () => {
    const npmRegistryServiceMock = jasmine.createSpyObj('NpmRegistryService', ['searchPackages']);

    await TestBed.configureTestingModule({
      imports: [
        SearchComponent,
        PackageListComponent,
        ThemeModule,
        PaginationModule,
        HomeComponent,
      ],
      providers: [
        { provide: NpmRegistryService, useValue: npmRegistryServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    npmRegistryService = TestBed.inject(NpmRegistryService) as jasmine.SpyObj<NpmRegistryService>;
  });

  it('should create the home component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.packageEntries).toEqual([]);
    expect(component.pagination).toEqual({
      currentPage: 1,
      pageLength: 10,
      totalDataLength: 10,
    });
    expect(component.loading).toBe(false);
    expect(component.lastSearchTerm).toBe('');
  });

  it('should call searchPackages on onSearch', () => {
    const searchTerm = 'angular';
    const errorCallback = jasmine.createSpy('errorCallback');
    const searchPackagesSpy = spyOn<any>(component, 'searchPackages');

    component.onSearch({ term: searchTerm, errorCallback });

    expect(component.pagination.currentPage).toBe(1);
    expect(searchPackagesSpy).toHaveBeenCalledWith(searchTerm, errorCallback);
  });

  it('should call searchPackages on selectPage', () => {
    const searchTerm = 'angular';
    const errorCallback = jasmine.createSpy('errorCallback');
    component.lastSearchTerm = searchTerm;
    component.lastSearchErrorCallback = errorCallback;
    const searchPackagesSpy = spyOn<any>(component, 'searchPackages');

    component.selectPage(2);

    expect(component.pagination.currentPage).toBe(2);
    expect(searchPackagesSpy).toHaveBeenCalledWith(searchTerm, errorCallback);
  });

  it('should handle searchPackages success', () => {
    const searchTerm = 'angular';
    const errorCallback = jasmine.createSpy('errorCallback');
    const searchResult = {
      objects: [{ name: 'package1' }, { name: 'package2' }],
      total: 2,
    };
    npmRegistryService.searchPackages.and.returnValue(of(searchResult));

    component.onSearch({ term: searchTerm, errorCallback });

    expect(component.packageEntries).toEqual(searchResult.objects);
    expect(component.pagination.totalDataLength).toBe(searchResult.total);
    expect(component.loading).toBe(false);
  });

  it('should handle searchPackages error', () => {
    const searchTerm = 'angular';
    const errorCallback = jasmine.createSpy('errorCallback');
    const error = 'Error occurred';
    npmRegistryService.searchPackages.and.returnValue(throwError(error));

    component.onSearch({ term: searchTerm, errorCallback });

    expect(component.packageEntries).toEqual([]);
    expect(component.pagination.totalDataLength).toBe(0);
    expect(component.loading).toBe(false);
    expect(errorCallback).toHaveBeenCalledWith(error);
  });
});
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { MarkdownComponent } from 'ngx-markdown';
import { NpmRegistryService } from '../../services/npm-registry.service';
import { PackageDetails } from '../../models/package.model';
import { LinkModule, SkeletonModule, TabsModule } from 'carbon-components-angular';
import { getTimeAgoString } from '../../misc/utils';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-package-detail',
  imports: [MarkdownComponent, TabsModule, LinkModule, SkeletonModule],
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.scss'],
})
export class PackageDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private npmRegistryService: NpmRegistryService,
  ) {}

  loading = false;
  packageDetails: PackageDetails | null = null;
  errorCallback = (error: string) => alert(error);

  ngOnInit() {
    this.getPackageDetails();
  }

   /**
   * Fetches package details based on the route parameters.
   */
  getPackageDetails() {
    this.loading = true;
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const names: string[] = [];
          const name: string = params.get('name')!;
          const subname: string = params.get('subname')!;
          if (name) {
            names.push(name);
          }
          if (subname) {
            names.push(subname);
          }
          return this.npmRegistryService.getPackageDetails(names.join('/')!);
        }),
      )
      .subscribe({
        next: (packageDetails) => {
          this.loading = false;
          this.packageDetails = packageDetails;
        },
        error: (error) => {
          this.loading = false;
          this.errorCallback(error);
        },
      });
  }

   /**
   * Returns a human-readable string representing the time elapsed since the given date.
   *
   * @param date The date string to calculate the time elapsed from.
   * @returns A string representing the time elapsed (e.g., "2 hours ago").
   */
  fromNow(date?: string) {
    return getTimeAgoString(date);
  }
}

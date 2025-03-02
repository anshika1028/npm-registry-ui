import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { MarkdownComponent } from 'ngx-markdown';
import { NpmRegistryService } from '../../services/npm-registry.service';
import { PackageDetails } from '../../models/package.model';
import { TabsModule } from 'carbon-components-angular';
import dayjs from 'dayjs';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-package-detail',
  standalone: true,
  imports: [MarkdownComponent, TabsModule],
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

  getPackageDetails() {
    this.loading = true;
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const name = [];
          name.push(params.get('name'));
          if (params.get('subname')) {
            name.push(params.get('subname'));
          }
          return this.npmRegistryService.getPackageDetails(name.join('/')!);
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

  fromNow(date?: string) {
    if (date) {
      return dayjs(date).fromNow();
    } else {
      return '-';
    }
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  IconModule,
  LinkModule,
  StructuredListModule,
  TagModule,
} from 'carbon-components-angular';
import { Package, PackageEntry } from '../../models/package.model';

import { getTimeAgoString } from '../../misc/utils';

@Component({
  selector: 'app-package-list',
  imports: [StructuredListModule, TagModule, IconModule, LinkModule],
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.scss'],
})
export class PackageListComponent {
  @Input() loading = false;
  @Input() packageEntries: PackageEntry[] = [];
  @Input() totalCount = 0;

  @Output() packageSelected = new EventEmitter<{
    pkg: Package;
    errorCallback: (error: string) => void;
  }>();

  fromNow(date: string) {
    return getTimeAgoString(date);
  }
}

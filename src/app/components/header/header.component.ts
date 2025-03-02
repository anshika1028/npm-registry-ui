import { HeaderModule, ThemeModule } from 'carbon-components-angular';

import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [HeaderModule, ThemeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}

import { HomeComponent } from './pages/home/home.component';
import { PackageDetailComponent } from './components/package-detail/package-detail.component';
import { Routes } from '@angular/router';
import { TopHeaderLayoutComponent } from './layout/top-header-layout/top-header-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: TopHeaderLayoutComponent, // this is the component with the <router-outlet> in the template
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'packages/:name',
        component: PackageDetailComponent,
      },
      {
        path: 'packages/:name/:subname',
        component: PackageDetailComponent,
      },
    ],
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

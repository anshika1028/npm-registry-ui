import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { MarkdownModule, provideMarkdown } from 'ngx-markdown';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

import RelativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

dayjs.extend(RelativeTime);

MarkdownModule.forRoot();
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideHttpClient(withFetch()),
    provideMarkdown(),
  ],
};

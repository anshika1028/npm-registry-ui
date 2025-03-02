import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { MarkdownModule, provideMarkdown } from 'ngx-markdown';

import RelativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

dayjs.extend(RelativeTime);

MarkdownModule.forRoot();
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideMarkdown(),
  ],
};

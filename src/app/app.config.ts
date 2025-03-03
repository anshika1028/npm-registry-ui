import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { MarkdownModule, provideMarkdown } from 'ngx-markdown';

import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

MarkdownModule.forRoot();
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideMarkdown(),
  ],
};

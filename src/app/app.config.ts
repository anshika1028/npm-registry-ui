import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { MarkdownModule, provideMarkdown } from 'ngx-markdown';

import { provideHttpClient , HTTP_INTERCEPTORS} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ErrorHandler } from '@angular/core';
import { HttpErrorInterceptor } from './http-error-interceptor';
import { LoggingService } from './services/logging-service';
import { GlobalErrorHandler } from './services/globa-error-handler';


MarkdownModule.forRoot();
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    LoggingService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    provideMarkdown(),
  ],
};

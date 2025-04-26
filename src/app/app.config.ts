import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  InMemoryScrollingFeature,
  InMemoryScrollingOptions,
  provideRouter,
  withComponentInputBinding,
  withHashLocation,
  withInMemoryScrolling,
} from '@angular/router';
import { appHttpInterceptor } from './app-http.interceptor';
import { APP_ROUTES_CONFIG } from './app.routes';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);

export const APP_CONFIG = {
  providers: [
    provideHttpClient(withInterceptors([appHttpInterceptor])),
    provideAnimations(),
    importProvidersFrom(HttpClientModule),
    provideProtractorTestingSupport(),
    provideRouter(
      APP_ROUTES_CONFIG,
      inMemoryScrollingFeature,
      withHashLocation(),
      withComponentInputBinding()
    ),
  ],
};

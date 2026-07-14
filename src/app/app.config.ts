import {
  ApplicationConfig,
  DEFAULT_CURRENCY_CODE,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  isDevMode,
} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';

registerLocaleData(localePl);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'pl' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'PLN' },
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};

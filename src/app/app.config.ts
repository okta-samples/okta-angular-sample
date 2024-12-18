import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { OktaAuthModule } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import oktaConfig from './okta.config';
import { provideHttpClient } from '@angular/common/http';

const oktaAuth = new OktaAuth(oktaConfig.oidc);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      OktaAuthModule.forRoot({ oktaAuth })
    )
  ]
};

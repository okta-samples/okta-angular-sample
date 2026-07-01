import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';

import { OktaAuth } from '@okta/okta-auth-js';
import { provideOktaAuth, withOktaConfig } from '@okta/okta-angular';

import { oktaAppConfig } from './okta.config';


const oktaAuth = new OktaAuth(oktaAppConfig.oidc);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideOktaAuth(
      withOktaConfig({ oktaAuth })
    ),
    provideHttpClient(withInterceptors([
      authInterceptor
    ])),
  ]
};

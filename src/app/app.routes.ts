import { Routes } from '@angular/router';
import { canActivateAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { MessagesComponent } from './messages/messages.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [canActivateAuthGuard] },
  { path: 'messages', component: MessagesComponent, canActivate: [canActivateAuthGuard] },
  { path: 'protected', loadChildren: () => import('./protected/routes').then(m => m.PROTECTED_FEATURE_ROUTES), canActivate: [canActivateAuthGuard] },
];

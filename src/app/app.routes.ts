/*!
 * Copyright (c) 2020-Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

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

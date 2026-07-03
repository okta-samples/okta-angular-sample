import { Component, inject } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  private oktaAuth = inject(OKTA_AUTH);

  get claims() {
    const idToken = this.oktaAuth.authStateManager.getAuthState()?.idToken;
    return Object.entries(idToken?.claims ?? {}).map(([name, value]) => ({ name, value }));
  }
}

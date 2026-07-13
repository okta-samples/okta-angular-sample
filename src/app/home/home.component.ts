import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OKTA_AUTH } from '@okta/okta-angular';

interface ResourceServerExample {
  label: string;
  url: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  resourceServerExamples: ResourceServerExample[] = [
    {
      label: 'Node/Express Resource Server Example',
      url: 'https://github.com/okta/samples-nodejs-express-4/tree/master/resource-server',
    },
    {
      label: 'Java/Spring MVC Resource Server Example',
      url: 'https://github.com/okta/samples-java-spring/tree/master/resource-server',
    },
    {
      label: 'ASP.NET Resource Server Example',
      url: 'https://github.com/okta/samples-aspnet/tree/master/resource-server'
    }
  ];

  isAuthenticated = signal(false);
  userName = signal<string | undefined>(undefined);
  error = signal<Error | null>(null);
  private oktaAuth = inject(OKTA_AUTH);

  async ngOnInit() {
    const isAuthenticated = await this.oktaAuth.isAuthenticated();
    this.isAuthenticated.set(isAuthenticated);
    if (isAuthenticated) {
      const userClaims = await this.oktaAuth.getUser();
      this.userName.set(userClaims.name);
    }
  }
}

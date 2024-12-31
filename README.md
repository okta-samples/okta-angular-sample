# Okta Angular + Custom Login Example

This example shows you how to use the [Okta Angular Library][] to login a user to an Angular application. The login is achieved with the [Okta Sign In Widget][], which gives you more control to customize the login experience within your app.

This example is built with [Angular CLI][].

## Prerequisites

Before running this sample, you will need the following:

* [The Okta CLI Tool](https://github.com/okta/okta-cli#installation)
* An Okta Developer Account (create one using `okta register`, or configure an existing one with `okta login`)

## Get the Code

Grab and configure this project using `okta start angular --branch widget`.

Follow the instructions printed to the console.

## Update Okta Settings

You'll need to make changes in Okta to support refresh tokens, enable interaction code grant, and add a custom authorization server by following the instructions in [Create an Okta app integration](https://developer.okta.com/docs/guides/sign-in-to-spa-embedded-widget/angular/main/#create-an-okta-app-integration) docs.

## Run the Example

To run this application, install its dependencies:

```
npm install
```

With variables set, start the app server:

```
ng serve
```

Now navigate to http://localhost:4200 in your browser.

If you see a home page that prompts you to login, then things are working!  Clicking the **Log in** button will render a custom login page component that uses the Okta Sign-In Widget to perform authentication.

You can sign in with the same account that you created when signing up for your Developer Org, or you can use a known username and password from your Okta Directory.

> **Note:** If you are currently using the Okta Admin Console, you already have a Single Sign-On (SSO) session for your Org. You will be automatically logged into your application as the same user that is using the Admin Console. You may want to use an incognito tab to test the flow from a blank slate.

## Integrating The Resource Server

If you were able to successfully login in the previous section you can continue with the resource server example. Please download and run one of these sample applications in another terminal:

* [Node/Express Resource Server Example](https://github.com/okta/samples-nodejs-express-4/tree/master/resource-server)
* [Java/Spring MVC Resource Server Example](https://github.com/okta/samples-java-spring/tree/master/resource-server)
* [ASP.NET](https://github.com/okta/samples-aspnet/tree/master/resource-server) and [ASP.NET Core](https://github.com/okta/samples-aspnetcore/tree/master/samples-aspnetcore-3x/resource-server) Resource Server Examples

Once you have the resource server running (it will run on port 8000) you can visit the `/messages` page within the Angular application to see the authentication flow. The Angular application will use its stored access token to authenticate itself with the resource server, you will see this as the `Authorization: Bearer <access_token>` header on the request if you inspect the network traffic in the browser.

[Angular CLI]: https://cli.angular.io/
[Okta Angular Library]: https://github.com/okta/okta-oidc-js/tree/master/packages/okta-angular
[PKCE Flow]: https://developer.okta.com/docs/guides/implement-auth-code-pkce
[OIDC SPA Setup Instructions]: https://developer.okta.com/docs/guides/sign-into-spa/angular/before-you-begin
[Okta Sign In Widget]: https://github.com/okta/okta-signin-widget

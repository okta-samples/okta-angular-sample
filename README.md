# Okta Angular + Custom Login Example

This example shows you how to use the [Okta Angular Library][] to login a user to an Angular application. The login is achieved with the [Okta Sign In Widget][], which gives you more control to customize the login experience within your app.

This example is built with [Angular CLI][].

## Prerequisites

Before you begin, you’ll need an Okta Integrator Free Plan account. To get one, sign up for an [Integrator account](https://developer.okta.com/login). Once you have an account, sign in to your [Integrator account](https://developer.okta.com/login). Next, in the Admin Console:

1. Go to **Applications > Applications**
2. Click **Create App Integration**
3. Select **OIDC - OpenID Connect** as the sign-in method
4. Select **Single-Page Application** as the application type, then click **Next**
5. Enter an app integration name (e.g. "My Angular SPA")
6. In the **Grant type** section, ensure both **Authorization Code** and **Refresh Token** are selected
7. Configure the redirect URIs:
- **Sign-in redirect URIs:** `http://localhost:4200/login/callback`
- **Sign-out redirect URIs:** `http://localhost:4200`
8. In the **Controlled access** section, select the appropriate access level
9. Click **Save**

## Configure Okta resources

**Verify Authorization Server**

When using a custom authorization server, you need to set up authorization policies. Complete these additional steps:

1. In the Admin Console, go to **Security > API > Authorization Servers**
2. Select your custom authorization server (`default`)
3. On the **Access Policies** tab, ensure you have at least one policy:
  - If no policies exist, click **Add New Access Policy**
  - Give it a name like “Default Policy”
  - Set **Assign to** to “All clients”
  - Click **Create Policy**
4. For your policy, ensure you have at least one rule:
  - Click **Add Rule** if no rules exist
  - Give it a name like “Default Rule”
  - Set **Grant type** is to “Authorization Code”
  - Set **User** is to “Any user assigned the app”
  - Set **Scopes requested** to “Any scopes”
  - Click **Create Rule**

For more details, see the [Custom Authorization Server documentation](https://developer.okta.com/docs/concepts/auth-servers/#custom-authorization-server).

## Get the Code

```bash
git clone https://github.com/okta-samples/okta-angular-sample.git
cd okta-angular-sample
git checkout widget
```

Update your `.okta.env` file with the values from your application's configuration:

```text
ISSUER=https://integrator-1337.okta.com
CLIENT_ID=0oab8eb55Kb9jdMIr5d6
```

### Where are my new app's credentials?

Creating an OIDC Single-Page App manually in the Admin Console configures your Okta Org with the application settings. You may also need to configure trusted origins for `http://localhost:4200` in **Security > API > Trusted Origins**.

After creating the app, you can find the configuration details on the app’s **General** tab:
- **Client ID**: Found in the **Client Credentials** section
- **Issuer**: Found in the **Issuer URI** field for the authorization server that appears by selecting **Security > API** from the navigation pane.


**Verify Authorization Server**

This repo calls a custom resource server to demonstrate making a protected resource request using an access token. Ensure that your default custom authorization server has an access policy. Add an access policy if it's not there. See [Create access polices](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-access-policies).


## Configure Okta resources

**Verify Authorization Server**

This repo calls a custom resource server to demonstrate making a protected resource request using an access token. Ensure that your default custom authorization server has an access policy. Add an access policy if it's not there. See [Create access polices](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-access-policies).

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

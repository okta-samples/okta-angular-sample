const { CLIENT_ID, ISSUER, OKTA_TESTING_DISABLEHTTPSCHECK } = process.env;

export default {
  oidc: {
    clientId: CLIENT_ID as string,
    issuer: ISSUER as string,
    redirectUri: 'http://localhost:4200/login/callback',
    scopes: ['openid', 'profile', 'email', 'offline_access'],
    testing: {
      disableHttpsCheck: `${OKTA_TESTING_DISABLEHTTPSCHECK}`
    }
  },
  resourceServer: {
    messagesUrl: 'http://localhost:8000/api/messages',
  },
};

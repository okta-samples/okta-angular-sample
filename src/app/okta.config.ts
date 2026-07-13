
export default {
  oidc: {
    clientId: '{yourClientId}',
    issuer: '{yourOktaDomain}/oauth2/default',
    redirectUri: 'http://localhost:4200/login/callback',
    scopes: ['openid', 'profile', 'email', 'offline_access'],
  },
  resourceServer: {
    messagesUrl: 'http://localhost:8000/api/messages',
  },
};

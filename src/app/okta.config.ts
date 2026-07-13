
export default {
  oidc: {
    clientId: '0oanbdhl9xOE7Ukqw1d7',
    issuer: 'https://alisa.oktapreview.com/oauth2/default',
    redirectUri: 'http://localhost:4200/login/callback',
    scopes: ['openid', 'profile', 'email', 'offline_access'],
  },
  resourceServer: {
    messagesUrl: 'http://localhost:8000/api/messages',
  },
};

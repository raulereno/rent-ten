import packageInfo from '../../auth_config.json';

let domain = packageInfo.production.domain;
let clientId = packageInfo.production.clientId;

export const environment = {
  production: true,
  // baseUrl:"https://rent-ten-production.up.railway.app",
  baseUrl: 'https://rentten-api.up.railway.app',
  auth: {
    domain,
    clientId,
    redirectUri: window.location.origin,
  },
};

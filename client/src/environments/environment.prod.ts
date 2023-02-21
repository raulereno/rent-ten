import packageInfo from '../../auth_config.json';

let domain = packageInfo.production.domain;
let clientId = packageInfo.production.clientId;

export const environment = {
  production: true,
  //https://rent-ten-production.up.railway.app <-- cuenta de raul
  //https://rentten-api.up.railway.app <-- cuenta de eze
  //https://renttenapi.onrender.com <<< deploy del back en Render
  baseUrl: 'https://renttenapi.onrender.com',
  auth: {
    domain,
    clientId,
    redirectUri: window.location.origin,
  },
};

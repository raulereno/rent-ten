
import packageInfo from '../../auth_config.json'

let domain = packageInfo.local.domain
let clientId = packageInfo.local.clientId


export const environment = {
  production: false,
  auth: {
    domain,
    clientId,
    redirectUri: window.location.origin
  },
  baseUrl: "http://localhost:3001"
};



import packageInfo from '../../auth_config.json'

let domain = packageInfo.domain
let clientId = packageInfo.clientId


export const environment = {
  production: false,
  auth: {
    domain,
    clientId,
    redirectUri: window.location.origin
  }
};
 

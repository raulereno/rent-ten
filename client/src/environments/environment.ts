
import packageInfo from '../../auth_config.json'

let domain = 'dev-p05tovuo7xrn30bk.us.auth0.com'

let clientId = 'sonpZPamW7aCnVNH7eNXNXe63I21SpcF'


export const environment = {
  production: false,
  auth: {
    domain,
    clientId,
    redirectUri: window.location.origin
  },
  baseUrl: "http://localhost:3001"
};


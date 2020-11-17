const API_PROXY_PREFIX='https://coaching.ductan.me'
const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
const BASE_URL_VUE_APP = process.env.VUE_APP_API_BASE_URL
module.exports = {
  LOGIN: `${BASE_URL}/token/generate-token`,
  ROUTES: `${BASE_URL_VUE_APP}/routes`,
  GOODS: `${BASE_URL_VUE_APP}/goods`,
  USERS: `${BASE_URL}/users/`,
  REQUESTS: `${BASE_URL}/requests`,
  TRANSACTIONS: `${BASE_URL}/transaction`
}
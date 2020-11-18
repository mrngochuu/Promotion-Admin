const API_PROXY_PREFIX='https://apivoucher-develop.azurewebsites.net/api'
const VERSION = 'v1'
const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : (API_PROXY_PREFIX + "/" + VERSION)
const BASE_URL_VUE_APP = process.env.VUE_APP_API_BASE_URL
module.exports = {
  LOGIN: `${BASE_URL}/auth/login`,
  BRANDS: `${BASE_URL}/brands`,
  BRANDBYID: `${BASE_URL}/brands`,
  ROUTES: `${BASE_URL_VUE_APP}/routes`,
  GOODS: `${BASE_URL_VUE_APP}/goods`,
}
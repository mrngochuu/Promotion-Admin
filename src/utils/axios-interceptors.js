import Cookie from 'js-cookie'
// 401
const resp401 = {
  onFulfilled(response, options) {
    const {message} = options
    if (response.status === 401) {
      message.error('No permission for this interface')
    }
    return response
  },
  onRejected(error, options) {
    const {message} = options
    message.error(error.message)
    return Promise.reject(error)
  }
}

const resp403 = {
  onFulfilled(response, options) {
    const {message} = options
    if (response.status === 403) {
      message.error(`Request denied`)
    }
    return response
  }
}

const reqCommon = {
  onFulfilled(config, options) {
    const {message} = options
    const {url, xsrfCookieName} = config
    if (url.indexOf('generate-token') === -1 && xsrfCookieName && !Cookie.get(xsrfCookieName)) {
      message.warning('Authenticate token expired, please log in again')
    }
    return config
  },
  onRejected(error, options) {
    const {message} = options
    message.error(error.message)
    return Promise.reject(error)
  }
}

export default {
  request: [reqCommon],
  response: [resp401, resp403]
}

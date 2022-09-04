const crypto = require('crypto')

const sign = (privateKey, value) => {
  return crypto
          .createHmac('sha256', privateKey)
          .update(value)
          .digest('base64')
}

module.exports = sign

const sign = require('./sign')

const genCookie = (options = {}, privateKey) => {
  const { key, isSign } = options
  let { value } = options
  let cookie = ''

  if (isSign) {
    value += `.${ sign(privateKey, value) }`
    
    delete options.isSign
  }

  delete options.key
  delete options.value

  cookie += `${ key }=${ value }; `

  const keys = Object.keys(options)

  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    const value = options[key]

    cookie += `${ key }=${ value }; `
  }

  return cookie
}

module.exports = genCookie

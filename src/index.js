const parser = require('./parser')
const genCookie = require('./gen-cookie')

class Cookie {
  constructor (privateKey, req, res) {
    this.privateKey = privateKey
    this.req = req
    this.res = res
    this.cookies = []
  }

  get (key) {
    const { cookie } = this.req.headers

    if (!cookie) {
      return null
    }

    const cookieMap = parser(cookie)

    if (Array.isArray(key)) {
      const res = {}

      for (let i = 0, l = key.length; i < l; i++) {
        const k = key[i]
        res[k] = cookieMap[k] || null
      }

      return res
    }

    const value = cookieMap[key]

    return value || null
  }

  set (options = {}) {
    if (Array.isArray(options)) {
      let cookies = []

      for (let i = 0, l = options.length; i < l; i++) {
        const cookie = genCookie(options[i], this.privateKey)

        cookies.push(cookie)
      }

      this.cookies = this.cookies.concat(cookies)
      this.res.setHeader('Set-Cookie', this.cookies)

      return cookies
    }

    const cookie = genCookie(options, this.privateKey)
    this.cookies = this.cookies.concat(cookie)
    this.res.setHeader('Set-Cookie', this.cookies)

    return cookie
  }
}

module.exports = Cookie

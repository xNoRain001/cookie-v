const parser = cookie => {
  const cookies = cookie.split('; ')
  const cookieMap = Object.create(null)

  for (let i = 0, l = cookies.length; i < l; i++) {
    const cookie = cookies[i]
    const index = cookie.indexOf('=')
    const key = cookie.slice(0, index)
    const value = cookie.slice(index + 1)

    cookieMap[key] = value
  }

  return cookieMap
}

module.exports = parser

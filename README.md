## Introduction

Cookie utils.

## Installation

```
npm i cookie-x
```

## Start

```js
const Cookie = require('cookie-x')

const privateKey = 'privateKey'

const server = http.createServer((req, res) => {
  if (req.url === '/foo') {
    const cookie = new Cookie('privateKey', req, res)

    // foo=foo;
    cookie.set({
      key: 'foo',
      value: 'foo',
    })
    
    // ['bar=bar; ', 'baz=baz.Qgcu+leCZ9dhDla9uUZXaAa1OI806hdBMQmCVC73whc=; ']
    cookie.set([
      {
        key: 'bar',
        value: 'bar',
      },
      {
        key: 'baz',
        value: 'baz',
        isSign: true
      }
    ])

    // foo=foo; max-age=3600;
    // This operation will override previous foo
    cookie.set({
      key: 'foo',
      value: 'foo',
      'max-age': '3600'
    })

    res.end()
  }

  if (req.url === '/bar') {
    const cookie = new Cookie('1', req, res)

    cookie.get('foo') // foo
    cookie.get('nonexistentKey') // null

    // { foo: 'foo', bar: 'bar', nonexistentKey: null }
    cookie.get(['foo', 'bar', 'nonexistentKey'])

    res.end()
  }
})
```
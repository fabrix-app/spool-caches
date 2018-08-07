# spool-caches

[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Build Status][ci-image]][ci-url]
[![Test Coverage][coverage-image]][coverage-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Follow @FabrixApp on Twitter][twitter-image]][twitter-url]

:package: Caches Spool


## Install
```sh
$ npm install --save @fabrix/spool-caches
```

## Configure

```js
// config/main.ts
export const main = {
  spools: [
    // ... other spools
    require('@fabrix/spool-caches').CachesSpool
  ]
}
```

## Configuration

```
const mongoStore = require('cache-manager-mongodb')
const redisStore = require('cache-manager-redis')
// config/caches.ts
export const caches = {
  stores: [
  // Example for redis Store
  {
    name: 'my-redis-store',
    store: redisStore,
    host: 'localhost',
    auth_pass: ''
    db: 0,
    ttl: 600 // Default TTL
  },
  // Example for memory store
  {
    name: 'memory-store',
    store: 'memory',
    max: 100,
    ttl: 60
  },
  // Example for mongo store
  {
    name: 'mongo-store',
    store: mongoStore,
    options: {
      host: 'localhost',
      port: '27017',
      username: 'username',
      password: 'password',
      database: 'mymondodb',
      collection: 'cacheManager',
      compression: false,
      poolSize: 5,
      auto_reconnect: true
      ttl: 60
    }
  }],

  defaults: ['memory-store']
}
```

For more information about store (type and configuration) please see the cache-manager documentation.

## Usage

```JavaScript
  const myDefaultCache = this.app.services.CacheService.getStore() // Return the first store into defaults config
  myDefaultCache.set('mystoreddata', 'testValue', {ttl: 10}).then(result => {
  return myDefaultCache.get('mystoreddata').then(result => {
        console.log(result)
        // >> 'testValue'
        return myDefaultCache.del('mystoreddata')
    })
  })

```

You can retrieve a specific store by name like this: 
`const myMongoCache = this.app.services.CacheService.getStore('mongo-store')`

You can retrieve a multi caching store like this (without parameters to get multi caching with defaults stores): 
`const myMongoCache = this.app.services.CacheService.getMultiCachingStore(['memory-store', 'mongo-store'])`

[npm-image]: https://img.shields.io/npm/v/@fabrix/spool-caches.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@fabrix/spool-caches
[ci-image]: https://img.shields.io/circleci/project/github/fabrix-app/spool-caches/master.svg
[ci-url]: https://circleci.com/gh/fabrix-app/spool-caches/tree/master
[daviddm-image]: http://img.shields.io/david/fabrix-app/spool-caches.svg?style=flat-square
[daviddm-url]: https://david-dm.org/fabrix-app/spool-caches
[gitter-image]: http://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/fabrix-app/fabrix
[twitter-image]: https://img.shields.io/twitter/follow/FabrixApp.svg?style=social
[twitter-url]: https://twitter.com/FabrixApp
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/fabrix-app/spool-caches.svg?style=flat-square
[coverage-url]: https://codeclimate.com/github/fabrix-app/spool-caches/coverage


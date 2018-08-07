# spool-caches

[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-download]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][codeclimate-image]][codeclimate-url]

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

## Contributing
We love contributions! Please check out our [Contributor's Guide](https://github.com/fabrixjs/fabrix/blob/master/.github/CONTRIBUTING.md) for more
information on how our projects are organized and how to get started.

[npm-image]: https://img.shields.io/npm/v/spool-proxy-cache.svg?style=flat-square
[npm-url]: https://npmjs.org/package/spool-proxy-cache
[npm-download]: https://img.shields.io/npm/dt/spool-proxy-cache.svg
[ci-image]: https://img.shields.io/circleci/project/github/CaliStyle/spool-proxy-cache/master.svg
[ci-url]: https://circleci.com/gh/CaliStyle/spool-proxy-cache/tree/master
[daviddm-image]: http://img.shields.io/david/fabrixjs/spool-proxy-cache.svg?style=flat-square
[daviddm-url]: https://david-dm.org/fabrixjs/spool-proxy-cache
[codeclimate-image]: https://img.shields.io/codeclimate/github/fabrixjs/spool-proxy-cache.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/fabrixjs/spool-proxy-cache
[gitter-image]: http://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/fabrixjs/fabrix

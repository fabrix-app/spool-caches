'use strict'

const fsStore = require('cache-manager-fs')

module.exports = {
  pkg: {
    name: require('../../package').name + '-test'
  },
  api: {
    models: {},
    controllers: {},
    services: {}
  },
  config: {
    caches: {
      stores: [
        {
          name: 'memory',
          store: 'memory',
          max: 100,
          ttl: 0
        }, {
          name: 'fs',
          store: fsStore
        }
      ],
      defaults: ['memory']
    },
    main: {
      spools: [
        require('../../dist').CachesSpool
      ]
    }
  }
}



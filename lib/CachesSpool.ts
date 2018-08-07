import { ExtensionSpool } from '@fabrix/fabrix/dist/common/spools/extension'
import { Caches } from './caches'
import { Validator } from './validator'

import * as config from './config/index'
import * as pkg from '../package.json'
import * as api  from './api/index'

export class CachesSpool extends ExtensionSpool {
  public cacheInstances: {[key: string]: any} = {}
  constructor(app) {
    super(app, {
      config: config,
      pkg: pkg,
      api: api
    })

    this.extensions = {
      cacheInstances: {
        get: () => {
          return this.cacheInstances
        },
        set: (newInstances) => {
          this.cacheInstances = newInstances
          // throw new Error('scheduler can not be set through FabrixApp, check spool-engine instead')
        },
        enumerable: true,
        configurable: true
      }
    }
  }

  /**
   * Validate Configuration
   */
  async validate () {
    // const requiredSpools = [ ]
    // const spools = Object.keys(this.app.spools)
    //
    // if (!spools.some(v => requiredSpools.indexOf(v) >= 0)) {
    //   return Promise.reject(new Error(`spool-caches requires spools: ${ requiredSpools.join(', ') }!`))
    // }

    if (!this.app.config.get('caches')) {
      return Promise.reject(new Error('No configuration found at config.caches!'))
    }

    return Promise.all([
      Validator.validateCachesConfig(this.app.config.get('caches'))
    ])
  }

  /**
   * Check if there some stores, if not set a default one
   */
  configure() {
    if (this.app.config.get('caches.stores').length === 0) {
      this.app.config.set('caches.stores',
        // Default Memory Store
        [{
          name: 'memory',
          type: 'memory',
          max: 500,
          ttl: 0
        }]
      )

      this.app.config.set('caches.defaults', ['memory'])
    }
  }

  /**
   * create caching stores
   */
  async initialize() {
    return Caches.init(this.app)
  }

  /**
   * unload caching stores
   */
  async unload() {
    return Caches.unload(this.app)
  }
}

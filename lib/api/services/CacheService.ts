import { FabrixService as Service } from '@fabrix/fabrix/dist/common'
import * as cacheManager from 'cache-manager'

/**
 * @module CacheService
 * @description Cache Service
 */
export class CacheService extends Service {
  constructor(app) {
    super(app)
  }

  getStore(name) {
    if (!name) {
      name = this.app.config.get('caches.defaults')[0]
    }
    if (this.app.cacheInstances[name]) {
      return this.app.cacheInstances[name]
    }
    else {
      throw new Error('unknown store named ' + name)
    }
  }

  /**
   * Get stores for multi caching
   * @param {Array} names of store wanted
   * @return {Object} Multi Caching Instance
   * @throws {Error} If no Store available/configured
   */
  getMultiCachingStore(names) {
    if (!names || names.length === 0) {
      names = this.app.config.get('caches.defaults')
    }
    const name = names.join('_')
    if (this.app.cacheInstances[name]) {
      return this.app.cacheInstances[name]
    }
    else {
      const stores = []
      names.forEach(type => {
        stores.push(this.getStore(type))
      })
      this.app.cacheInstances[name] = cacheManager.multiCaching(stores)
      return this.app.cacheInstances[name]
    }
  }
}

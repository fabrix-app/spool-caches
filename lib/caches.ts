import { FabrixApp } from '@fabrix/fabrix'
import * as cacheManager from 'cache-manager'

export const Caches = {
  /**
   * Create the Stores
   */

  init: (app: FabrixApp) => {
    const stores = app.config.get('caches.stores')
    const storesCreation = []

    for (const store of stores) {
      if (store.options && store.options.collection) {
        storesCreation.push(new Promise(resolve => {
          let proxyStore
          store.createCollectionCallback = () => {
            return resolve({
              name: store.name,
              store: proxyStore
            })
          }
          proxyStore = cacheManager.caching(store)
        }))
      }
      else {
        storesCreation.push(Promise.resolve({
          name: store.name,
          store: cacheManager.caching(store)
        }))
      }
    }

    return Promise.all(storesCreation).then(results => {
      results.forEach(result => {
        app.cacheInstances[result.name] = result.store
      })
    })
  },

  /**
   * Unload the Stores
   */
  unload: (app: FabrixApp) => {
    const unloadActions = []

    Object.keys(app.cacheInstances).forEach(key => {
      const cache = app.cacheInstances[key]

      if (cache.store && cache.store.client) {
        unloadActions.push(new Promise((resolve, reject) => {
          cache.store.client.close(true, err => {
            if (err) {
              reject(err)
            }
            else {
              resolve()
            }
          })
        }))
      }
    })

    return Promise.all(unloadActions)
  }
}

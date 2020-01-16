'use strict'
/* global describe, it */
const assert = require('assert')

describe('api.services.CacheService', () => {
  it('should exist', () => {
    assert(global.app.api.services.CacheService)
  })

  let CacheService
  before(() => {
    CacheService = global.app.services.CacheService
    // return CacheService.init()
  })

  describe('Stores', () => {
    it('should retrieve a memory store', () => {
      const memory = CacheService.getStore('memory')
      assert.equal(memory.store.name, 'memory')
      assert.equal(global.app.cacheInstances.memory, memory)
    })

    it('should retrieve a default store', () => {
      const defaults = CacheService.getStore()
      assert.equal(defaults.store.name, global.app.config.get('caches.defaults.0'))
    })

    it('should retrieve an fs store', () => {
      const fs = CacheService.getStore('fs')
      assert.equal(fs.store.name, 'diskstore')
    })

    it('should retrieve a multi caching store', () => {
      const multi = CacheService.getMultiCachingStore(['memory', 'fs'])
      assert(!multi.store)
    })
  })

  describe('Caches', () => {
    it('should retrieve an undefined value from memory store', () => {
      const memory = CacheService.getStore('memory')
      return memory.get('test').then(result => {
        assert(!result)
      })
    })

    it('should set a value to memory store', () => {
      const memory = CacheService.getStore('memory')
      return memory.set('test', 'ok').then(result => {
        assert.equal(result, 'ok')
      })
    })

    it('should retrieve the value from memory store', () => {
      const memory = CacheService.getStore('memory')
      return memory.get('test').then(result => {
        assert.equal(result, 'ok')
      })
    })

    it('should delete a value from memory store', () => {
      const memory = CacheService.getStore('memory')
      return memory.del('test').then(result => {
        assert(!result)
      })
    })

    it('should wrap the value from memory store', (done) => {
      const memory = CacheService.getStore('memory')

      memory.wrap('test', () => {
        return { hello: 'world' }
      })
        .then(result => {
          assert.deepEqual(result, { hello: 'world'})

          return memory.wrap('test', () => {
            return { hello: 'not world' }
          })
        })
        .then(result => {
          assert.deepEqual(result, {hello: 'world'})
          done()
        })
          .catch(err => {
          done(err)
        })
    })
  })
})

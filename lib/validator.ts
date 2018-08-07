/* eslint no-console: [0] */
'use strict'

const joi = require('joi')
import { cachesConfig } from './schemas'

export const Validator = {

  // Validate Caches Config
  validateCachesConfig (config) {
    return new Promise((resolve, reject) => {
      joi.validate(config, cachesConfig, (err, value) => {
        if (err) {
          return reject(new TypeError('config.caches: ' + err))
        }
        return resolve(value)
      })
    })
  }
}

import * as joi from 'joi'

export const cachesConfig = joi.object().keys({
  stores: joi.array(),
  defaults: joi.array()
})

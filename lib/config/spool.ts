/**
 * Spool Configuration
 *
 * @see {@link https://fabrix.app/docs/spool/config
 */
export const spool = {
  type: 'extension',
  /**
   * API and config resources provided by this Spool.
   */
  provides: {
    resources: ['services'],
    api: {
      services: ['CacheService'],
    },
    config: [ 'caches' ]
  },
  /**
   * Configure the lifecycle of this pack; that is, how it boots up, and which
   * order it loads relative to other spools.
   */
  lifecycle: {
    configure: {
      /**
       * List of events that must be fired before the configure lifecycle
       * method is invoked on this Spool
       */
      listen: [],

      /**
       * List of events emitted by the configure lifecycle method
       */
      emit: []
    },
    initialize: {
      listen: [],
      emit: []
    }
  }
}


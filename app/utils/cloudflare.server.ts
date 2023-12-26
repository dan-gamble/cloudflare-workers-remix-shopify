import { createLogger } from '~/utils/logger.server'
import { createDb } from '~/utils/db/db.server'
import { createShopifyApp } from '~/utils/shopify.server'
import { setupCache } from '~/utils/cache.server'
import type { AppLoadContext } from '@remix-run/cloudflare'

export function setupLoadContext (env: Env) {
  const logger = createLogger()
  const db = createDb(env)
  const shopify = createShopifyApp(env, db)
  const cache = setupCache(env)

  const loadContext: AppLoadContext = {
    env,
    cache,
    db,
    shopify,
    logger,
  }

  return loadContext
}

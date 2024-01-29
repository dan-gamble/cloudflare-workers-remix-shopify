import { AsyncLocalStorage } from 'node:async_hooks'
import type { BaoConfig } from '~/utils/config.server'
import { sanitizeModuleName } from '~/utils/string.server'
import { setupCache } from '~/utils/cache.server'
import type { Database } from '~/utils/db/db.server'
import { createDb } from '~/utils/db/db.server'
import { createShopifyApp } from '~/utils/shopify.server'
import type { Logger } from 'pino'
import { createLogger } from '~/utils/logger.server'

export interface AppContext {
  appName?: string
  env?: Env
  ctx?: ExecutionContext
  database?: {
    connections: BaoConfig['database']
  }
  queues?: BaoConfig['queues']
  storage?: {
    disks: BaoConfig['storage']
  }
  listeners?: Map<string, any[]>
  cache: ReturnType<typeof setupCache>
  db: Database
  shopify: ReturnType<typeof createShopifyApp>,
  logger: Logger
}

export const asyncLocalStorage = new AsyncLocalStorage<AppContext>()

export function getContext (): AppContext {
  const context = asyncLocalStorage.getStore()

  if (!context) {
    throw new Error(
      'No context found. You must be inside the request lifecycle to access BAO context.',
    )
  }

  return context
}

export async function runWithContext<T> (
  context: AppContext,
  fn: () => Promise<T>,
) {
  return await asyncLocalStorage.run(context, async () => {
    return await fn()
  })
}

/**
 * Converts a BaoConfig into an AppContext value.
 */
export function getContextFromUserConfig (
  userConfig: BaoConfig,
  env: Env,
): AppContext {
  const logger = createLogger()
  const db = createDb(env)
  const shopify = createShopifyApp(env, db)
  const cache = setupCache(env)

  const context: AppContext = {
    cache,
    db,
    logger,
    shopify,
  }

  if (userConfig.database) {
    context.database = {
      connections: userConfig.database,
    }
  }

  if (userConfig.storage) {
    context.storage = {
      disks: userConfig.storage,
    }
  }

  if (userConfig.queues) {
    context.queues = userConfig.queues
  }

  if (userConfig.listeners) {
    context.listeners = new Map(Object.entries(userConfig.listeners))
  }

  return context
}

export function getQueue (name: string) {
  return getContext().queues?.[name]
}

export function getListenersForEventClass (eventClass: any) {
  const eventName = sanitizeModuleName(eventClass.name)
  return getContext().listeners?.get(eventName) || []
}

export function getStorage () {
  return getContext().storage
}

export function getDatabase () {
  return getContext().database
}

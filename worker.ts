import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
import type { AppLoadContext } from '@remix-run/cloudflare'
import { createRequestHandler, logDevReady } from '@remix-run/cloudflare'
import * as build from '@remix-run/dev/server-build'
// @ts-expect-error
import __STATIC_CONTENT_MANIFEST from '__STATIC_CONTENT_MANIFEST'
import { createShopifyApp } from '~/utils/shopify.server'
import type { Env } from './remix.env'
import { createDb } from '~/utils/db/db.server'
import { setupCache } from '~/utils/cache.server'
import { createLogger } from '~/utils/logger.server'
import { config } from './bao.config'
import { handleQueue } from './app/utils/queue.server'

const MANIFEST = JSON.parse(__STATIC_CONTENT_MANIFEST)
const handleRemixRequest = createRequestHandler(build, process.env.NODE_ENV)

if (process.env.NODE_ENV === 'development') {
  logDevReady(build)
}

export default {
  async fetch (
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    try {
      const url = new URL(request.url)
      const ttl = url.pathname.startsWith('/build/')
        ? 60 * 60 * 24 * 365 // 1 year
        : 60 * 5 // 5 minutes
      return await getAssetFromKV(
        {
          request,
          waitUntil: ctx.waitUntil.bind(ctx)
        } as FetchEvent,
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: MANIFEST,
          cacheControl: {
            browserTTL: ttl,
            edgeTTL: ttl
          }
        }
      )
    } catch (error) {}

    config({ env, request, ctx })

    const logger = createLogger()
    const db = createDb(env)
    const shopify = createShopifyApp(env, db)
    const cache = setupCache(env, logger)

    // This sends a log to our queue
    // let log = {
    //   url: request.url,
    //   method: request.method,
    //   headers: Object.fromEntries(request.headers),
    // }
    // await env.QUEUE.send(log)

    try {
      const loadContext: AppLoadContext = {
        env,
        cache,
        db,
        shopify,
        logger,
      }
      return await handleRemixRequest(request, loadContext)
    } catch (error) {
      console.log(error)
      return new Response('An unexpected error occurred', { status: 500 })
    }
  },

  async queue (batch: MessageBatch, env: Env, context: ExecutionContext) {
    return handleQueue(batch, env, context, config)
  }
}

import { getAssetFromKV, MethodNotAllowedError, NotFoundError } from '@cloudflare/kv-asset-handler'
import { createRequestHandler, logDevReady } from '@remix-run/cloudflare'
import * as build from '@remix-run/dev/server-build'
import __STATIC_CONTENT_MANIFEST from '__STATIC_CONTENT_MANIFEST'
import { config } from './bao.config'
import { handleQueue } from '~/utils/queue.server'
import { setupLoadContext } from '~/utils/cloudflare.server'
import { getContextFromUserConfig, runWithContext } from '~/utils/context.server'
import type { AssetManifestType } from '@cloudflare/kv-asset-handler/src/types'

const MANIFEST = JSON.parse(__STATIC_CONTENT_MANIFEST) as AssetManifestType
const handleRemixRequest = createRequestHandler(build, process.env.NODE_ENV)

if (process.env.NODE_ENV === 'development') {
  logDevReady(build)
}

export default {
  async fetch (
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    try {
      const url = new URL(request.url)
      const ttl = url.pathname.startsWith('/build/')
        ? 60 * 60 * 24 * 365 // 1 year
        : 60 * 5 // 5 minutes
      return await getAssetFromKV(
        {
          request,
          waitUntil: ctx.waitUntil.bind(ctx),
        } as FetchEvent,
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: MANIFEST,
          cacheControl: {
            browserTTL: ttl,
            edgeTTL: ttl,
          },
        },
      )
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof MethodNotAllowedError) {
        // fall through to the remix handler
      } else {
        return new Response('An unexpected error occurred', { status: 500 })
      }
    }

    config({ env, request, ctx })

    const context = getContextFromUserConfig(config({ request, env, ctx }), env)
    context.env = env

    try {
      return await runWithContext(
        context,
        async () => handleRemixRequest(request, setupLoadContext(env, ctx)),
      )
    } catch (error) {
      console.log(error)
      return new Response('An unexpected error occurred', { status: 500 })
    }
  },

  async queue (batch: MessageBatch, env: Env, context: ExecutionContext) {
    return handleQueue(batch, env, context, config)
  },
}

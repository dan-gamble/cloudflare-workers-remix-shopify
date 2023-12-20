import { z } from 'zod'
import type { Env } from '../../remix.env'
import type { Cache, CachifiedOptions } from '@epic-web/cachified'
import { cachified, mergeReporters, verboseReporter } from '@epic-web/cachified'

import { cloudflareKvCacheAdapter } from 'cachified-adapter-cloudflare-kv'
import type { Timings } from '~/utils/timing.server'
import { cachifiedTimingReporter } from '~/utils/timing.server'
import type { Logger } from 'pino'

const cacheMetadataSchema = z.object({
  createdTime: z.number(),
  ttl: z.number().nullable().optional(),
  swr: z.number().nullable().optional()
})

const cacheEntrySchema = z.object({
  metadata: cacheMetadataSchema,
  value: z.unknown()
})

export function setupCache (env: Env, logger: Logger) {
  const cache = cloudflareKvCacheAdapter({
    // @ts-expect-error
    kv: env.KV,
    keyPrefix: 'cache',
    name: 'CloudflareKV'
  })

  const proxy: Cache = {
    name: 'KV Cache',
    async get (key) {
      const result = await cache.get(key)
      const parsedEntry = cacheEntrySchema.safeParse(result)

      if (!parsedEntry.success) {
        logger.error(parsedEntry.error.errors, 'cache.get: parseResult.error.errors')

        return null
      }

      const { metadata, value } = parsedEntry.data
      if (!value) return null

      return {
        metadata,
        value
      }
    },
    set (key, value) {
      return cache.set(key, value)
    },
    delete (key) {
      return cache.delete(key)
    }
  }

  return async function <Value>({
    timings,
    reporter = verboseReporter({
      performance
    }),
    ...options
  }: Omit<CachifiedOptions<Value>, 'cache'> & {
    timings?: Timings
  }): Promise<Value> {
    return await cachified({
      ...options,
      cache: proxy,
      reporter: mergeReporters(cachifiedTimingReporter(timings), reporter)
    })
  }
}

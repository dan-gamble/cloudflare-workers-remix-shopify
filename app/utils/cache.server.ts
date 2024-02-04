import { z } from 'zod'
import type { Cache, CachifiedOptions } from '@epic-web/cachified'
import { cachified, mergeReporters, verboseReporter } from '@epic-web/cachified'

import { cloudflareKvCacheAdapter } from 'cachified-adapter-cloudflare-kv'
import type { Timings } from '~/utils/timing.server'
import { cachifiedTimingReporter } from '~/utils/timing.server'

const cacheMetadataSchema = z.object({
  createdTime: z.number(),
  ttl: z.number().nullable().optional(),
  swr: z.number().nullable().optional()
})

const cacheEntrySchema = z.object({
  metadata: cacheMetadataSchema,
  value: z.unknown()
})

export function setupCache (env: Env) {
  const cache = cloudflareKvCacheAdapter({
    // @ts-ignore
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

  return {
    delete: proxy.delete,
    cachified: async function <Value>({
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
    },
  }
}

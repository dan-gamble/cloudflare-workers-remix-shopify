import { z } from 'zod'
import type { Env } from '../../remix.env'
import type { Cache, CachifiedOptions } from '@epic-web/cachified'
import { cachified, mergeReporters, verboseReporter } from '@epic-web/cachified'

import { cloudflareKvCacheAdapter } from 'cachified-adapter-cloudflare-kv'
import type { Timings } from '~/utils/timing.server'
import { cachifiedTimingReporter } from '~/utils/timing.server'

const cacheEntrySchema = z.object({
  metadata: z.object({
    createdTime: z.number(),
    ttl: z.number().nullable().optional(),
    swr: z.number().nullable().optional(),
  }),
  value: z.unknown(),
})
const cacheQueryResultSchema = z.object({
  metadata: z.string(),
  value: z.string(),
})

export function setupCache(env: Env) {
  const cache = cloudflareKvCacheAdapter({
    // @ts-ignore
    kv: env.KV,
    keyPrefix: 'cache',
    name: 'CloudflareKV',
  })

  const proxy: Cache = {
    name: 'KV Cache',
    get(key) {
      const result = cache.get(key)
      const parseResult = cacheQueryResultSchema.safeParse(result)
      if (!parseResult.success) return null

      const parsedEntry = cacheEntrySchema.safeParse({
        metadata: JSON.parse(parseResult.data.metadata),
        value: JSON.parse(parseResult.data.value),
      })
      if (!parsedEntry.success) return null

      const { metadata, value } = parsedEntry.data
      if (!value) return null

      return {
        metadata,
        value,
      }
    },
    set(key, value) {
      return cache.set(key, value)
    },
    delete(key) {
      return cache.delete(key)
    },
  }

  return async function <Value>({
    timings,
    reporter = verboseReporter({
      performance,
    }),
    ...options
  }: Omit<CachifiedOptions<Value>, 'cache'> & {
    timings?: Timings
  }): Promise<Value> {
    return cachified({
      ...options,
      cache: proxy,
      reporter: mergeReporters(cachifiedTimingReporter(timings), reporter),
    })
  }
}

/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types" />

import type { createShopifyApp } from '~/utils/shopify.server'
import type { Database } from '~/utils/db/db.server'
import type { Cache } from '@epic-web/cachified'
import { setupCache } from '~/utils/cache.server'

interface Env {
  __STATIC_CONTENT: Fetcher;
  SHOPIFY_API_KEY: string;
  SHOPIFY_API_SECRET: string;
  SCOPES: string;
  SHOPIFY_APP_URL: string;
  SHOP_CUSTOM_DOMAIN?: string;
  KV: KVNamespace;
  QUEUE: Queue
  DB: D1Database
}

declare module '__STATIC_CONTENT_MANIFEST' {
  const manifest: string
  export default manifest
}

interface LoadContext {
  env: Env
  cache: ReturnType<typeof setupCache>
  db: Database
  shopify: ReturnType<typeof createShopifyApp>
}

declare var process: {
  env: { NODE_ENV: 'development' | 'production' }
}

declare module "@remix-run/server-runtime" {
  export interface AppLoadContext extends LoadContext {}
}

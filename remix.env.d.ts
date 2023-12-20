/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types" />

import type { createShopifyApp } from '~/utils/shopify.server'
import type { Database } from '~/utils/db/db.server'
import type { setupCache } from '~/utils/cache.server'

import type * as React from 'react'
import type { Logger } from 'pino'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['ui-title-bar']: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
      >
      ['ui-nav-menu']: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
      >
    }
  }

  enum LogLevel {
    Trace = 'trace',
    Debug = 'debug',
    Info = 'info',
    Warn = 'warn',
    Error = 'error',
    Fatal = 'fatal',
    Silent = 'silent'
  }
}

interface Env {
  __STATIC_CONTENT: Fetcher
  SHOPIFY_API_KEY: string
  SHOPIFY_API_SECRET: string
  SCOPES: string
  SHOPIFY_APP_URL: string
  SHOP_CUSTOM_DOMAIN?: string
  KV: KVNamespace
  QUEUE: Queue
  DB: D1Database
  LOG_LEVEL?: LogLevel,
  LOG_FILENAME?: string,
  WORKER_ENV: 'development' | 'production'
}

declare module '__STATIC_CONTENT_MANIFEST' {
  const manifest: string
  export default manifest
}

interface LoadContext {
  env: Env
  cache: ReturnType<typeof setupCache>
  db: Database
  shopify: ReturnType<typeof createShopifyApp>,
  logger: Logger
}

declare let process: {
  env: { NODE_ENV: 'development' | 'production' }
}

declare module '@remix-run/server-runtime' {
  export interface AppLoadContext extends LoadContext {}
}

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

interface LoadContext {
  env: Env
  cache: ReturnType<typeof setupCache>
  db: Database
  shopify: ReturnType<typeof createShopifyApp>,
  logger: Logger
}

declare module '@remix-run/server-runtime' {
  export interface AppLoadContext extends LoadContext {}
}

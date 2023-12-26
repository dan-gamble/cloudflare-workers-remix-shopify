/// <reference types="@cloudflare/workers-types" />

/**
 * This is only used in Workers mode.
 */
declare module '__STATIC_CONTENT_MANIFEST' {
  const value: string
  export default value
}

declare const process: {
  env: {
    NODE_ENV: 'development' | 'production';
  };
}

interface Env {
  /**
   * Only used in Workers mode.
   */
  __STATIC_CONTENT: string;

  SHOPIFY_API_KEY: string
  SHOPIFY_API_SECRET: string
  SCOPES: string
  SHOPIFY_APP_URL: string
  SHOP_CUSTOM_DOMAIN?: string
  KV: KVNamespace
  QUEUE: Queue
  DB: D1Database
  BUCKET: R2Bucket
  CHANNELS: DurableObjectNamespace,
  LOG_LEVEL?: LogLevel,
  LOG_FILENAME?: string
  WORKER_ENV: 'development' | 'production'
}

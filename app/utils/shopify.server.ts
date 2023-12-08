import '@shopify/shopify-api/adapters/cf-worker'

import { restResources } from '@shopify/shopify-api/rest/admin/2023-10'
import {
  AppDistribution,
  DeliveryMethod,
  LATEST_API_VERSION,
  shopifyApp,
} from '@shopify/shopify-app-remix'
import { KVSessionStorage } from '@shopify/shopify-app-session-storage-kv'
import type { Env } from '../../remix.env'

// let shopify: ReturnType<typeof shopifyApp>

export function createShopifyApp (env: Env) {
  const shopify = shopifyApp({
    apiKey: env.SHOPIFY_API_KEY,
    apiSecretKey: env.SHOPIFY_API_SECRET || '',
    apiVersion: LATEST_API_VERSION,
    scopes: env.SCOPES?.split(','),
    appUrl: env.SHOPIFY_APP_URL || '',
    authPathPrefix: '/auth',
    sessionStorage: new KVSessionStorage(env.APP_TEMPLATE_REMIX_DEV),
    distribution: AppDistribution.AppStore,
    restResources,
    webhooks: {
      APP_UNINSTALLED: {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: '/webhooks',
      },
      PRODUCTS_UPDATE: {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: '/webhooks',
      },
    },
    hooks: {
      afterAuth: async ({ session }) => {
        shopify.registerWebhooks({ session })
      },
    },
    future: {
      v3_webhookAdminContext: true,
      v3_authenticatePublic: true,
    },
    ...(
      env.SHOP_CUSTOM_DOMAIN
        ? { customShopDomains: [env.SHOP_CUSTOM_DOMAIN] }
        : {}
    ),
  })

  return shopify

  // export default shopify
  // export const apiVersion = LATEST_API_VERSION
  // export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders
  // export const authenticate = shopify.authenticate
  // export const unauthenticated = shopify.unauthenticated
  // export const login = shopify.login
  // export const registerWebhooks = shopify.registerWebhooks
  // export const sessionStorage = shopify.sessionStorage
}

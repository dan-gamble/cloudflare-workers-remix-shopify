import '@shopify/shopify-api/adapters/cf-worker'

import { restResources } from '@shopify/shopify-api/rest/admin/2024-01'
import {
  AppDistribution,
  DeliveryMethod,
  LATEST_API_VERSION,
  shopifyApp
} from '@shopify/shopify-app-remix'
import { KVSessionStorage } from '@shopify/shopify-app-session-storage-kv'
import type { Database } from '~/utils/db/db.server'
import { shops } from './db/schema.server'
import type { Session } from '@shopify/shopify-api'
import type { ShopifyGraphQLClient } from '~/utils/graphql.server';
import { makeRequest } from '~/utils/graphql.server'
import { invariant } from '@epic-web/invariant'

export function createShopifyApp (env: Env, db: Database) {
  const shopify = shopifyApp({
    apiKey: env.SHOPIFY_API_KEY,
    apiSecretKey: env.SHOPIFY_API_SECRET || '',
    apiVersion: LATEST_API_VERSION,
    scopes: env.SCOPES?.split(','),
    appUrl: env.SHOPIFY_APP_URL || '',
    authPathPrefix: '/auth',
    sessionStorage: new KVSessionStorage(env.KV),
    distribution: AppDistribution.AppStore,
    restResources,
    webhooks: {
      APP_UNINSTALLED: {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: '/webhooks'
      },
    },
    hooks: {
      afterAuth: async ({ admin, session }) => {
        shopify.registerWebhooks({ session })

        await setShopAppId(admin.graphql, db, session)
      }
    },
    future: {
      v3_webhookAdminContext: true,
      v3_authenticatePublic: true,
      unstable_newEmbeddedAuthStrategy: true,
    },
    ...(env.SHOP_CUSTOM_DOMAIN
      ? { customShopDomains: [env.SHOP_CUSTOM_DOMAIN] }
      : {})
  })

  return shopify
}

async function setShopAppId (client: ShopifyGraphQLClient, db: Database, session: Session) {
  const response = await makeRequest(client, `#graphql
    query appId {
      app {
        id
      }
    }
  `)
  invariant(response?.data?.app?.id, 'App ID not found in response')

  await db
    .insert(shops)
    .values({
      appId: response.data.app.id,
      shopDomain: session.shop
    })
    .onConflictDoNothing()
}

import '@shopify/shopify-api/adapters/cf-worker'

import { restResources } from '@shopify/shopify-api/rest/admin/2023-10'
import {
  AppDistribution,
  DeliveryMethod,
  LATEST_API_VERSION,
  shopifyApp
} from '@shopify/shopify-app-remix'
import { KVSessionStorage } from '@shopify/shopify-app-session-storage-kv'
import type { Database } from '~/utils/db/db.server'
import { shops } from './db/schema.server'
import { makeGraphQLRequest } from './graphql.server'
import { AppIdDocument } from '~/generated/graphql'
import type { GraphqlQueryFunction } from '@shopify/shopify-app-remix/build/ts/server/clients/admin/graphql'
import type { Session } from '@shopify/shopify-api'

// let shopify: ReturnType<typeof shopifyApp>

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
      PRODUCTS_UPDATE: {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: '/webhooks'
      }
    },
    hooks: {
      afterAuth: async ({ admin, session }) => {
        shopify.registerWebhooks({ session })

        await setShopAppId(admin.graphql, db, session)
      }
    },
    future: {
      v3_webhookAdminContext: true,
      v3_authenticatePublic: true
    },
    ...(env.SHOP_CUSTOM_DOMAIN
      ? { customShopDomains: [env.SHOP_CUSTOM_DOMAIN] }
      : {})
  })

  return shopify
}

async function setShopAppId (graphql: GraphqlQueryFunction, db: Database, session: Session) {
  const { app } = await makeGraphQLRequest(graphql, {
    document: AppIdDocument
  })

  await db
    .insert(shops)
    .values({
      appId: app!.id,
      shopDomain: session.shop
    })
    .onConflictDoNothing()
}

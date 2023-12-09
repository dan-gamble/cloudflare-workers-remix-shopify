// import { db } from '~/db/config.server'
// import { sessions } from '~/db/schema/session.server'
// import { eq } from 'drizzle-orm'

import type { ActionFunctionArgs } from '@remix-run/cloudflare'
import { shops } from '~/utils/db/schema.server'
import { eq } from 'drizzle-orm'

export async function action ({ context, request }: ActionFunctionArgs) {
  const { shop, topic, payload } =
    await context.shopify.authenticate.webhook(request)

  switch (topic) {
    case 'APP_UNINSTALLED':
      await context.db.delete(shops).where(eq(shops.shopDomain, shop))

      break
    case 'CUSTOMERS_DATA_REQUEST':
    case 'CUSTOMERS_REDACT':
    case 'PRODUCTS_UPDATE':
    case 'SHOP_REDACT':
      await context.env.QUEUE.send({
        topic,
        payload
      })

      break
    default:
      throw new Response('Unhandled webhook topic', { status: 404 })
  }

  throw new Response()
}

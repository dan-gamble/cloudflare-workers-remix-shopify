// import { db } from '~/db/config.server'
// import { sessions } from '~/db/schema/session.server'
// import { eq } from 'drizzle-orm'

import type { ActionFunctionArgs } from "@remix-run/cloudflare"

export async function action ({ context, request }: ActionFunctionArgs) {
  const { topic, payload } = await context.shopify.authenticate.webhook(request)

  switch (topic) {
    case 'APP_UNINSTALLED':
    case 'CUSTOMERS_DATA_REQUEST':
    case 'CUSTOMERS_REDACT':
    case 'PRODUCTS_UPDATE':
    case 'SHOP_REDACT':
      await context.env.QUEUE.send({
        topic,
        payload,
      })

      break
    default:
      throw new Response('Unhandled webhook topic', { status: 404 })
  }

  throw new Response()
}

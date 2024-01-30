import type { ActionFunctionArgs } from '@remix-run/cloudflare'
import { getContext } from '~/utils/context.server'
import { AppUninstalledJob } from '~/jobs/app-uninstalled-job'

export async function action ({ request }: ActionFunctionArgs) {
  const context = getContext()

  const { shop, topic, payload } =
    await context.shopify.authenticate.webhook(request)

  switch (topic) {
    case 'APP_UNINSTALLED':
      await AppUninstalledJob.dispatch(shop)

      break
    case 'CUSTOMERS_DATA_REQUEST':
    case 'CUSTOMERS_REDACT':
    case 'SHOP_REDACT':
      await context?.env?.QUEUE?.send({
        topic,
        payload
      })

      break
    default:
      throw new Response('Unhandled webhook topic', { status: 404 })
  }

  throw new Response()
}

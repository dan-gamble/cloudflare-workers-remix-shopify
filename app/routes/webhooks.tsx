import type { ActionFunctionArgs } from '@remix-run/cloudflare'
import { AppUninstalledJob } from '~/jobs/app-uninstalled-job'
import { getContext } from '~/utils/context.server'

export async function action ({ request }: ActionFunctionArgs) {
  const context = getContext()

  const { shop, topic, payload } =
    await context.shopify.authenticate.webhook(request)

  switch (topic) {
    // @ts-ignore
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

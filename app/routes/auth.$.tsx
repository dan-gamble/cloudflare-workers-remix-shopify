import type { LoaderFunctionArgs } from '@remix-run/cloudflare'

export async function loader({ context, request }: LoaderFunctionArgs) {
  await context.shopify.authenticate.admin(request)

  return null
}

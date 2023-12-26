import type { LoaderFunctionArgs } from '@remix-run/cloudflare'
import { handleWebSockets } from '~/utils/websockets.server'

export async function loader ({ context, request }: LoaderFunctionArgs) {
  const { session } = await context.shopify.authenticate.admin(request)

  return handleWebSockets(request, { session })
}

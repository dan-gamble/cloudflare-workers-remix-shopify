import type { ActionFunctionArgs} from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare'
import { getContext } from '~/utils/context.server'

export async function action ({ request }: ActionFunctionArgs) {
  const { shopify } = getContext()
  const { session } = await shopify.authenticate.admin(request)

  await dismissCustomFontsBanner(session.shop)

  return json({ ok: true })
}

function getCacheKey (shop: string) {
  return `${shop}:custom-fonts-banner-has-been-dismissed`
}

export async function dismissCustomFontsBanner (shop: string) {
  const { cache } = getContext()

  await cache.set(getCacheKey(shop), {
    value: 'true',
    metadata: {
      ttl: 1000 * 60 * 60 * 24,
      createdTime: Date.now(),
    }
  })
}

export async function hasDismissedCustomFontsBanner (shop: string): Promise<boolean> {
  const { cache } = getContext()

  const data = await cache.get(getCacheKey(shop))

  return data?.value === 'true'
}

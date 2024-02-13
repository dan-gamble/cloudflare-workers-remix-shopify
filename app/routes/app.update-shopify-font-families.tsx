import { getContext } from '~/utils/context.server'
import { shopifyFontFamilies } from '~/utils/db/schema.server'
import { json } from '@remix-run/cloudflare'

type ShopifyFont = {
  default_variant_handle: string;
  name: string;
  performant?: boolean;
  provider: string;
  variants: Array<{
    fallbacks: string;
    family: string;
    handle: string;
    name: string;
    provider: string;
    style: string;
    weight: string;
  }>;
}

export async function action () {
  const { db } = getContext()

  const shopifyFonts = await getShopifyFontFamilies()

  await db.delete(shopifyFontFamilies)

  for (const font of shopifyFonts) {
    await db.insert(shopifyFontFamilies)
      .values({
        defaultVariantHandle: font.default_variant_handle,
        name: font.name,
        performant: font?.performant ?? false,
        provider: font.provider,
        variants: font.variants.map(variant => ({
          fallbacks: variant.fallbacks,
          family: variant.family,
          handle: variant.handle,
          name: variant.name,
          provider: variant.provider,
          style: variant.style,
          weight: variant.weight
        }))
      })
  }

  return json({ status: 'ok' })
}

async function getShopifyFontFamilies () {
  const json = await fetch('https://shopify.dev/json/shopify_font_families.json').then(res => res.json()) as {
    font_families: ShopifyFont[]
  }

  return json.font_families
}

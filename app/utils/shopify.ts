export function normaliseShopName (shopName: string) {
  return shopName.replace(/\.myshopify\.com$/, '')
}

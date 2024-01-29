```typescript jsx
 export async function loader ({ request }: LoaderFunctionArgs) {
  const { cache, db, shopify } = getContext()

  const { session } = await shopify.authenticate.admin(request)

  const timings = makeTimings('index')

  // This doesn't need to be cached, but it's a good example of how to use the cache with timings
  const shop = await time(
    () =>
      cache({
        ttl: 1000 * 10,
        key: `index:shop:${session.shop}`,
        async getFreshValue () {
          const [shop] = await db.select().from(shops).where(eq(shops.shopDomain, session.shop)).limit(1)

          return shop
        },
      }),
    { timings, type: 'find shop' }
  )

  return json(
    { shop },
    {
      headers: { 'Server-Timing': timings.toString() }
    }
  )
}

export const headers: HeadersFunction = ({ loaderHeaders, parentHeaders }) => {
  return {
    'Server-Timing': combineServerTimings(parentHeaders, loaderHeaders)
  }
}
```

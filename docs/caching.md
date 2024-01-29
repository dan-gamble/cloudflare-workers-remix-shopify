If you're using `cache` to cache a value that is specific to a store ensure that the `key` is unique to that store. For example, if you're caching a value that is specific to a store's `shop` you should include the `shop` in the `key`:

```typescript jsx
const { session } = await shopify.authenticate.admin(request)

const notificationStyles = await cache({
  ttl: 1000 * 10,
  key: `${session.shop}:notificationStyles`,
  async getFreshValue () {
    return makeRequest(admin.graphql, shopMetafieldQuery, {
      variables: {
        namespace: METAFIELD_NAMESPACE,
        key: METAFIELD_KEY,
      },
    })
  },
})
```

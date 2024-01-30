## ./bin/setup.mjs

1. `npm i`
2. `npm run setup`
3. `npm run shopify:config:link` to link to the development version of the app
4. Update the `scopes` in `shopify.app.toml` to be `scopes=write_products`
5. `npm run shopify:config:push`
6. `npm run dev`

## Deployment

1. `npm run shopify:config:link` to link to the product app
2. `npm run deploy`
3. `npm run migrate`
4. `npm run shopify:env show`
   1. Note down the `SHOPIFY_API_KEY`, `SHOPIFY_API_SECRET` and `SCOPES` values
   2. You may need to update your `scopes` in the `.toml` file, push them, then do this step again to ensure your scopes
      are up to date
   3. Update the `application_url` and `redirect_urls` in the linked `.toml` file
   4. `npm run shopify:config:push`
5. `npx wrangler secret put SHOPIFY_API_KEY --experimental-json-config`
   1. Then enter the value of `SHOPIFY_API_KEY` from the previous step
6. `npx wrangler secret put SHOPIFY_API_SECRET --experimental-json-config`
   1. Then enter the value of `SHOPIFY_API_SECRET` from the previous step
7. `npx wrangler secret put SCOPES --experimental-json-config`
   1. Then enter the value of `SCOPES` from the previous step
8. `npx wrangler secret put SHOPIFY_APP_URL --experimental-json-config`
   1. Then enter the published URL that you got from the `npm run deploy` step

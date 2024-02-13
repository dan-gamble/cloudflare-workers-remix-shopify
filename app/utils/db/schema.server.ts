import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'

export const shops = sqliteTable(
  'shops',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    shopDomain: text('shop_domain').notNull(),

    appId: text('app_id').notNull(),
  },
  table => {
    return {
      shopIndex: uniqueIndex('index_sessions_on_shop').on(table.shopDomain),
    }
  },
)

export const shopifyFontFamilies = sqliteTable(
  'shopify_font_families',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    defaultVariantHandle: text('default_variant_handle').notNull(),
    name: text('name').notNull(),
    performant: integer('performant', { mode: 'boolean' }).notNull(),
    provider: text('provider').notNull(),
    variants: text('variants', { mode: 'json' })
      .$type<Array<{
        fallbacks: string,
        family: string,
        handle: string,
        name: string,
        provider: string,
        style: string,
        weight: string,
      }>>()
      .notNull(),
  },
)

export type ShopifyFontFamily = typeof shopifyFontFamilies.$inferSelect

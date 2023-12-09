import {
  integer,
  sqliteTable,
  text,
  uniqueIndex
} from 'drizzle-orm/sqlite-core'

export const shops = sqliteTable(
  'shops',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    shopDomain: text('shop_domain').notNull(),

    appId: text('app_id').notNull()
  },
  table => {
    return {
      shopIndex: uniqueIndex('index_sessions_on_shop').on(table.shopDomain)
    }
  }
)

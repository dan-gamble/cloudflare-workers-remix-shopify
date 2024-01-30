# Database

## Drizzle
We've opted to use [Drizzle](https://orm.drizzle.team/) as our ORM. It's a very lightweight ORM that allows us to write raw SQL queries when we need to, but also provides a nice API for writing queries in a more object-oriented way. It also allows us to introduce a level of type safety to our queries, which is a huge plus.

Below is an example of a table definition using Drizzle:

```typescript
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
```

## Database Migrations
After making changes to the table structure of the database you'll want to run the `npm run db:generate` command to generate a migration file. This will create a file in the `app/utils/db/migrations` directory that will contain the SQL statements needed to update the database to the new schema. You can then run `npm run db:migrate` to run the migration and update the database.

#### Note
You will need to update the `npm run db:migrate` command and add the newly generated file. This is because the command will only run migrations that have not yet been run. If you don't add the file to the command it will not run the migration.

## Shopify
Since we're building on Shopify we get access to things like metafields & metaobjects. These should be reached for when storing data over the database as it will provide a better experience for the merchant. For example, if we were to store the data in the database wouldn't have access to that data in liquid, Shopify Functions, UI extensions, etc. If we store the data in metafields we can access it in all of those places.

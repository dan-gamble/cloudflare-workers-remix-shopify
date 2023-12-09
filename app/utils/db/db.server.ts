import { drizzle } from 'drizzle-orm/d1'
import type { Env } from '../../../remix.env'

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
// })
//
// client.connect()
//   .then(() => {
//     migrate(drizzle(client), {
//       migrationsFolder: './app/db/migrations',
//     })
//   })
//
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   keepAlive: true,
// })

export function createDb(env: Env) {
  return drizzle(env.DB)
}

export type Database = ReturnType<typeof createDb>

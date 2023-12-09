import type { Config } from 'drizzle-kit'

export default {
  schema: './app/utils/db/schema.server.ts',
  out: './app/utils/db/migrations'
} satisfies Config

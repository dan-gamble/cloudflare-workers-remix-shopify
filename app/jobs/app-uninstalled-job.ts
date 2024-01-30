import { Job } from '~/utils/jobs.server'
import { getContext } from '~/utils/context.server'
import { shops } from '~/utils/db/schema.server'
import { eq } from 'drizzle-orm'

export class AppUninstalledJob extends Job {
  constructor (public shop: string) {
    super()
  }

  async handle () {
    const context = getContext()

    await context.db.delete(shops).where(eq(shops.shopDomain, this.shop))
  }
}

Job.register(AppUninstalledJob)

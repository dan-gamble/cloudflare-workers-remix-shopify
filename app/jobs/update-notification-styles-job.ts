import { Job } from '~/utils/jobs.server'
import { getContext } from '~/utils/context.server'
import type { NotificationStyles} from '~/routes/app.notification-styles/constants';
import {
  METAFIELD_KEY,
  METAFIELD_NAMESPACE
} from '~/routes/app.notification-styles/constants'

export class UpdateNotificationStylesJob extends Job {
  constructor (public shopName: string, public value: NotificationStyles['value']) {
    super()
  }

  async handle () {
    const context = getContext()
    const { admin, session } = await context.shopify.unauthenticated.admin(this.shopName)

    const metafield = new admin.rest.resources.Metafield({ session: session })
    metafield.namespace = METAFIELD_NAMESPACE
    metafield.key = METAFIELD_KEY
    metafield.type = 'multi_line_text_field'
    metafield.value = this.value

    await metafield.save({ update: true })
  }
}

Job.register(UpdateNotificationStylesJob)

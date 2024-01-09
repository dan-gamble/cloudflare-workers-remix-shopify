import { Job } from '~/utils/jobs.server'

export class UpdateNotificationStylesJob extends Job {
  constructor (public value: string) {
    super()
  }

  async handle () {
  }
}

Job.register(UpdateNotificationStylesJob)

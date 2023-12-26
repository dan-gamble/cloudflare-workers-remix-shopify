import { Job } from '~/utils/jobs.server'

export class SayHelloJob extends Job {
  constructor (public message: string) {
    super()
  }

  async handle () {
    console.log(`${this.message} from SayHelloJob!`)
  }
}

Job.register(SayHelloJob)

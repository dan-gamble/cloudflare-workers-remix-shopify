import { Job } from '~/utils/jobs.server'
import { AppLoadContext } from '@remix-run/cloudflare'

export class SayHelloJob extends Job {
  constructor (public message: string) {
    super()
  }

  async handle () {
    console.log(`${this.message} from SayHelloJob!`)
  }
}

Job.register(SayHelloJob)

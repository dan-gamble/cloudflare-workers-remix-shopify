import { Job } from '~/jobs/job'

export class SayHelloJob extends Job {
  constructor (public name: string) {
    super()
  }

  async handle () {
    console.log(`Hello, ${this.name}!`)
  }
}

Job.register(SayHelloJob)

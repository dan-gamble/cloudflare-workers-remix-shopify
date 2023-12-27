import { serializeArguments } from '~/utils/serialize.server'
import type { MessagePayload } from '~/utils/queue.server'
import { registerJob } from '~/utils/registry.server'
import { getQueue } from '~/utils/context.server'

export abstract class Job {
  /**
   * The name of the queue on which to dispatch this job.
   */
  queue = 'default'

  constructor () {}

  abstract handle (context: ExecutionContext): Promise<void>;

  /**
   * The private instance method we use to dispatch a job onto the queue.
   */
  private async dispatch (...args: any[]) {
    const queueName = this.queue ?? 'default'
    const queue = getQueue(queueName)

    if (!queue) {
      throw new Error(`Queue ${queueName} not found.`)
    }

    await queue.send(this.toQueuePayload(args))
  }

  /**
   * Dispatch the job with the given arguments.
   */
  static async dispatch<T extends Job> (
    this: new (...arg: any[]) => T,
    ...args: any[]
  ) {
    const job = new this(...args)
    return job.dispatch(...args)
  }

  /**
   * Convert the constructor arguments to a payload that can be sent to the queue.
   */
  private toQueuePayload (constructorArgs: any[]): MessagePayload {
    return {
      job: this.constructor.name,
      payload: serializeArguments(constructorArgs),
    }
  }

  static register (job: any) {
    registerJob(job)
  }
}

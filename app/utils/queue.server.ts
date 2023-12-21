import { Job } from '~/jobs/job'
import { hydrateArguments } from '~/utils/serialize.server'
import type { defineConfig} from '~/utils/config.server';
import { getJob } from '~/utils/config.server'

export interface MessagePayload {
  job?: string;
  event?: string;
  payload: any;
}

export async function handleQueue<Env> (
  batch: MessageBatch,
  env: Env,
  ctx: ExecutionContext,
  config: ReturnType<typeof defineConfig<Env>>,
) {
  /**
   * Set the user config into the singleton context.
   * TODO: Replace this with AsyncLocalStorage when available.
   */
  config({ env, ctx })

  return await Promise.all(
    batch.messages.map((message) => handleQueueMessage(message)),
  )
}

async function handleQueueMessage (message: Message) {
  const instance = await hydrateInstanceFromQueuePayload(
    message.body as MessagePayload,
  )

  if (instance instanceof Job) {
    await instance.handle()
    return
  }

  // if (instance instanceof Event) {
  //   dispatchEvent(instance)
  //
  //   return
  // }

  throw new Error(`Could not hydrate instance from queue payload.`)
}

/**
 * Create an instance of a Job or Event class from a Queue message payload.
 */
async function hydrateInstanceFromQueuePayload (payload: MessagePayload) {
  // if (payload.event) {
  //   const eventClass = getEvent(payload.event) as Constructor<Event>
  //   const constructorArgs = await hydrateArguments(payload.payload)
  //   const event = new eventClass(...constructorArgs)
  //
  //   return event
  // }

  if (payload.job) {
    const jobClass = getJob(payload.job)
    if (typeof jobClass === 'undefined') throw new Error(`Job ${payload.job} not found.`)
    const constructorArgs = await hydrateArguments(payload.payload)

    return new jobClass(...constructorArgs)
  }

  throw new Error(`Job payload does not contain a job or event.`)
}

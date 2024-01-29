import { sanitizeModuleName } from './string.server'
import { serializeArguments } from '~/utils/serialize.server'
import { registerEvent } from '~/utils/registry.server'
import { getContext, getListenersForEventClass, getQueue } from '~/utils/context.server'

export class Event {
  public static shouldQueue = false
  public static queue = 'default'

  public static async dispatch<T extends Event> (
    this: { new (...arg: any[]): T; shouldQueue: boolean; queue: string },
    ...args: any[]
  ): Promise<void> {
    const event = new this(...args)
    if (this.shouldQueue) {
      /**
       * We can't use an internal Job for this, because that creates circular reference issues between
       * `job.ts` and `event.ts`. Instead, we stick it directly on the queue.
       */
      const queueName = this.queue ?? 'default'
      const queue = getQueue(queueName)

      if (!queue) {
        throw new Error(`Queue ${queueName} not found.`)
      }

      const context = getContext()

      if (typeof context.ctx !== 'undefined') {
        context.ctx.waitUntil(queue.send({
          event: sanitizeModuleName(this.name),
          payload: serializeArguments(args),
        }))
      } else {
        queue.send({
          event: sanitizeModuleName(this.name),
          payload: serializeArguments(args),
        })
      }
    } else {
      dispatchEvent(event)
    }
  }

  public static register (event: any): void {
    registerEvent(event)
  }
}

export function dispatchEvent (event: any): void {
  // console.log(`dispatching`, sanitizeModuleName(event.constructor.name));

  getListenersForEventClass(event.constructor).forEach((listener) => {
    const instance = new listener()
    instance.handle(event)
  })
}

import { Event } from '~/utils/events.server'

export class SayHelloEvent extends Event {
  static shouldQueue = true

  constructor (public message: string) {
    super()
  }

  broadcastTo (): string {
    return 'default'
  }
}

Event.register(SayHelloEvent)

import { Event } from '~/utils/events.server'

export class SayHelloEvent extends Event {
  constructor (public message: string) {
    super()
  }

  broadcastTo (): string {
    return 'default'
  }
}

Event.register(SayHelloEvent)

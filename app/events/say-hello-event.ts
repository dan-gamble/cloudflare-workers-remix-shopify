import { Event } from '~/utils/events.server'

export class SayHelloEvent extends Event {
  constructor (public message: string) {
    super()
  }
}

Event.register(SayHelloEvent)

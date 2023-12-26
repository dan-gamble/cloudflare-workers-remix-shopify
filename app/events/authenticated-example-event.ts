import { Event } from '~/utils/events.server'
import { normaliseShopName } from '~/utils/shopify'

export class AuthenticatedExampleEvent extends Event {
  constructor (public message: string, public shopName: string) {
    super()
  }

  broadcastTo (): string {
    return `shops.${normaliseShopName(this.shopName)}`
  }
}

Event.register(AuthenticatedExampleEvent)

import { Listener } from '~/utils/listeners.server'
import type { SayHelloEvent } from '~/events/say-hello-event'

export class SayHelloListener extends Listener {
  handle (event: SayHelloEvent) {
    console.log(`${event.message} from SayHelloListener!`)
  }
}

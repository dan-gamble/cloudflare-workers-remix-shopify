import { Listener } from '~/utils/listeners.server'
import type { AuthenticatedExampleEvent } from '~/events/authenticated-example-event'

export class AuthenticatedExampleListener extends Listener {
  handle (event: AuthenticatedExampleEvent) {
    console.log(`${event.message} from AuthenticatedExampleListener!`)
  }
}

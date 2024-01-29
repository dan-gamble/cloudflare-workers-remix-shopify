### Event
```typescript jsx
export class SayHelloEvent extends Event {
  constructor (public message: string) {
    super()
  }

  broadcastTo (): string {
    return 'default'
  }
}
```

### Listener
```typescript jsx
import { Listener } from '~/utils/listeners.server'
import type { SayHelloEvent } from '~/events/say-hello-event'

export class SayHelloListener extends Listener {
  handle (event: SayHelloEvent) {
    console.log(`${event.message} from SayHelloListener!`)
  }
}
```

### Register
**bao.config.ts**
```typescript jsx
import { SayHelloListener } from '~/listeners/say-hello-listener'

export const config = defineConfig<Env>(context => {
  return {
    // ...
    listeners: {
      SayHelloEvent: [SayHelloListener],
    }
  }
})
```

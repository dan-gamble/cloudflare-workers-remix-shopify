**say-hello-job.ts**
```typescript jsx
import { Job } from '~/utils/jobs.server'

export class SayHelloJob extends Job {
  constructor (public message: string) {
    super()
  }

  async handle () {
    console.log(`${this.message} from SayHelloJob!`)
  }
}

Job.register(SayHelloJob)
```

**Usage**

```typescript jsx
import { SayHelloJob } from '~/jobs/say-hello-job'
import { LoaderFunctionArgs } from '@remix-run/cloudflare'

export async function loader ({ request }: LoaderFunctionArgs) {
  await SayHelloJob.dispatch('Hello')
  
  return new Response('Hello World!')
}
```

### Registering a job

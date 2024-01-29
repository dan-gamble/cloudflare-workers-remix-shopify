import { defineConfig } from '~/utils/config.server'
import { SayHelloListener } from '~/listeners/say-hello-listener'

export const config = defineConfig<Env>(context => {
  return {
    database: {
      default: context.env.DB,
    },
    queues: {
      default: context.env.QUEUE,
    },
    storage: {
      default: {
        binding: context.env.BUCKET,
        publicPath: '/storage/media',
      },
    },
    listeners: {
      SayHelloEvent: [SayHelloListener],
    },
  }
})

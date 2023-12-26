import { defineConfig } from '~/utils/config.server'
import { SayHelloListener } from '~/listeners/say-hello-listener'
import type { Session } from '@shopify/shopify-api'
import { AuthenticatedExampleListener } from '~/listeners/authenticated-example-listener'
import { normaliseShopName } from '~/utils/shopify'

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
    channels: {
      default: {
        binding: context.env.CHANNELS,
      },
      'shops.*': {
        binding: context.env.CHANNELS,
        async authorize (session: Session, shopName: string) {
          return normaliseShopName(session.shop) === normaliseShopName(shopName)
        },
      },
    },
    listeners: {
      AuthenticatedExampleEvent: [AuthenticatedExampleListener],
      SayHelloEvent: [SayHelloListener],
    },
  }
})

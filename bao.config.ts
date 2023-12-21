import { defineConfig } from './app/utils/config.server'
import type { Env } from './remix.env'

export const config = defineConfig<Env>(context => {
  return {
    database: {
      default: context.env.DB
    },
    queues: {
      default: context.env.QUEUE,
    }
  }
})

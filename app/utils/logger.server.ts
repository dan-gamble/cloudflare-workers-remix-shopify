import pino from 'pino'

export function createLogger () {
  return pino({
    level: 'trace',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: false,
        // can make this false for non-blocking calls, but for local dev
        // I find it's better to have the real time calls to the logger.
        sync: true,
      },
    },
  })

  // if (env.WORKER_ENV === 'development') {
  //   console.log('Setting up logger for development')
  //
  //   return pino({
  //     level: 'trace',
  //     transport: {
  //       target: 'pino-pretty',
  //       options: {
  //         colorize: false,
  //         // can make this false for non-blocking calls, but for local dev
  //         // I find it's better to have the real time calls to the logger.
  //         sync: true,
  //       },
  //     },
  //   })
  // } else {
  //   // TODO: Setup logger for production. Use KV or R2 or something?
  //   // const { multistream } = pino
  //   // const level = ENV.LOG_LEVEL ? ENV.LOG_LEVEL : 'info'
  //   //
  //   // const streams = [{ stream: process.stdout }]
  //   //
  //   // if (ENV.LOG_FILENAME) {
  //   //   // @ts-ignore
  //   //   streams.push({ stream: fs.createWriteStream(ENV.LOG_FILENAME) })
  //   // }
  //   // // can also turn on sync: false
  //   // logger = pino({ level }, multistream(streams))
  // }
}

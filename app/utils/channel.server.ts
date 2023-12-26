import type { ChannelConfig} from '~/utils/config.server';
import { getChannel, getChannelNames } from '~/utils/config.server'

interface Session {
  webSocket: WebSocket
  id: string
  quit?: boolean
  shop?: ShopPayload
}

interface ShopPayload {
  name?: string
  presenceData?: any
}

type Env = unknown

export class Channel implements DurableObject {
  sessions: Session[] = []
  storage: DurableObjectStorage
  env: Env

  constructor (controller: any, env: Env) {
    this.storage = controller.storage
    this.env = env
  }

  async fetch (request: Request) {
    if (request.method === 'POST') {
      const message = await request.json()

      this.broadcast(message)

      return new Response('ok')
    }

    if (request.method !== 'GET') {
      return new Response('Method not allowed', { status: 405 })
    }

    if (request.headers.get('Upgrade') !== 'websocket') {
      return new Response('expected websocket', { status: 400 })
    }

    const pair = new WebSocketPair()

    const url = new URL(request.url)
    const shop: ShopPayload = url.searchParams.has('shop')
      ? { name: url.searchParams.get('shop') }
      : JSON.parse('{}')

    await this.handleSession(pair[1], shop)

    // Now we return the other end of the pair to the client.
    return new Response(null, { status: 101, webSocket: pair[0] })
  }

  async handleSession (webSocket: WebSocket, shop?: ShopPayload) {
    // @ts-ignore
    webSocket.accept()

    // Create our session and add it to the sessions list.
    const session: Session = {
      webSocket,
      shop: shop,
      id: shop?.name || 'anonymous',
    }
    this.sessions.push(session)

    let receivedInitialMessage = false

    webSocket.addEventListener('message', async (message: MessageEvent) => {
      try {
        let data = JSON.parse(message.data)

        if (!receivedInitialMessage) {
          // Broadcast to all other connections that this user has joined.
          if (session.shop?.presenceData) {
            this.broadcast({ joined: session.shop.presenceData })
          }

          receivedInitialMessage = true

          return
        }

        data = { message: `${data.message}` }

        this.broadcast(JSON.stringify(data))
      } catch (e: any) {
        webSocket.send(JSON.stringify({ error: e.message }))
      }
    })

    // On "close" and "error" events, remove the WebSocket from the sessions list and broadcast
    // a quit message.
    let closeOrErrorHandler = () => {
      session.quit = true

      this.sessions = this.sessions.filter((member) => member !== session)

      if (session.shop?.presenceData) {
        this.broadcast({ quit: session.shop.presenceData })
      }
    }

    webSocket.addEventListener('close', closeOrErrorHandler)
    webSocket.addEventListener('error', closeOrErrorHandler)
  }

  broadcast (message: any) {
    if (typeof message !== 'string') {
      message = JSON.stringify(message)
    }

    // Iterate over all the sessions sending them messages.
    let quitters: Session[] = []

    this.sessions = this.sessions.filter((session) => {
      try {
        session.webSocket.send(message)

        return true
      } catch (err) {
        // Whoops, this connection is dead. Remove it from the list and arrange to notify
        // everyone below.
        session.quit = true

        quitters.push(session)

        return false
      }
    })

    quitters.forEach((quitter) => {
      if (quitter.shop?.presenceData) {
        this.broadcast({ quit: quitter.shop.presenceData })
      }
    })
  }
}

export function getConfigForChannelName (
  channelName: string,
): [channelConfig: ChannelConfig | undefined, channelName: string] {
  const defaultChannel = getChannel('default')
  const specificChannelName = channelNameToConfigName(
    channelName,
    getChannelNames(),
  )

  return specificChannelName
    ? [getChannel(specificChannelName), specificChannelName]
    : [defaultChannel, 'default']
}

export function getBindingForChannelName (channelName: string) {
  const defaultChannel = getChannel('default')
  const [config] = getConfigForChannelName(channelName)

  return config?.binding || defaultChannel?.binding
}

/**
 * Given that the user may have defined channel names with period-separated *,
 * this function attempts to match a given channel name to one of the channel
 * names defined in the config.
 *
 * We use a regex to replace all asterisks with match patterns, then we use
 * the match method to find the first match.
 */
export function channelNameToConfigName (
  channelName: string,
  channelNames: string[],
): string {
  const exactMatch = channelNames.find((name) => name === channelName)

  if (exactMatch) {
    return exactMatch
  }

  const channelNamesWithRegexes = channelNames.map((name) => {
    return {
      name,
      regex: new RegExp(name.replace(/\*/g, '[^.]+')),
    }
  })

  const matches = channelNamesWithRegexes.filter((name) => {
    return name.regex.exec(channelName)
  })

  return matches.sort(
    (a, b) => b.name.split('.').length - a.name.split('.').length,
  )[0]?.name
}

import { invariant } from '@epic-web/invariant'
import { getBindingForChannelName, getConfigForChannelName } from '~/utils/channel.server'
import type { Session } from '@shopify/shopify-api'

interface ShopPayload {
  shopName?: string
  presenceData?: any
}

export async function handleWebSockets (
  request: Request,
  {
    session,
    channelName: specifiedChannelName,
  }: {
    channelName?: string
    session?: Session
  } = {},
) {
  const url = new URL(request.url)
  const channelNameFromPath = url.pathname.split('/').pop()

  const channelName = specifiedChannelName || channelNameFromPath

  invariant(channelName, 'Channel name is required')

  const [config, configName] = getConfigForChannelName(channelName)

  if (config && config.authorize) {
    if (!session) {
      throw new Error(
        'You must provide `session` to `handleWebSockets` in order to authorize the request',
      )
    }

    // Get the channel configuration name with asterisks and convert them to real values
    const dynamicValues = getValuesFromChannelName(channelName, configName)

    // Call the authorize function with the user + the values as arguments
    const isAuthorized = await config.authorize(session, ...dynamicValues)

    if (!isAuthorized) {
      return new Response('Unauthorized', { status: 401 })
    }
  }

  const binding = getBindingForChannelName(channelName)

  if (!binding) {
    throw new Error(
      `No channel binding found for "${channelName}". Please update your bao.config.`,
    )
  }

  const shopPayload: ShopPayload = {
    shopName: session?.shop,
  }

  if (config?.presence) {
    if (!session) {
      throw new Error(
        'You must provide `session` to `handleWebSockets` in order to authorize the request',
      )
    }

    const dynamicValues = getValuesFromChannelName(channelName, configName)

    shopPayload.presenceData = await config.presence(session, ...dynamicValues)
  }

  /**
   * Get the Durable Object instance from the namespace by the channelName.
   */
  const id = binding.idFromName(channelName);
  const channel = binding.get(id)

  const newUrl = new URL(url)
  newUrl.searchParams.set('shop', JSON.stringify(shopPayload))

  return channel.fetch(newUrl.toString(), request)
}

function getValuesFromChannelName (channelName: string, configName: string) {
  const inputValues = channelName.split('.')
  const configValues = configName.split('.')
  const dynamicValues = configValues
    .map((value, index) => {
      if (value === '*') {
        return inputValues[index]
      }
    })
    .filter(Boolean) as string[]

  return dynamicValues
}

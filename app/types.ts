import type { ShopLocalisationQuery } from '~/generated/graphql'

export type AppContext = {
  shop: ShopLocalisationQuery['shop']
}

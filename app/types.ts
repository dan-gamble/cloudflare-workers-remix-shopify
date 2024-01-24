import type { ShopLocalisationQuery } from '~/types/admin.generated'

export type AppContext = {
  shop: ShopLocalisationQuery['shop']
}

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

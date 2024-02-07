import type { ShopLocalisationQuery } from '~/types/admin.generated'
import type { LoaderFunctionArgs, TypedResponse } from '@remix-run/cloudflare'

export type AppContext = {
  shop: ShopLocalisationQuery['shop']
}

export type ExtractSuccessResponseType<T> = T extends TypedResponse<{ error: string }>
  ? never
  : T extends TypedResponse<infer U> ? U : never
export type ResolvedReturnType<T extends (args: LoaderFunctionArgs) => Promise<any>> = Awaited<ReturnType<T>>

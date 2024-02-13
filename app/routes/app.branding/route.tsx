import type { HeadersFunction, LoaderFunctionArgs } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { getContext } from '~/utils/context.server'
import { shopifyFontFamilies } from '~/utils/db/schema.server'
import { Outlet, useLoaderData, useOutletContext } from '@remix-run/react'
import { makeRequest } from '~/utils/graphql.server'
import { invariant } from '@epic-web/invariant'
import { checkoutProfilesQuery } from '~/routes/app.branding/graphql/queries/checkout-profiles-query'
import { brandingQuery } from '~/routes/app.branding/graphql/queries/branding-query'
import type {
  CheckoutBrandingQuery,
  CheckoutProfileFragmentFragment,
  CustomFontFragment,
} from '~/types/admin.generated'
import { useBrandingForms } from '~/routes/app.branding._index/hooks/use-branding-forms'
import { combineServerTimings, makeTimings, time } from '~/utils/timing.server'
import { hasDismissedCustomFontsBanner } from '~/routes/app.branding.dismiss-custom-fonts-banner'
import type { CurrentCheckoutBranding } from '~/routes/app.branding/types'

type FontDataContext = {
  shopifyFonts: Array<{ name: string }>;
  customFonts: CustomFontFragment[];
}

type Enum = {
  name?: string | null | undefined;
  enumValues: Array<{ name: string }>;
}

type EnumsContext = {
  background: Enum;
  backgroundStyles: Enum;
  border: Enum;
  borderStyle: Enum;
  borderWidth: Enum;
  colorSelection: Enum;
  colorSchemeSelection: Enum;
  cornerRadius: Enum;
  fontLoadingStrategies: Enum;
  footerPosition: Enum;
  globalCornerRadius: Enum;
  headerAlignment: Enum;
  headerPosition: Enum;
  labelPosition: Enum;
  shadow: Enum;
  simpleBorder: Enum;
  spacing: Enum;
  spacingKeyword: Enum;
  typographyFont: Enum;
  typographyKerning: Enum;
  typographyLetterCase: Enum;
  typographySize: Enum;
  typographyWeight: Enum;
}

type BrandingContext = {
  profileId: string;
  profiles: CheckoutProfileFragmentFragment[];
  current: CheckoutBrandingQuery['checkoutBranding'];
}

type BrandingData = {
  fonts: FontDataContext;
  enums: EnumsContext;
  branding: BrandingContext;
  sessionToken: string | undefined;
}

type CheckoutBrandingContext = {
  data: BrandingData;
  branding: ReturnType<typeof useBrandingForms>;
  state: {
    hasDismissedCustomFontsBanner: boolean;
  }
}

export async function loader ({ request }: LoaderFunctionArgs) {
  const timings = makeTimings('branding')

  const url = new URL(request.url)

  const { db, shopify } = getContext()

  const { admin, session } = await shopify.authenticate.admin(request)

  const [
    shopifyFontFamilyNames,
    checkoutProfileData,
    dismissedCustomFontsBanner,
  ] = await Promise.all([
    time(
      async () => {
        return db
          .select({
            name: shopifyFontFamilies.name,
          })
          .from(shopifyFontFamilies)
      },
      { timings, type: 'find shopify font families' },
    ),
    time(
      async () => {
        return makeRequest(admin.graphql, checkoutProfilesQuery)
      },
      { timings, type: 'checkout profiles' },
    ),
    time(
      async () => {
        return hasDismissedCustomFontsBanner(session.shop)
      },
      { timings, type: 'dismiss custom fonts banner' },
    )
  ])

  invariant(checkoutProfileData?.data, 'No checkout profile data found')

  const checkoutProfileId = url.searchParams.get('profileId') ??
    checkoutProfileData.data?.checkoutProfiles?.nodes?.[0]?.id

  const currentBranding = await time(
    async () => {
      return makeRequest(admin.graphql, brandingQuery, {
        variables: {
          checkoutProfileId,
        },
      })
    },
    { timings, type: 'current branding' },
  )
  invariant(currentBranding?.data, 'No branding data found')

  const customFonts = checkoutProfileData.data.customFonts.nodes.filter(
    (node): node is CustomFontFragment => node.__typename === 'GenericFile'
  )

  return json(
    {
      shopifyFontFamilyNames,
      checkoutProfileData: checkoutProfileData.data,
      customFonts,
      checkoutProfileId,
      currentBranding,
      hasDismissedCustomFontsBanner: dismissedCustomFontsBanner,
      sessionToken: request.headers.get('authorization')?.replace('Bearer ', ''),
    },
    {
      headers: { 'Server-Timing': timings.toString() },
    },
  )
}

export const headers: HeadersFunction = ({ loaderHeaders, parentHeaders }) => {
  return {
    'Server-Timing': combineServerTimings(parentHeaders, loaderHeaders)
  }
}

export default function Branding () {
  const data = useLoaderData<typeof loader>()
  const { checkoutProfiles, ...enumValues } = data.checkoutProfileData

  const currentBranding = data?.currentBranding?.data?.checkoutBranding as CurrentCheckoutBranding

  const branding = useBrandingForms(currentBranding, data.customFonts as CustomFontFragment[])

  return (
    <Outlet
      context={{
        data: {
          fonts: {
            customFonts: data.customFonts as CustomFontFragment[],
            shopifyFonts: data.shopifyFontFamilyNames,
          },
          enums: {
            background: {
              name: enumValues.background?.name ?? '',
              enumValues: enumValues.background?.enumValues ?? [],
            },
            backgroundStyles: {
              name: enumValues.backgroundStyles?.name ?? '',
              enumValues: enumValues.backgroundStyles?.enumValues ?? [],
            },
            border: {
              name: enumValues.border?.name ?? '',
              enumValues: enumValues.border?.enumValues ?? [],
            },
            borderStyle: {
              name: enumValues.borderStyle?.name ?? '',
              enumValues: enumValues.borderStyle?.enumValues ?? [],
            },
            borderWidth: {
              name: enumValues.borderWidth?.name ?? '',
              enumValues: enumValues.borderWidth?.enumValues ?? [],
            },
            colorSelection: {
              name: enumValues.colorSelection?.name ?? '',
              enumValues: enumValues.colorSelection?.enumValues ?? [],
            },
            colorSchemeSelection: {
              name: enumValues.colorSchemeSelection?.name ?? '',
              enumValues: enumValues.colorSchemeSelection?.enumValues ?? [],
            },
            cornerRadius: {
              name: enumValues.cornerRadius?.name ?? '',
              enumValues: enumValues.cornerRadius?.enumValues ?? [],
            },
            fontLoadingStrategies: {
              name: enumValues.fontLoadingStrategies?.name ?? '',
              enumValues: enumValues.fontLoadingStrategies?.enumValues ?? [],
            },
            footerPosition: {
              name: enumValues.footerPosition?.name ?? '',
              enumValues: enumValues.footerPosition?.enumValues ?? [],
            },
            globalCornerRadius: {
              name: enumValues.globalCornerRadius?.name ?? '',
              enumValues: enumValues.globalCornerRadius?.enumValues ?? [],
            },
            headerAlignment: {
              name: enumValues.headerAlignment?.name ?? '',
              enumValues: enumValues.headerAlignment?.enumValues ?? [],
            },
            headerPosition: {
              name: enumValues.headerPosition?.name ?? '',
              enumValues: enumValues.headerPosition?.enumValues ?? [],
            },
            labelPosition: {
              name: enumValues.labelPosition?.name ?? '',
              enumValues: enumValues.labelPosition?.enumValues ?? [],
            },
            shadow: {
              name: enumValues.shadow?.name ?? '',
              enumValues: enumValues.shadow?.enumValues ?? [],
            },
            simpleBorder: {
              name: enumValues.simpleBorder?.name ?? '',
              enumValues: enumValues.simpleBorder?.enumValues ?? [],
            },
            spacing: {
              name: enumValues.spacing?.name ?? '',
              enumValues: enumValues.spacing?.enumValues ?? [],
            },
            spacingKeyword: {
              name: enumValues.spacingKeyword?.name ?? '',
              enumValues: enumValues.spacingKeyword?.enumValues ?? [],
            },
            typographyFont: {
              name: enumValues.typographyFont?.name ?? '',
              enumValues: enumValues.typographyFont?.enumValues ?? [],
            },
            typographyKerning: {
              name: enumValues.typographyKerning?.name ?? '',
              enumValues: enumValues.typographyKerning?.enumValues ?? [],
            },
            typographyLetterCase: {
              name: enumValues.typographyLetterCase?.name ?? '',
              enumValues: enumValues.typographyLetterCase?.enumValues ?? [],
            },
            typographySize: {
              name: enumValues.typographySize?.name ?? '',
              enumValues: enumValues.typographySize?.enumValues ?? [],
            },
            typographyWeight: {
              name: enumValues.typographyWeight?.name ?? '',
              enumValues: enumValues.typographyWeight?.enumValues ?? [],
            },
          },
          branding: {
            profileId: data.checkoutProfileId,
            profiles: checkoutProfiles.nodes as CheckoutProfileFragmentFragment[],
            current: currentBranding,
          },
          sessionToken: data.sessionToken,
        },
        branding,
        state: {
          hasDismissedCustomFontsBanner: data.hasDismissedCustomFontsBanner,
        },
      } satisfies CheckoutBrandingContext}
    />
  )
}

export function useCheckoutBrandingData () {
  return useOutletContext<CheckoutBrandingContext>().data
}

export function useCheckoutBranding () {
  return useOutletContext<CheckoutBrandingContext>().branding
}

export function useCheckoutBrandingState () {
  return useOutletContext<CheckoutBrandingContext>().state
}

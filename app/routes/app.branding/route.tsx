import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare'
import { getContext } from '~/utils/context.server'
import { shopifyFontFamilies } from '~/utils/db/schema.server'
import { Outlet, useLoaderData, useOutletContext } from '@remix-run/react'
import { makeRequest } from '~/utils/graphql.server'
import { invariant } from '@epic-web/invariant'
import { checkoutProfilesQuery } from '~/routes/app.branding/graphql/queries/checkout-profiles-query'
import { brandingQuery } from '~/routes/app.branding/graphql/queries/branding-query'
import type { CheckoutBrandingQuery, CheckoutProfilesQuery } from '~/types/admin.generated'
import { useBrandingForms } from '~/routes/app.branding._index/hooks/use-branding-forms'

type FontDataContext = {
  shopifyFonts: Array<{ name: string }>;
  customFonts: File[];
}

type Enum = {
  name?: string | null | undefined;
  enumValues: Array<{ name: string }>;
}

type EnumsContext = {
  backgroundStyles: Enum;
  border: Enum;
  colorSelection: Enum;
  colorSchemeSelection: Enum;
  cornerRadius: Enum;
  fontLoadingStrategies: Enum;
  globalCornerRadius: Enum;
  headerAlignment: Enum;
  headerPosition: Enum;
  labelPosition: Enum;
  simpleBorder: Enum;
  spacing: Enum;
  typographyFont: Enum;
  typographyKerning: Enum;
  typographyLetterCase: Enum;
  typographySize: Enum;
  typographyWeight: Enum;
}

type BrandingContext = {
  profileId: string;
  profiles: CheckoutProfilesQuery['checkoutProfiles']['nodes'];
  current: CheckoutBrandingQuery['checkoutBranding'];
}

type BrandingData = {
  fonts: FontDataContext;
  enums: EnumsContext;
  branding: BrandingContext;
}

type CheckoutBrandingContext = {
  data: BrandingData;
  branding: ReturnType<typeof useBrandingForms>;
}

export async function loader ({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)

  const { db, shopify } = getContext()

  const { admin } = await shopify.authenticate.admin(request)

  const [
    shopifyFontFamilyNames,
    checkoutProfileData,
  ] = await Promise.all([
    db
      .select({
        name: shopifyFontFamilies.name,
      })
      .from(shopifyFontFamilies),
    makeRequest(admin.graphql, checkoutProfilesQuery)
  ])

  invariant(checkoutProfileData?.data, 'No checkout profile data found')

  const checkoutProfileId = url.searchParams.get('profileId') ?? checkoutProfileData.data?.checkoutProfiles?.nodes?.[0]?.id

  const currentBranding = await makeRequest(admin.graphql, brandingQuery, {
    variables: {
      checkoutProfileId
    }
  })
  invariant(currentBranding?.data, 'No branding data found')

  return json({
    shopifyFontFamilyNames,
    checkoutProfileData: checkoutProfileData.data,
    checkoutProfileId,
    currentBranding,
  })
}

export default function Branding () {
  const data = useLoaderData<typeof loader>()
  const { checkoutProfiles, ...enumValues } = data.checkoutProfileData

  const branding = useBrandingForms()

  return (
    <Outlet
      context={{
        data: {
          fonts: {
            // TODO:
            customFonts: [],
            shopifyFonts: data.shopifyFontFamilyNames,
          },
          enums: {
            backgroundStyles: {
              name: enumValues.backgroundStyles?.name ?? '',
              enumValues: enumValues.backgroundStyles?.enumValues ?? [],
            },
            border: {
              name: enumValues.border?.name ?? '',
              enumValues: enumValues.border?.enumValues ?? [],
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
            simpleBorder: {
              name: enumValues.simpleBorder?.name ?? '',
              enumValues: enumValues.simpleBorder?.enumValues ?? [],
            },
            spacing: {
              name: enumValues.spacing?.name ?? '',
              enumValues: enumValues.spacing?.enumValues ?? [],
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
            profiles: checkoutProfiles.nodes,
            current: data?.currentBranding?.data?.checkoutBranding as CheckoutBrandingQuery['checkoutBranding'],
          },
        },
        branding,
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

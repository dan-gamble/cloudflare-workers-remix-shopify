import type { BrandingFormHook } from '~/routes/app.branding._index/hooks/types'
import type { CheckoutBrandingLayoutFields } from '~/routes/app.branding._index/schema'
import { checkoutBrandingLayoutSchema } from '~/routes/app.branding._index/schema'
import { useForm } from 'react-hook-form'
import { removeCleanFields } from '~/routes/app.branding._index/hooks/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import type { CurrentCheckoutBranding } from '~/routes/app.branding/types'
import type { Maybe } from '~/types/admin.types'

export type ImageUrls = {
  favicon: Maybe<string> | undefined
  headerBanner: Maybe<string> | undefined
  headerLogo: Maybe<string> | undefined
  mainBackgroundImage: Maybe<string> | undefined
  orderSummaryBackgroundImage: Maybe<string> | undefined
}

export function useLayoutForm (currentBranding: CurrentCheckoutBranding): BrandingFormHook<CheckoutBrandingLayoutFields> & {
  imageUrls: ImageUrls
} {
  const imageUrls: ImageUrls = {
    favicon: currentBranding?.customizations?.favicon?.image?.url,
    headerBanner: currentBranding?.customizations?.header?.banner?.image?.url,
    headerLogo: currentBranding?.customizations?.header?.logo?.image?.url,
    mainBackgroundImage: currentBranding?.customizations?.main?.backgroundImage?.image?.url,
    orderSummaryBackgroundImage: currentBranding?.customizations?.orderSummary?.backgroundImage?.image?.url,
  } as const

  const { control, getValues, formState: { isDirty, dirtyFields }, reset, resetField } = useForm<CheckoutBrandingLayoutFields>({
      resolver: zodResolver(checkoutBrandingLayoutSchema),
      values: {
        favicon: {
          mediaImageId: currentBranding?.customizations?.favicon?.image?.id,
        },
        global: {
          cornerRadius: currentBranding?.customizations?.global?.cornerRadius,
          typography: {
            kerning: currentBranding?.customizations?.global?.typography?.kerning,
            letterCase: currentBranding?.customizations?.global?.typography?.letterCase,
          },
        },
        header: {
          alignment: currentBranding?.customizations?.header?.alignment,
          banner: {
            mediaImageId: currentBranding?.customizations?.header?.banner?.image?.id,
          },
          logo: {
            image: {
              mediaImageId: currentBranding?.customizations?.header?.logo?.image?.id,
            },
            maxWidth: currentBranding?.customizations?.header?.logo?.maxWidth,
          },
          position: currentBranding?.customizations?.header?.position,
        },
        main: {
          backgroundImage: {
            mediaImageId: currentBranding?.customizations?.main?.backgroundImage?.image?.id,
          },
          colorScheme: currentBranding?.customizations?.main?.colorScheme,
        },
        merchandiseThumbnail: {
          border: currentBranding?.customizations?.merchandiseThumbnail?.border,
          cornerRadius: currentBranding?.customizations?.merchandiseThumbnail?.cornerRadius,
        },
        orderSummary: {
          backgroundImage: {
            mediaImageId: currentBranding?.customizations?.orderSummary?.backgroundImage?.image?.id,
          },
          colorScheme: currentBranding?.customizations?.orderSummary?.colorScheme,
        },
      },
    },
  )

  return {
    imageUrls,

    control,
    isDirty,
    reset,
    resetField,
    toValues () {
      return {
        customizations: {
          ...cleanupMediaImageIdFields(getValues()),
        },
      }
    },
    toDirtyInputValues () {
      return {
        customizations: {
          ...removeCleanFields(getValues(), dirtyFields),
        },
      }
    },
  }
}

function cleanupMediaImageIdFields (data: any): CheckoutBrandingLayoutFields {
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'object' && !Array.isArray(value) && value != null) {
      data[key] = cleanupMediaImageIdFields(value)
    } else {
      if (typeof value === 'string' && key === 'mediaImageId') {
        data[key] = undefined
      }
    }
  }

  return data as CheckoutBrandingLayoutFields
}

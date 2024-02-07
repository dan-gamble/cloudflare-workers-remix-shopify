import type { BrandingFormHook } from '~/routes/app.branding._index/hooks/types'
import type { CheckoutBrandingLayoutFields } from '~/routes/app.branding._index/schema'
import { checkoutBrandingLayoutSchema } from '~/routes/app.branding._index/schema'
import { useForm } from 'react-hook-form'
import { removeCleanFields } from '~/routes/app.branding._index/hooks/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import type { CurrentCheckoutBranding } from '~/routes/app.branding/types'

export function useLayoutForm (currentBranding: CurrentCheckoutBranding): BrandingFormHook<CheckoutBrandingLayoutFields> {
  // TODO: Add some state to store the image URL's as we dont' want it in the form state

  const { control, getValues, formState: { isDirty, dirtyFields }, reset } = useForm<CheckoutBrandingLayoutFields>({
      resolver: zodResolver(checkoutBrandingLayoutSchema),
      defaultValues: {
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
    control,
    isDirty,
    reset,
    toValues () {
      return {
        customizations: {
          ...removeCleanFields(getValues(), dirtyFields),
        },
      }
    },
  }
}

import type { BrandingFormHook } from '~/routes/app.branding._index/hooks/types'
import type { CheckoutBrandingLayoutFields } from '~/routes/app.branding._index/schema'
import { checkoutBrandingLayoutSchema } from '~/routes/app.branding._index/schema'
import { useForm } from 'react-hook-form'
import { removeCleanFields } from '~/routes/app.branding._index/hooks/utils'
import { zodResolver } from '@hookform/resolvers/zod'

export function useLayoutForm (): BrandingFormHook<CheckoutBrandingLayoutFields> {
  const { control, getValues, formState: { isDirty, dirtyFields }, reset } = useForm<CheckoutBrandingLayoutFields>({
      resolver: zodResolver(checkoutBrandingLayoutSchema),
      defaultValues: {
        favicon: {
          mediaImageId: null,
        },
        global: {
          cornerRadius: null,
          typography: {
            kerning: null,
            letterCase: null,
          },
        },
        header: {
          alignment: null,
          banner: {
            mediaImageId: null,
          },
          logo: {
            image: {
              mediaImageId: null,
            },
            maxWidth: null,
          },
          position: null,
        },
        main: {
          backgroundImage: {
            mediaImageId: null,
          },
          colorScheme: null,
        },
        merchandiseThumbnail: {
          border: null,
          cornerRadius: null,
        },
        orderSummary: {
          backgroundImage: {
            mediaImageId: null,
          },
          colorScheme: null,
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

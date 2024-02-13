/*
  This will hold any input fields that are currently in a preview API release for Shopify so we can submit then separately from the main form.
*/
import type { CurrentCheckoutBranding } from '~/routes/app.branding/types'
import type { BrandingFormHook } from '~/routes/app.branding._index/hooks/types'
import type { CheckoutBrandingPreviewFields } from '~/routes/app.branding._index/schema'
import { checkoutBrandingFormSchema } from '~/routes/app.branding._index/schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { removeCleanFields } from '~/routes/app.branding._index/hooks/utils'

export function usePreviewForm (currentBranding: CurrentCheckoutBranding): BrandingFormHook<CheckoutBrandingPreviewFields> {
  const {
    control,
    getValues,
    formState: {
      isDirty,
      dirtyFields,
    },
    reset,
    resetField,
  } = useForm<CheckoutBrandingPreviewFields>({
    resolver: zodResolver(checkoutBrandingFormSchema),
    values: {
      buyerJourney: {
        visibility: currentBranding?.customizations?.buyerJourney?.visibility,
      },
      cartLink: {
        visibility: currentBranding?.customizations?.buyerJourney?.visibility,
      },
      expressCheckout: {
        button: {
          cornerRadius: currentBranding?.customizations?.expressCheckout?.button?.cornerRadius,
        },
      },
      footer: {
        content: {
          visibility: currentBranding?.customizations?.footer?.content?.visibility,
        },
        position: currentBranding?.customizations?.footer?.position,
      },
      header: {
        logo: {
          visibility: currentBranding?.customizations?.header?.logo?.visibility,
        },
      },
      main: {
        section: {
          background: currentBranding?.customizations?.main?.section?.background,
          border: currentBranding?.customizations?.main?.section?.border,
          borderStyle: currentBranding?.customizations?.main?.section?.borderStyle,
          borderWidth: currentBranding?.customizations?.main?.section?.borderWidth,
          colorScheme: currentBranding?.customizations?.main?.section?.colorScheme,
          cornerRadius: currentBranding?.customizations?.main?.section?.cornerRadius,
          padding: currentBranding?.customizations?.main?.section?.padding,
          shadow: currentBranding?.customizations?.main?.section?.shadow,
        },
      },
      orderSummary: {
        section: {
          background: currentBranding?.customizations?.main?.section?.background,
          border: currentBranding?.customizations?.main?.section?.border,
          borderStyle: currentBranding?.customizations?.main?.section?.borderStyle,
          borderWidth: currentBranding?.customizations?.main?.section?.borderWidth,
          colorScheme: currentBranding?.customizations?.main?.section?.colorScheme,
          cornerRadius: currentBranding?.customizations?.main?.section?.cornerRadius,
          padding: currentBranding?.customizations?.main?.section?.padding,
          shadow: currentBranding?.customizations?.main?.section?.shadow,
        },
      },
    },
  })

  return {
    control,
    isDirty,
    reset,
    resetField,
    toValues () {
      return {
        customizations: {
          ...getValues(),
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

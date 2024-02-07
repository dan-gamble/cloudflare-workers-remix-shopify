import { useForm } from 'react-hook-form'
import type {
  CheckoutBrandingButtonsFields,
} from '~/routes/app.branding._index/schema'
import {
  checkoutBrandingCornerRadiusSchema,
} from '~/routes/app.branding._index/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import type { BrandingFormHook } from '~/routes/app.branding._index/hooks/types'
import { removeCleanFields } from '~/routes/app.branding._index/hooks/utils'
import type { CurrentCheckoutBranding } from '~/routes/app.branding/types'

export function useButtonsForm (currentBranding: CurrentCheckoutBranding): BrandingFormHook<CheckoutBrandingButtonsFields> {
  const { control, getValues, formState: { isDirty, dirtyFields }, reset } = useForm<CheckoutBrandingButtonsFields>({
    resolver: zodResolver(checkoutBrandingCornerRadiusSchema),
    defaultValues: {
      primaryButton: {
        background: currentBranding?.customizations?.primaryButton?.background,
        blockPadding: currentBranding?.customizations?.primaryButton?.blockPadding,
        border: currentBranding?.customizations?.primaryButton?.border,
        cornerRadius: currentBranding?.customizations?.primaryButton?.cornerRadius,
        inlinePadding: currentBranding?.customizations?.primaryButton?.inlinePadding,
        typography: {
          font: currentBranding?.customizations?.primaryButton?.typography?.font,
          kerning: currentBranding?.customizations?.primaryButton?.typography?.kerning,
          letterCase: currentBranding?.customizations?.primaryButton?.typography?.letterCase,
          size: currentBranding?.customizations?.primaryButton?.typography?.size,
          weight: currentBranding?.customizations?.primaryButton?.typography?.weight,
        },
      },
      secondaryButton: {
        background: currentBranding?.customizations?.secondaryButton?.background,
        blockPadding: currentBranding?.customizations?.secondaryButton?.blockPadding,
        border: currentBranding?.customizations?.secondaryButton?.border,
        cornerRadius: currentBranding?.customizations?.secondaryButton?.cornerRadius,
        inlinePadding: currentBranding?.customizations?.secondaryButton?.inlinePadding,
        typography: {
          font: currentBranding?.customizations?.secondaryButton?.typography?.font,
          kerning: currentBranding?.customizations?.secondaryButton?.typography?.kerning,
          letterCase: currentBranding?.customizations?.secondaryButton?.typography?.letterCase,
          size: currentBranding?.customizations?.secondaryButton?.typography?.size,
          weight: currentBranding?.customizations?.secondaryButton?.typography?.weight,
        },
      },
    },
  })

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

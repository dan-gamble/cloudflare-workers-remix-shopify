import type { BrandingFormHook } from '~/routes/app.branding._index/hooks/types'
import type {
  CheckoutBrandingHeadingFields} from '~/routes/app.branding._index/schema';
import {
  checkoutBrandingHeadingsSchema,
} from '~/routes/app.branding._index/schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { removeCleanFields } from '~/routes/app.branding._index/hooks/utils'
import type { CurrentCheckoutBranding } from '~/routes/app.branding/types'

export function useHeadingsForm (currentBranding: CurrentCheckoutBranding): BrandingFormHook<CheckoutBrandingHeadingFields> {
  const { control, getValues, formState: { isDirty, dirtyFields }, reset } = useForm<CheckoutBrandingHeadingFields>({
    resolver: zodResolver(checkoutBrandingHeadingsSchema),
    defaultValues: {
      headingLevel1: {
        typography: {
          font: currentBranding?.customizations?.headingLevel1?.typography?.font,
          kerning: currentBranding?.customizations?.headingLevel1?.typography?.kerning,
          letterCase: currentBranding?.customizations?.headingLevel1?.typography?.letterCase,
          size: currentBranding?.customizations?.headingLevel1?.typography?.size,
          weight: currentBranding?.customizations?.headingLevel1?.typography?.weight,
        },
      },
      headingLevel2: {
        typography: {
          font: currentBranding?.customizations?.headingLevel2?.typography?.font,
          kerning: currentBranding?.customizations?.headingLevel2?.typography?.kerning,
          letterCase: currentBranding?.customizations?.headingLevel2?.typography?.letterCase,
          size: currentBranding?.customizations?.headingLevel2?.typography?.size,
          weight: currentBranding?.customizations?.headingLevel2?.typography?.weight,
        },
      },
      headingLevel3: {
        typography: {
          font: currentBranding?.customizations?.headingLevel3?.typography?.font,
          kerning: currentBranding?.customizations?.headingLevel3?.typography?.kerning,
          letterCase: currentBranding?.customizations?.headingLevel3?.typography?.letterCase,
          size: currentBranding?.customizations?.headingLevel3?.typography?.size,
          weight: currentBranding?.customizations?.headingLevel3?.typography?.weight,
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

import type { BrandingFormHook } from '~/routes/app.branding._index/hooks/types'
import type {
  CheckoutBrandingHeadingFields} from '~/routes/app.branding._index/schema';
import {
  checkoutBrandingHeadingsSchema,
} from '~/routes/app.branding._index/schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export function useHeadingsForm (): BrandingFormHook<CheckoutBrandingHeadingFields> {
  const { control, getValues, formState, reset } = useForm<CheckoutBrandingHeadingFields>({
    resolver: zodResolver(checkoutBrandingHeadingsSchema),
    defaultValues: {
      headingLevel1: {
        typography: {
          font: null,
          kerning: null,
          letterCase: null,
          size: null,
          weight: null,
        },
      },
      headingLevel2: {
        typography: {
          font: null,
          kerning: null,
          letterCase: null,
          size: null,
          weight: null,
        },
      },
      headingLevel3: {
        typography: {
          font: null,
          kerning: null,
          letterCase: null,
          size: null,
          weight: null,
        },
      },
    },
  })

  return {
    control,
    formState,
    reset,
    toValues () {
      return {
        customizations: {
          ...getValues(),
        },
      }
    },
  }
}

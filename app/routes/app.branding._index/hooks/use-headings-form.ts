import type { BrandingFormHook } from '~/routes/app.branding._index/hooks/types'
import type {
  CheckoutBrandingHeadingFields} from '~/routes/app.branding._index/schema';
import {
  checkoutBrandingHeadingsSchema,
} from '~/routes/app.branding._index/schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { removeCleanFields } from '~/routes/app.branding._index/hooks/utils'

export function useHeadingsForm (): BrandingFormHook<CheckoutBrandingHeadingFields> {
  const { control, getValues, formState: { isDirty, dirtyFields }, reset } = useForm<CheckoutBrandingHeadingFields>({
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

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

export function useButtonsForm (): BrandingFormHook<CheckoutBrandingButtonsFields> {
  const { control, getValues, formState: { isDirty, dirtyFields }, reset } = useForm<CheckoutBrandingButtonsFields>({
    resolver: zodResolver(checkoutBrandingCornerRadiusSchema),
    defaultValues: {
      primaryButton: {
        background: null,
        blockPadding: null,
        border: null,
        cornerRadius: null,
        inlinePadding: null,
        typography: {
          font: null,
          kerning: null,
          letterCase: null,
          size: null,
          weight: null,
        },
      },
      secondaryButton: {
        background: null,
        blockPadding: null,
        border: null,
        cornerRadius: null,
        inlinePadding: null,
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

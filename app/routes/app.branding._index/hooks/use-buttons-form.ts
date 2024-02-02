import { useForm } from 'react-hook-form'
import type {
  CheckoutBrandingButtonsFields,
} from '~/routes/app.branding._index/schema'
import {
  checkoutBrandingCornerRadiusSchema,
} from '~/routes/app.branding._index/schema'
import { zodResolver } from '@hookform/resolvers/zod'

export function useButtonsForm () {
  const { control, getValues, formState, reset } = useForm<CheckoutBrandingButtonsFields>({
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

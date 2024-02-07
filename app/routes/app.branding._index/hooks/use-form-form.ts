import type { CheckoutBrandingFormFields} from '~/routes/app.branding._index/schema';
import { checkoutBrandingFormSchema } from '~/routes/app.branding._index/schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { BrandingFormHook } from '~/routes/app.branding._index/hooks/types'
import { removeCleanFields } from '~/routes/app.branding._index/hooks/utils'
import type { CurrentCheckoutBranding } from '~/routes/app.branding/types'

export function useFormForm (currentBranding: CurrentCheckoutBranding): BrandingFormHook<CheckoutBrandingFormFields> {
  const { control, getValues, formState: { isDirty, dirtyFields }, reset, resetField } = useForm<CheckoutBrandingFormFields>({
    resolver: zodResolver(checkoutBrandingFormSchema),
    values: {
      control: {
        border: currentBranding?.customizations?.control?.border,
        color: currentBranding?.customizations?.control?.color,
        cornerRadius: currentBranding?.customizations?.control?.cornerRadius,
        labelPosition: currentBranding?.customizations?.control?.labelPosition,
      },
      checkbox: {
        cornerRadius: currentBranding?.customizations?.checkbox?.cornerRadius,
      },
      choiceList: {
        group: {
          spacing: currentBranding?.customizations?.choiceList?.group?.spacing,
        },
      },
      select: {
        border: currentBranding?.customizations?.select?.border,
        typography: {
          font: currentBranding?.customizations?.select?.typography?.font,
          kerning: currentBranding?.customizations?.select?.typography?.kerning,
          letterCase: currentBranding?.customizations?.select?.typography?.letterCase,
          size: currentBranding?.customizations?.select?.typography?.size,
          weight: currentBranding?.customizations?.select?.typography?.weight,
        },
      },
      textField: {
        border: currentBranding?.customizations?.textField?.border,
        typography: {
          font: currentBranding?.customizations?.textField?.typography?.font,
          kerning: currentBranding?.customizations?.textField?.typography?.kerning,
          letterCase: currentBranding?.customizations?.textField?.typography?.letterCase,
          size: currentBranding?.customizations?.textField?.typography?.size,
          weight: currentBranding?.customizations?.textField?.typography?.weight,
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

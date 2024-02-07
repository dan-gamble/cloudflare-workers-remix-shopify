import { useForm } from 'react-hook-form'
import type { CheckoutBrandingCornerRadiusFields } from '~/routes/app.branding._index/schema'
import { checkoutBrandingCornerRadiusSchema } from '~/routes/app.branding._index/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import type { BrandingFormHook } from '~/routes/app.branding._index/hooks/types'
import { removeCleanFields } from '~/routes/app.branding._index/hooks/utils'
import type { CurrentCheckoutBranding } from '~/routes/app.branding/types'

export function useCornerRadiusForm (currentBranding: CurrentCheckoutBranding): BrandingFormHook<CheckoutBrandingCornerRadiusFields> {
  const { control, getValues, formState: { isDirty, dirtyFields }, reset, resetField } = useForm<CheckoutBrandingCornerRadiusFields>({
    resolver: zodResolver(checkoutBrandingCornerRadiusSchema),
    values: {
      base: currentBranding?.designSystem?.cornerRadius?.base,
      small: currentBranding?.designSystem?.cornerRadius?.small,
      large: currentBranding?.designSystem?.cornerRadius?.large,
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  return {
    control,
    isDirty,
    reset,
    resetField,
    toValues () {
      return {
        designSystem: {
          cornerRadius: {
            ...removeCleanFields(getValues(), dirtyFields),
          },
        },
      }
    },
  }
}

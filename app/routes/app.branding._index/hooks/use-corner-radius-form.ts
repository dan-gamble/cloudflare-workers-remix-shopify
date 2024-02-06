import { useForm } from 'react-hook-form'
import type { CheckoutBrandingCornerRadiusFields } from '~/routes/app.branding._index/schema'
import { checkoutBrandingCornerRadiusSchema } from '~/routes/app.branding._index/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import type { BrandingFormHook } from '~/routes/app.branding._index/hooks/types'
import { removeCleanFields } from '~/routes/app.branding._index/hooks/utils'

export function useCornerRadiusForm (): BrandingFormHook<CheckoutBrandingCornerRadiusFields> {
  const { control, getValues, formState: { isDirty, dirtyFields }, reset } = useForm<CheckoutBrandingCornerRadiusFields>({
    resolver: zodResolver(checkoutBrandingCornerRadiusSchema),
    defaultValues: {
      base: null,
      small: null,
      large: null,
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

  return {
    control,
    isDirty,
    reset,
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

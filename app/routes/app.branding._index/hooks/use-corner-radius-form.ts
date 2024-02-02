import { useForm } from 'react-hook-form'
import type {
  CheckoutBrandingCornerRadiusFields} from '~/routes/app.branding._index/schema';
import {
  checkoutBrandingCornerRadiusSchema,
} from '~/routes/app.branding._index/schema'
import { zodResolver } from '@hookform/resolvers/zod'

export function useCornerRadiusForm () {
  const { control, getValues, formState, reset } = useForm<CheckoutBrandingCornerRadiusFields>({
    resolver: zodResolver(checkoutBrandingCornerRadiusSchema),
    defaultValues: {
      base: null,
      small: null,
      large: null,
    },
  })

  return {
    control,
    formState,
    reset,
    toValues () {
      return {
        designSystem: {
          cornerRadius: {
            ...getValues()
          }
        }
      }
    },
  }
}

import type { CheckoutBrandingFormFields} from '~/routes/app.branding._index/schema';
import { checkoutBrandingFormSchema } from '~/routes/app.branding._index/schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { BrandingFormHook } from '~/routes/app.branding._index/hooks/types'

export function useFormForm (): BrandingFormHook<CheckoutBrandingFormFields> {
  const { control, getValues, formState, reset } = useForm<CheckoutBrandingFormFields>({
    resolver: zodResolver(checkoutBrandingFormSchema),
    defaultValues: {
      control: {
        border: null,
        color: null,
        cornerRadius: null,
        labelPosition: null,
      },
      checkbox: {
        cornerRadius: null,
      },
      choiceList: {
        group: {
          spacing: null,
        },
      },
      select: {
        border: null,
        typography: {
          font: null,
          kerning: null,
          letterCase: null,
          size: null,
          weight: null,
        },
      },
      textField: {
        border: null,
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

import type { BrandingFormHook } from '~/routes/app.branding._index/hooks/types'
import type { CheckoutBrandingTypographyFields} from '~/routes/app.branding._index/schema';
import { checkoutBrandingTypographySchema } from '~/routes/app.branding._index/schema'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { removeCleanFields } from '~/routes/app.branding._index/hooks/utils'

export enum FontTypes {
  Shopify = 'Shopify',
  Custom = 'Custom',
}

export function useTypographyForm (): BrandingFormHook<CheckoutBrandingTypographyFields> & {
  primaryFormType: FontTypes
  setPrimaryFormType: (type: FontTypes) => void
  secondaryFormType: FontTypes
  setSecondaryFormType: (type: FontTypes) => void
} {
  const [primaryFormType, setPrimaryFormType] = useState<FontTypes>(FontTypes.Shopify)
  const [secondaryFormType, setSecondaryFormType] = useState<FontTypes>(FontTypes.Shopify)

  const { control, getValues, formState: { dirtyFields, isDirty }, reset } = useForm<CheckoutBrandingTypographyFields>({
    resolver: zodResolver(checkoutBrandingTypographySchema),
    defaultValues: {
      primary: {
        customFontGroup: {
          base: {
            genericFileId: undefined,
            weight: undefined,
          },
          bold: {
            genericFileId: undefined,
            weight: undefined,
          },
          loadingStrategy: undefined,
        },
        shopifyFontGroup: {
          baseWeight: undefined,
          boldWeight: undefined,
          loadingStrategy: undefined,
          name: undefined,
        },
      },
      secondary: {
        customFontGroup: {
          base: {
            genericFileId: undefined,
            weight: undefined,
          },
          bold: {
            genericFileId: undefined,
            weight: undefined,
          },
          loadingStrategy: undefined,
        },
        shopifyFontGroup: {
          baseWeight: undefined,
          boldWeight: undefined,
          loadingStrategy: undefined,
          name: undefined,
        },
      },
      size: {
        base: undefined,
        ratio: undefined,
      },
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  return {
    primaryFormType,
    setPrimaryFormType,
    secondaryFormType,
    setSecondaryFormType,

    control,
    isDirty,
    reset,
    toValues () {
      return {
        designSystem: {
          typography: {
            ...removeCleanFields(getValues(), dirtyFields),
          },
        },
      }
    },
  }
}

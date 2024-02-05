import type { BrandingFormHook } from '~/routes/app.branding._index/hooks/types'
import type { CheckoutBrandingColorsFields } from '~/routes/app.branding._index/schema'
import { checkoutBrandingColorsSchema } from '~/routes/app.branding._index/schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

export enum SchemeOptions {
  Scheme1 = 'scheme1',
  Scheme2 = 'scheme2',
}

export function useColoursForm (): BrandingFormHook<CheckoutBrandingColorsFields> & {
  currentlySelectedScheme: SchemeOptions
  setCurrentlySelectedScheme: (scheme: SchemeOptions) => void
} {
  const [currentlySelectedScheme, setCurrentlySelectedScheme] = useState<SchemeOptions>(SchemeOptions.Scheme1)

  const { control, getValues, formState, reset } = useForm<CheckoutBrandingColorsFields>({
    resolver: zodResolver(checkoutBrandingColorsSchema),
    defaultValues: {
      global: {
        accent: null,
        brand: null,
        critical: null,
        decorative: null,
        info: null,
        success: null,
        warning: null,
      },
      schemes: {
        scheme1: {
          base: {
            accent: null,
            background: null,
            border: null,
            decorative: null,
            icon: null,
            text: null,
          },
          control: {
            accent: null,
            background: null,
            border: null,
            decorative: null,
            icon: null,
            text: null,
          },
          primaryButton: {
            accent: null,
            background: null,
            border: null,
            decorative: null,
            icon: null,
            text: null,
          },
          secondaryButton: {
            accent: null,
            background: null,
            border: null,
            decorative: null,
            icon: null,
            text: null,
          },
        },
        scheme2: {
          base: {
            accent: null,
            background: null,
            border: null,
            decorative: null,
            icon: null,
            text: null,
          },
          control: {
            accent: null,
            background: null,
            border: null,
            decorative: null,
            icon: null,
            text: null,
          },
          primaryButton: {
            accent: null,
            background: null,
            border: null,
            decorative: null,
            icon: null,
            text: null,
          },
          secondaryButton: {
            accent: null,
            background: null,
            border: null,
            decorative: null,
            icon: null,
            text: null,
          },
        },
      },
    },
  })

  return {
    currentlySelectedScheme,
    setCurrentlySelectedScheme,

    control,
    formState,
    reset,
    toValues () {
      return {
        designSystem: {
          colors: {
            ...getValues(),
          },
        },
      }
    },
  }
}

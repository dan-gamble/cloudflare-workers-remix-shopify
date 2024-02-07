import type { BrandingFormHook } from '~/routes/app.branding._index/hooks/types'
import type { CheckoutBrandingColorsFields } from '~/routes/app.branding._index/schema'
import { checkoutBrandingColorsSchema } from '~/routes/app.branding._index/schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { removeCleanFields } from '~/routes/app.branding._index/hooks/utils'
import type { CurrentCheckoutBranding } from '~/routes/app.branding/types'

export enum SchemeOptions {
  Scheme1 = 'scheme1',
  Scheme2 = 'scheme2',
}

export function useColoursForm (currentBranding: CurrentCheckoutBranding): BrandingFormHook<CheckoutBrandingColorsFields> & {
  currentlySelectedScheme: SchemeOptions
  setCurrentlySelectedScheme: (scheme: SchemeOptions) => void
} {
  const [currentlySelectedScheme, setCurrentlySelectedScheme] = useState<SchemeOptions>(SchemeOptions.Scheme1)

  const { control, getValues, formState: { isDirty, dirtyFields }, reset } = useForm<CheckoutBrandingColorsFields>({
    resolver: zodResolver(checkoutBrandingColorsSchema),
    defaultValues: {
      global: {
        accent: currentBranding?.designSystem?.colors?.global?.accent,
        brand: currentBranding?.designSystem?.colors?.global?.brand,
        critical: currentBranding?.designSystem?.colors?.global?.critical,
        decorative: currentBranding?.designSystem?.colors?.global?.decorative,
        info: currentBranding?.designSystem?.colors?.global?.info,
        success: currentBranding?.designSystem?.colors?.global?.success,
        warning: currentBranding?.designSystem?.colors?.global?.warning,
      },
      schemes: {
        scheme1: {
          base: {
            accent: currentBranding?.designSystem?.colors?.schemes?.scheme1?.base?.accent,
            background: currentBranding?.designSystem?.colors?.schemes?.scheme1?.base?.background,
            border: currentBranding?.designSystem?.colors?.schemes?.scheme1?.base?.border,
            decorative: currentBranding?.designSystem?.colors?.schemes?.scheme1?.base?.decorative,
            icon: currentBranding?.designSystem?.colors?.schemes?.scheme1?.base?.icon,
            text: currentBranding?.designSystem?.colors?.schemes?.scheme1?.base?.text,
          },
          control: {
            accent: currentBranding?.designSystem?.colors?.schemes?.scheme1?.control?.accent,
            background: currentBranding?.designSystem?.colors?.schemes?.scheme1?.control?.background,
            border: currentBranding?.designSystem?.colors?.schemes?.scheme1?.control?.border,
            decorative: currentBranding?.designSystem?.colors?.schemes?.scheme1?.control?.decorative,
            icon: currentBranding?.designSystem?.colors?.schemes?.scheme1?.control?.icon,
            text: currentBranding?.designSystem?.colors?.schemes?.scheme1?.control?.text,
          },
          primaryButton: {
            accent: currentBranding?.designSystem?.colors?.schemes?.scheme1?.primaryButton?.accent,
            background: currentBranding?.designSystem?.colors?.schemes?.scheme1?.primaryButton?.background,
            border: currentBranding?.designSystem?.colors?.schemes?.scheme1?.primaryButton?.border,
            decorative: currentBranding?.designSystem?.colors?.schemes?.scheme1?.primaryButton?.decorative,
            icon: currentBranding?.designSystem?.colors?.schemes?.scheme1?.primaryButton?.icon,
            text: currentBranding?.designSystem?.colors?.schemes?.scheme1?.primaryButton?.text,
          },
          secondaryButton: {
            accent: currentBranding?.designSystem?.colors?.schemes?.scheme1?.secondaryButton?.accent,
            background: currentBranding?.designSystem?.colors?.schemes?.scheme1?.secondaryButton?.background,
            border: currentBranding?.designSystem?.colors?.schemes?.scheme1?.secondaryButton?.border,
            decorative: currentBranding?.designSystem?.colors?.schemes?.scheme1?.secondaryButton?.decorative,
            icon: currentBranding?.designSystem?.colors?.schemes?.scheme1?.secondaryButton?.icon,
            text: currentBranding?.designSystem?.colors?.schemes?.scheme1?.secondaryButton?.text,
          },
        },
        scheme2: {
          base: {
            accent: currentBranding?.designSystem?.colors?.schemes?.scheme2?.base?.accent,
            background: currentBranding?.designSystem?.colors?.schemes?.scheme2?.base?.background,
            border: currentBranding?.designSystem?.colors?.schemes?.scheme2?.base?.border,
            decorative: currentBranding?.designSystem?.colors?.schemes?.scheme2?.base?.decorative,
            icon: currentBranding?.designSystem?.colors?.schemes?.scheme2?.base?.icon,
            text: currentBranding?.designSystem?.colors?.schemes?.scheme2?.base?.text,
          },
          control: {
            accent: currentBranding?.designSystem?.colors?.schemes?.scheme2?.control?.accent,
            background: currentBranding?.designSystem?.colors?.schemes?.scheme2?.control?.background,
            border: currentBranding?.designSystem?.colors?.schemes?.scheme2?.control?.border,
            decorative: currentBranding?.designSystem?.colors?.schemes?.scheme2?.control?.decorative,
            icon: currentBranding?.designSystem?.colors?.schemes?.scheme2?.control?.icon,
            text: currentBranding?.designSystem?.colors?.schemes?.scheme2?.control?.text,
          },
          primaryButton: {
            accent: currentBranding?.designSystem?.colors?.schemes?.scheme2?.primaryButton?.accent,
            background: currentBranding?.designSystem?.colors?.schemes?.scheme2?.primaryButton?.background,
            border: currentBranding?.designSystem?.colors?.schemes?.scheme2?.primaryButton?.border,
            decorative: currentBranding?.designSystem?.colors?.schemes?.scheme2?.primaryButton?.decorative,
            icon: currentBranding?.designSystem?.colors?.schemes?.scheme2?.primaryButton?.icon,
            text: currentBranding?.designSystem?.colors?.schemes?.scheme2?.primaryButton?.text,
          },
          secondaryButton: {
            accent: currentBranding?.designSystem?.colors?.schemes?.scheme2?.secondaryButton?.accent,
            background: currentBranding?.designSystem?.colors?.schemes?.scheme2?.secondaryButton?.background,
            border: currentBranding?.designSystem?.colors?.schemes?.scheme2?.secondaryButton?.border,
            decorative: currentBranding?.designSystem?.colors?.schemes?.scheme2?.secondaryButton?.decorative,
            icon: currentBranding?.designSystem?.colors?.schemes?.scheme2?.secondaryButton?.icon,
            text: currentBranding?.designSystem?.colors?.schemes?.scheme2?.secondaryButton?.text,
          },
        },
      },
    },
  })

  return {
    currentlySelectedScheme,
    setCurrentlySelectedScheme,

    control,
    isDirty,
    reset,
    toValues () {
      return {
        designSystem: {
          colors: {
            ...removeCleanFields(getValues(), dirtyFields),
          },
        },
      }
    },
  }
}

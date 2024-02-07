import type { BrandingFormHook } from '~/routes/app.branding._index/hooks/types'
import type { CheckoutBrandingTypographyFields } from '~/routes/app.branding._index/schema'
import { checkoutBrandingTypographySchema } from '~/routes/app.branding._index/schema'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { removeCleanFields } from '~/routes/app.branding._index/hooks/utils'
import type { CurrentCheckoutBranding } from '~/routes/app.branding/types'
import type { DefaultValues } from 'react-hook-form/dist/types/form'
import type { Maybe } from '~/types/admin.types'
import type { CustomFontFragment } from '~/types/admin.generated'

export enum FontTypes {
  Shopify = 'Shopify',
  Custom = 'Custom',
}

export function useTypographyForm (
  currentBranding: CurrentCheckoutBranding,
  customFonts: CustomFontFragment[],
): BrandingFormHook<CheckoutBrandingTypographyFields> & {
  primaryFormType: FontTypes
  setPrimaryFormType: (type: FontTypes) => void
  secondaryFormType: FontTypes
  setSecondaryFormType: (type: FontTypes) => void
} {
  const primaryFontIsCustom = isCustomFont(currentBranding?.designSystem?.typography?.primary?.base?.sources)
  const secondaryFontIsCustom = isCustomFont(currentBranding?.designSystem?.typography?.secondary?.base?.sources)

  const [primaryFormType, setPrimaryFormType] = useState<FontTypes>(
    primaryFontIsCustom
      ? FontTypes.Custom
      : FontTypes.Shopify
  )
  const [secondaryFormType, setSecondaryFormType] = useState<FontTypes>(
    secondaryFontIsCustom
      ? FontTypes.Custom
      : FontTypes.Shopify
  )

  const { control, getValues, formState: { dirtyFields, isDirty }, reset } = useForm<CheckoutBrandingTypographyFields>({
    resolver: zodResolver(checkoutBrandingTypographySchema),
    defaultValues: getDefaultValues(currentBranding, customFonts),
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

function getDefaultValues (
  currentBranding: CurrentCheckoutBranding,
  customFonts: CustomFontFragment[],
): DefaultValues<CheckoutBrandingTypographyFields> {
  const defaultValues = {
    primary: {
      customFontGroup: {},
      shopifyFontGroup: {},
    },
    secondary: {
      customFontGroup: {},
      shopifyFontGroup: {},
    },
    size: {
      base: currentBranding?.designSystem?.typography?.size?.base,
      ratio: currentBranding?.designSystem?.typography?.size?.ratio,
    },
  }

  const primaryFontIsCustom = isCustomFont(currentBranding?.designSystem?.typography?.primary?.base?.sources)

  if (primaryFontIsCustom) {
    defaultValues.primary.customFontGroup = {
      base: {
        genericFileId: getCustomFontId(
          currentBranding?.designSystem?.typography?.primary?.base?.sources as string,
          customFonts,
        ),
        weight: currentBranding?.designSystem?.typography?.primary?.base?.weight,
      },
      bold: {
        genericFileId: getCustomFontId(
          currentBranding?.designSystem?.typography?.primary?.bold?.sources as string,
          customFonts,
        ),
        weight: currentBranding?.designSystem?.typography?.primary?.bold?.weight,
      },
      loadingStrategy: currentBranding?.designSystem?.typography?.primary?.loadingStrategy,
    }
  } else {
    defaultValues.primary.shopifyFontGroup = {
      baseWeight: currentBranding?.designSystem?.typography?.primary?.base?.weight,
      boldWeight: currentBranding?.designSystem?.typography?.primary?.bold?.weight,
      loadingStrategy: currentBranding?.designSystem?.typography?.primary?.loadingStrategy,
      name: currentBranding?.designSystem?.typography?.primary?.name,
    }
  }

  const secondaryFontIsCustom = isCustomFont(currentBranding?.designSystem?.typography?.secondary?.base?.sources)

  if (secondaryFontIsCustom) {
    defaultValues.secondary.customFontGroup = {
      base: {
        genericFileId: getCustomFontId(
          currentBranding?.designSystem?.typography?.secondary?.base?.sources as string,
          customFonts,
        ),
        weight: currentBranding?.designSystem?.typography?.secondary?.base?.weight,
      },
      bold: {
        genericFileId: getCustomFontId(
          currentBranding?.designSystem?.typography?.secondary?.bold?.sources as string,
          customFonts,
        ),
        weight: currentBranding?.designSystem?.typography?.secondary?.bold?.weight,
      },
      loadingStrategy: currentBranding?.designSystem?.typography?.secondary?.loadingStrategy,
    }
  } else {
    defaultValues.secondary.shopifyFontGroup = {
      baseWeight: currentBranding?.designSystem?.typography?.secondary?.base?.weight,
      boldWeight: currentBranding?.designSystem?.typography?.secondary?.bold?.weight,
      loadingStrategy: currentBranding?.designSystem?.typography?.secondary?.loadingStrategy,
      name: currentBranding?.designSystem?.typography?.secondary?.name,
    }
  }

  return defaultValues
}

function isCustomFont (font: Maybe<string> | undefined) {
  if (!font) return false

  return font.includes('url(https://cdn.shopify')
}

function getCustomFontId (customFont: string, customFonts: CustomFontFragment[]) {
  // @ts-ignore
  const [_, url] = (
    customFont ?? ''
  ).match(/(?:url)\((.*?)\)/)

  const matchedFont = customFonts.find(font => font.url === url)
  if (matchedFont) {
    return matchedFont.id
  }

  return ''
}

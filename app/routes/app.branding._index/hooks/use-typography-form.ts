import type { BrandingFormHook } from '~/routes/app.branding._index/hooks/types'
import {
 checkoutBrandingTypographySchema
} from '~/routes/app.branding._index/schema';
import type {
  checkoutBrandingFontGroupSchema,
  checkoutBrandingFontSizeSchema,
  CheckoutBrandingTypographyFields
} from '~/routes/app.branding._index/schema'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { removeCleanFields } from '~/routes/app.branding._index/hooks/utils'
import type { CurrentCheckoutBranding } from '~/routes/app.branding/types'
import type { Maybe } from '~/types/admin.types'
import type { CustomFontFragment } from '~/types/admin.generated'
import type { z } from 'zod'

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

  const { control, getValues, formState: { dirtyFields, isDirty }, reset, resetField } = useForm<CheckoutBrandingTypographyFields>({
    resolver: zodResolver(checkoutBrandingTypographySchema),
    values: getInitialValues(currentBranding, customFonts),
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
    resetField,
    // @ts-ignore
    toValues () {
      return {
        designSystem: {
          typography: {
            ...getValues(),
          },
        },
      }
    },
    // @ts-ignore
    toDirtyInputValues () {
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

function getInitialValues (
  currentBranding: CurrentCheckoutBranding,
  customFonts: CustomFontFragment[],
): CheckoutBrandingTypographyFields {
  type InitialValues = {
    primary: z.infer<typeof checkoutBrandingFontGroupSchema>
    secondary: z.infer<typeof checkoutBrandingFontGroupSchema>
    size: z.infer<typeof checkoutBrandingFontSizeSchema>
  }

  const initialValues: InitialValues = {
    primary: {
      customFontGroup: null,
      shopifyFontGroup: null,
    },
    secondary: {
      customFontGroup: null,
      shopifyFontGroup: null,
    },
    size: {
      base: currentBranding?.designSystem?.typography?.size?.base,
      ratio: currentBranding?.designSystem?.typography?.size?.ratio,
    },
  }

  const primaryFontIsCustom = isCustomFont(currentBranding?.designSystem?.typography?.primary?.base?.sources)

  if (primaryFontIsCustom) {
    initialValues.primary.customFontGroup = {
      base: {
        genericFileId: getCustomFontId(
          currentBranding?.designSystem?.typography?.primary?.base?.sources as string,
          customFonts,
        ),
        weight: currentBranding?.designSystem?.typography?.primary?.base?.weight as number,
      },
      bold: {
        genericFileId: getCustomFontId(
          currentBranding?.designSystem?.typography?.primary?.bold?.sources as string,
          customFonts,
        ),
        weight: currentBranding?.designSystem?.typography?.primary?.bold?.weight as number,
      },
      loadingStrategy: currentBranding?.designSystem?.typography?.primary?.loadingStrategy,
    }
    initialValues.primary.shopifyFontGroup = null
  } else {
    initialValues.primary.customFontGroup = null
    initialValues.primary.shopifyFontGroup = {
      baseWeight: currentBranding?.designSystem?.typography?.primary?.base?.weight,
      boldWeight: currentBranding?.designSystem?.typography?.primary?.bold?.weight,
      loadingStrategy: currentBranding?.designSystem?.typography?.primary?.loadingStrategy,
      name: currentBranding?.designSystem?.typography?.primary?.name as string,
    }
  }

  const secondaryFontIsCustom = isCustomFont(currentBranding?.designSystem?.typography?.secondary?.base?.sources)

  if (secondaryFontIsCustom) {
    initialValues.secondary.customFontGroup = {
      base: {
        genericFileId: getCustomFontId(
          currentBranding?.designSystem?.typography?.secondary?.base?.sources as string,
          customFonts,
        ),
        weight: currentBranding?.designSystem?.typography?.secondary?.base?.weight as number,
      },
      bold: {
        genericFileId: getCustomFontId(
          currentBranding?.designSystem?.typography?.secondary?.bold?.sources as string,
          customFonts,
        ),
        weight: currentBranding?.designSystem?.typography?.secondary?.bold?.weight as number,
      },
      loadingStrategy: currentBranding?.designSystem?.typography?.secondary?.loadingStrategy,
    }
    initialValues.secondary.shopifyFontGroup = null
  } else {
    initialValues.secondary.customFontGroup = null
    initialValues.secondary.shopifyFontGroup = {
      baseWeight: currentBranding?.designSystem?.typography?.secondary?.base?.weight,
      boldWeight: currentBranding?.designSystem?.typography?.secondary?.bold?.weight,
      loadingStrategy: currentBranding?.designSystem?.typography?.secondary?.loadingStrategy,
      name: currentBranding?.designSystem?.typography?.secondary?.name as string,
    }
  }

  return initialValues
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

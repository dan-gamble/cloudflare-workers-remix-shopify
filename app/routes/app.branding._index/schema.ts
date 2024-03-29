import { z } from 'zod'
import { zfd } from 'zod-form-data'
import {
  CheckoutBrandingBackground,
  CheckoutBrandingBackgroundStyle,
  CheckoutBrandingBorder,
  CheckoutBrandingBorderStyle,
  CheckoutBrandingBorderWidth,
  CheckoutBrandingColorSchemeSelection,
  CheckoutBrandingColorSelection,
  CheckoutBrandingCornerRadius,
  CheckoutBrandingFontLoadingStrategy,
  CheckoutBrandingFooterPosition,
  CheckoutBrandingGlobalCornerRadius,
  CheckoutBrandingHeaderAlignment,
  CheckoutBrandingHeaderPosition,
  CheckoutBrandingLabelPosition,
  CheckoutBrandingShadow,
  CheckoutBrandingSimpleBorder,
  CheckoutBrandingSpacing,
  CheckoutBrandingSpacingKeyword,
  CheckoutBrandingTypographyFont,
  CheckoutBrandingTypographyKerning,
  CheckoutBrandingTypographyLetterCase,
  CheckoutBrandingTypographySize,
  CheckoutBrandingTypographyWeight,
  CheckoutBrandingVisibility,
} from '~/types/admin.types'

export const checkoutBrandingBackgroundEnum = z.nativeEnum(CheckoutBrandingBackground)
export const checkoutBrandingBackgroundStyleEnum = z.nativeEnum(CheckoutBrandingBackgroundStyle)
export const checkoutBrandingBorderEnum = z.nativeEnum(CheckoutBrandingBorder)
export const checkoutBrandingBorderStyleEnum = z.nativeEnum(CheckoutBrandingBorderStyle)
export const checkoutBrandingBorderWidthEnum = z.nativeEnum(CheckoutBrandingBorderWidth)
export const checkoutBrandingColorSchemeSelectionEnum = z.nativeEnum(CheckoutBrandingColorSchemeSelection)
export const checkoutBrandingColorSelectionEnum = z.nativeEnum(CheckoutBrandingColorSelection)
export const checkoutBrandingCornerRadiusEnum = z.nativeEnum(CheckoutBrandingCornerRadius)
export const checkoutBrandingFontLoadingStrategyEnum = z.nativeEnum(CheckoutBrandingFontLoadingStrategy)
export const checkoutBrandingFooterPositionEnum = z.nativeEnum(CheckoutBrandingFooterPosition)
export const checkoutBrandingGlobalCornerRadiusEnum = z.nativeEnum(CheckoutBrandingGlobalCornerRadius)
export const checkoutBrandingHeaderAlignmentEnum = z.nativeEnum(CheckoutBrandingHeaderAlignment)
export const checkoutBrandingHeaderPositionEnum = z.nativeEnum(CheckoutBrandingHeaderPosition)
export const checkoutBrandingLabelPositionEnum = z.nativeEnum(CheckoutBrandingLabelPosition)
export const checkoutBrandingShadowEnum = z.nativeEnum(CheckoutBrandingShadow)
export const checkoutBrandingSimpleBorderEnum = z.nativeEnum(CheckoutBrandingSimpleBorder)
export const checkoutBrandingSpacingEnum = z.nativeEnum(CheckoutBrandingSpacing)
export const checkoutBrandingSpacingKeywordEnum = z.nativeEnum(CheckoutBrandingSpacingKeyword)
export const checkoutBrandingTypographyFontEnum = z.nativeEnum(CheckoutBrandingTypographyFont)
export const checkoutBrandingTypographyKerningEnum = z.nativeEnum(CheckoutBrandingTypographyKerning)
export const checkoutBrandingTypographyLetterCaseEnum = z.nativeEnum(CheckoutBrandingTypographyLetterCase)
export const checkoutBrandingTypographySizeEnum = z.nativeEnum(CheckoutBrandingTypographySize)
export const checkoutBrandingTypographyWeightEnum = z.nativeEnum(CheckoutBrandingTypographyWeight)
export const checkoutBrandingVisibilityEnum = z.nativeEnum(CheckoutBrandingVisibility)

export const checkoutBrandingCustomFontSchema = z.object({
  genericFileId: z.string().optional().nullable(),
  weight: z.coerce.number().min(100).max(900).optional().nullable(),
})

export const checkoutBrandingCustomFontGroupSchema = z.object({
  base: checkoutBrandingCustomFontSchema,
  bold: checkoutBrandingCustomFontSchema,
  loadingStrategy: checkoutBrandingFontLoadingStrategyEnum.optional().nullable(),
})

export const checkoutBrandingShopifyFontGroupSchema = z.object({
  baseWeight: z.coerce.number().optional().nullable(),
  boldWeight: z.coerce.number().optional().nullable(),
  loadingStrategy: checkoutBrandingFontLoadingStrategyEnum.optional().nullable(),
  name: z.string(),
})

export const checkoutBrandingFontGroupSchema = z
  .object({
    customFontGroup: checkoutBrandingCustomFontGroupSchema.optional().nullable(),
    shopifyFontGroup: checkoutBrandingShopifyFontGroupSchema.optional().nullable(),
  })

export const checkoutBrandingFontSizeSchema = z.object({
  base: z
    .coerce
    .number()
    .min(12.0, { message: 'Base font size must be at least 12' })
    .max(18.0)
    .optional()
    .nullable(),
  ratio: z.coerce.number().min(1.0).max(1.4).optional().nullable(),
})

export const checkoutBrandingColorGlobalSchema = z.object({
  accent: z.string().optional().nullable(),
  brand: z.string().optional().nullable(),
  critical: z.string().optional().nullable(),
  decorative: z.string().optional().nullable(),
  info: z.string().optional().nullable(),
  success: z.string().optional().nullable(),
  warning: z.string().optional().nullable(),
})

export const checkoutBrandingColorRolesSchema = z.object({
  accent: z.string().optional().nullable(),
  background: z.string().optional().nullable(),
  border: z.string().optional().nullable(),
  decorative: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  text: z.string().optional().nullable(),
})

export const checkoutBrandingControlColorRolesSchema = z.object({
  accent: z.string().optional().nullable(),
  background: z.string().optional().nullable(),
  border: z.string().optional().nullable(),
  decorative: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  selected: checkoutBrandingColorRolesSchema.optional().nullable(),
  text: z.string().optional().nullable(),
})

export const checkoutBrandingButtonColorRolesSchema = z.object({
  accent: z.string().optional().nullable(),
  background: z.string().optional().nullable(),
  border: z.string().optional().nullable(),
  decorative: z.string().optional().nullable(),
  hover: checkoutBrandingColorRolesSchema.optional().nullable(),
  icon: z.string().optional().nullable(),
  text: z.string().optional().nullable(),
})

export const checkoutBrandingColorSchemeSchema = z.object({
  base: checkoutBrandingColorRolesSchema.optional().nullable(),
  control: checkoutBrandingControlColorRolesSchema.optional().nullable(),
  primaryButton: checkoutBrandingButtonColorRolesSchema.optional().nullable(),
  secondaryButton: checkoutBrandingButtonColorRolesSchema.optional().nullable(),
})

export const checkoutBrandingTypographyStyleSchema = z.object({
  font: checkoutBrandingTypographyFontEnum.optional().nullable(),
  kerning: checkoutBrandingTypographyKerningEnum.optional().nullable(),
  letterCase: checkoutBrandingTypographyLetterCaseEnum.optional().nullable(),
  size: checkoutBrandingTypographySizeEnum.optional().nullable(),
  weight: checkoutBrandingTypographyWeightEnum.optional().nullable(),
})

export const checkoutBrandingCheckboxSchema = z.object({
  cornerRadius: checkoutBrandingCornerRadiusEnum.optional().nullable(),
})

export const checkoutBrandingChoiceListGroupInputSchema = z.object({
  spacing: checkoutBrandingSpacingKeywordEnum.optional().nullable(),
})

export const checkoutBrandingChoiceListSchema = z.object({
  group: checkoutBrandingChoiceListGroupInputSchema.optional().nullable(),
})

export const checkoutBrandingControlSchema = z.object({
  border: checkoutBrandingSimpleBorderEnum.optional().nullable(),
  color: checkoutBrandingColorSelectionEnum.optional().nullable(),
  cornerRadius: checkoutBrandingCornerRadiusEnum.optional().nullable(),
  labelPosition: checkoutBrandingLabelPositionEnum.optional().nullable(),
})

export const checkoutBrandingImageSchema = z.object({
  mediaImageId: z.string().optional().nullable(),
})

export const checkoutBrandingGlobalSchema = z.object({
  cornerRadius: checkoutBrandingGlobalCornerRadiusEnum.optional().nullable(),
  typography: z.object({
    kerning: checkoutBrandingTypographyKerningEnum.optional().nullable(),
    letterCase: checkoutBrandingTypographyLetterCaseEnum.optional().nullable(),
  }).optional().nullable(),
})

export const checkoutBrandingHeaderSchema = z.object({
  alignment: checkoutBrandingHeaderAlignmentEnum.optional().nullable(),
  banner: checkoutBrandingImageSchema.optional().nullable(),
  logo: z.object({
    image: checkoutBrandingImageSchema.optional().nullable(),
    maxWidth: z.coerce.number().positive().optional().nullable(),
  }),
  position: checkoutBrandingHeaderPositionEnum.optional().nullable(),
})

export const checkoutBrandingHeadingLevelSchema = z.object({
  typography: checkoutBrandingTypographyStyleSchema.optional().nullable(),
})

export const checkoutBrandingSectionSchema = z.object({
  background: checkoutBrandingBackgroundEnum.optional().nullable(),
  border: checkoutBrandingSimpleBorderEnum.optional().nullable(),
  borderStyle: checkoutBrandingBorderStyleEnum.optional().nullable(),
  borderWidth: checkoutBrandingBorderWidthEnum.optional().nullable(),
  colorScheme: checkoutBrandingColorSchemeSelectionEnum.optional().nullable(),
  cornerRadius: checkoutBrandingCornerRadiusEnum.optional().nullable(),
  padding: checkoutBrandingSpacingKeywordEnum.optional().nullable(),
  shadow: checkoutBrandingShadowEnum.optional().nullable(),
})

export const checkoutBrandingMainSchema = z.object({
  backgroundImage: checkoutBrandingImageSchema.optional().nullable(),
  colorScheme: checkoutBrandingColorSchemeSelectionEnum.optional().nullable(),
})

export const checkoutBrandingMerchandiseThumbnailSchema = z.object({
  border: checkoutBrandingSimpleBorderEnum.optional().nullable(),
  cornerRadius: checkoutBrandingCornerRadiusEnum.optional().nullable(),
})

export const checkoutBrandingOrderSummarySchema = z.object({
  backgroundImage: checkoutBrandingImageSchema.optional().nullable(),
  colorScheme: checkoutBrandingColorSchemeSelectionEnum.optional().nullable(),
})

export const checkoutBrandingButtonSchema = z.object({
  background: checkoutBrandingBackgroundStyleEnum.optional().nullable(),
  blockPadding: checkoutBrandingSpacingEnum.optional().nullable(),
  border: checkoutBrandingSimpleBorderEnum.optional().nullable(),
  cornerRadius: checkoutBrandingCornerRadiusEnum.optional().nullable(),
  inlinePadding: checkoutBrandingSpacingEnum.optional().nullable(),
  typography: checkoutBrandingTypographyStyleSchema.optional().nullable(),
})

export const checkoutBrandingSelectSchema = z.object({
  border: checkoutBrandingBorderEnum.optional().nullable(),
  typography: checkoutBrandingTypographyStyleSchema.optional().nullable(),
})

export const checkoutBrandingTextFieldSchema = z.object({
  border: checkoutBrandingBorderEnum.optional().nullable(),
  typography: checkoutBrandingTypographyStyleSchema.optional().nullable(),
})

export const checkoutBrandingFormSchema = z.object({
  checkbox: checkoutBrandingCheckboxSchema.optional().nullable(),
  choiceList: checkoutBrandingChoiceListSchema.optional().nullable(),
  control: checkoutBrandingControlSchema.optional().nullable(),
  select: checkoutBrandingSelectSchema.optional().nullable(),
  textField: checkoutBrandingTextFieldSchema.optional().nullable(),
})

export type CheckoutBrandingFormFields = z.infer<typeof checkoutBrandingFormSchema>

export const checkoutBrandingButtonsSchema = z.object({
  primaryButton: checkoutBrandingButtonSchema.optional().nullable(),
  secondaryButton: checkoutBrandingButtonSchema.optional().nullable(),
})

export type CheckoutBrandingButtonsFields = z.infer<typeof checkoutBrandingButtonsSchema>

export const checkoutBrandingHeadingsSchema = z.object({
  headingLevel1: checkoutBrandingHeadingLevelSchema.optional().nullable(),
  headingLevel2: checkoutBrandingHeadingLevelSchema.optional().nullable(),
  headingLevel3: checkoutBrandingHeadingLevelSchema.optional().nullable(),
})

export type CheckoutBrandingHeadingFields = z.infer<typeof checkoutBrandingHeadingsSchema>

export const checkoutBrandingLayoutSchema = z.object({
  favicon: checkoutBrandingImageSchema.optional().nullable(),
  global: checkoutBrandingGlobalSchema.optional().nullable(),
  header: checkoutBrandingHeaderSchema.optional().nullable(),
  main: checkoutBrandingMainSchema.optional().nullable(),
  merchandiseThumbnail: checkoutBrandingMerchandiseThumbnailSchema.optional().nullable(),
  orderSummary: checkoutBrandingOrderSummarySchema.optional().nullable(),
})

export type CheckoutBrandingLayoutFields = z.infer<typeof checkoutBrandingLayoutSchema>

export const checkoutBrandingPreviewSchema = z.object({
  buyerJourney: z.object({
    visibility: checkoutBrandingVisibilityEnum.optional().nullable(),
  }).optional().nullable(),
  cartLink: z.object({
    visibility: checkoutBrandingVisibilityEnum.optional().nullable(),
  }).optional().nullable(),
  expressCheckout: z.object({
    button: z.object({
      cornerRadius: checkoutBrandingCornerRadiusEnum.optional().nullable(),
    }).optional().nullable(),
  }).optional().nullable(),
  footer: z.object({
    content: z.object({
      visibility: checkoutBrandingVisibilityEnum.optional().nullable(),
    }),
    position: checkoutBrandingFooterPositionEnum.optional().nullable(),
  }).optional().nullable(),
  header: z.object({
    logo: z.object({
      visibility: checkoutBrandingVisibilityEnum.optional().nullable(),
    }).optional().nullable(),
  }).optional().nullable(),
  main: z.object({
    section: checkoutBrandingSectionSchema.optional().nullable(),
  }).optional().nullable(),
  orderSummary: z.object({
    section: checkoutBrandingSectionSchema.optional().nullable(),
  }).optional().nullable(),
})

export type CheckoutBrandingPreviewFields = z.infer<typeof checkoutBrandingPreviewSchema>

export const checkoutBrandingCustomizationSchema = checkoutBrandingLayoutSchema.optional().nullable()
  .and(checkoutBrandingButtonsSchema.optional().nullable())
  .and(checkoutBrandingFormSchema.optional().nullable())
  .and(checkoutBrandingHeadingsSchema.optional().nullable())
  .and(checkoutBrandingPreviewSchema.optional().nullable())

export const checkoutBrandingCornerRadiusSchema = z.object({
  base: z.coerce.number().positive().optional().nullable(),
  large: z.coerce.number().positive().optional().nullable(),
  small: z.coerce.number().positive().optional().nullable(),
})

export const checkoutBrandingColorsSchema = z.object({
  global: checkoutBrandingColorGlobalSchema.optional().nullable(),
  schemes: z.object({
    scheme1: checkoutBrandingColorSchemeSchema.optional().nullable(),
    scheme2: checkoutBrandingColorSchemeSchema.optional().nullable(),
  }).optional().nullable(),
})

export type CheckoutBrandingColorsFields = z.infer<typeof checkoutBrandingColorsSchema>

export const checkoutBrandingTypographySchema = z.object({
  primary: checkoutBrandingFontGroupSchema.optional().nullable(),
  secondary: checkoutBrandingFontGroupSchema.optional().nullable(),
  size: checkoutBrandingFontSizeSchema.optional().nullable(),
})

export type CheckoutBrandingTypographyFields = z.infer<typeof checkoutBrandingTypographySchema>

export const checkoutBrandingDesignSystemSchema = z.object({
  colors: checkoutBrandingColorsSchema.optional().nullable(),
  cornerRadius: checkoutBrandingCornerRadiusSchema.optional().nullable(),
  typography: checkoutBrandingTypographySchema.optional().nullable(),
})

export const checkoutBrandingInputSchema = z.object({
  customizations: checkoutBrandingCustomizationSchema.nullable().optional(),
  designSystem: checkoutBrandingDesignSystemSchema.nullable().optional(),
})

export type CheckoutBrandingCornerRadiusFields = z.infer<typeof checkoutBrandingCornerRadiusSchema>

export const checkoutBrandingFormData = zfd.formData({
  checkoutProfileId: z.string().min(1),
  checkoutBrandingInput: zfd.json(checkoutBrandingInputSchema),
})

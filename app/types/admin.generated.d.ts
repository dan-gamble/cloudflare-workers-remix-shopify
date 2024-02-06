/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import * as AdminTypes from './admin.types.d.ts';

export type PopulateProductMutationVariables = AdminTypes.Exact<{
  input: AdminTypes.ProductInput;
}>;


export type PopulateProductMutation = { productCreate?: AdminTypes.Maybe<{ product?: AdminTypes.Maybe<(
      Pick<AdminTypes.Product, 'id' | 'title' | 'handle' | 'status'>
      & { variants: { edges: Array<{ node: Pick<AdminTypes.ProductVariant, 'id' | 'price' | 'barcode' | 'createdAt'> }> } }
    )> }> };

export type CheckoutBrandingFragmentFragment = { customizations?: AdminTypes.Maybe<{ checkbox?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingCheckbox, 'cornerRadius'>>, choiceList?: AdminTypes.Maybe<{ group?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingChoiceListGroup, 'spacing'>> }>, control?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingControl, 'border' | 'color' | 'cornerRadius' | 'labelPosition'>>, favicon?: AdminTypes.Maybe<{ image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'id' | 'url'>> }>, global?: AdminTypes.Maybe<(
      Pick<AdminTypes.CheckoutBrandingGlobal, 'cornerRadius'>
      & { typography?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingTypographyStyleGlobal, 'kerning' | 'letterCase'>> }
    )>, header?: AdminTypes.Maybe<(
      Pick<AdminTypes.CheckoutBrandingHeader, 'alignment' | 'position'>
      & { banner?: AdminTypes.Maybe<{ image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'id' | 'url'>> }>, logo?: AdminTypes.Maybe<(
        Pick<AdminTypes.CheckoutBrandingLogo, 'maxWidth'>
        & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'id' | 'url'>> }
      )> }
    )>, headingLevel1?: AdminTypes.Maybe<{ typography?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingTypographyStyle, 'font' | 'kerning' | 'letterCase' | 'size' | 'weight'>> }>, headingLevel2?: AdminTypes.Maybe<{ typography?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingTypographyStyle, 'font' | 'kerning' | 'letterCase' | 'size' | 'weight'>> }>, headingLevel3?: AdminTypes.Maybe<{ typography?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingTypographyStyle, 'font' | 'kerning' | 'letterCase' | 'size' | 'weight'>> }>, main?: AdminTypes.Maybe<(
      Pick<AdminTypes.CheckoutBrandingMain, 'colorScheme'>
      & { backgroundImage?: AdminTypes.Maybe<{ image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'id' | 'url'>> }> }
    )>, merchandiseThumbnail?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingMerchandiseThumbnail, 'border' | 'cornerRadius'>>, orderSummary?: AdminTypes.Maybe<(
      Pick<AdminTypes.CheckoutBrandingOrderSummary, 'colorScheme'>
      & { backgroundImage?: AdminTypes.Maybe<{ image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'id' | 'url'>> }> }
    )>, primaryButton?: AdminTypes.Maybe<(
      Pick<AdminTypes.CheckoutBrandingButton, 'background' | 'blockPadding' | 'border' | 'cornerRadius' | 'inlinePadding'>
      & { typography?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingTypographyStyle, 'font' | 'kerning' | 'letterCase' | 'size' | 'weight'>> }
    )>, secondaryButton?: AdminTypes.Maybe<(
      Pick<AdminTypes.CheckoutBrandingButton, 'background' | 'blockPadding' | 'border' | 'cornerRadius' | 'inlinePadding'>
      & { typography?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingTypographyStyle, 'font' | 'kerning' | 'letterCase' | 'size' | 'weight'>> }
    )>, select?: AdminTypes.Maybe<(
      Pick<AdminTypes.CheckoutBrandingSelect, 'border'>
      & { typography?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingTypographyStyle, 'font' | 'kerning' | 'letterCase' | 'size' | 'weight'>> }
    )>, textField?: AdminTypes.Maybe<(
      Pick<AdminTypes.CheckoutBrandingTextField, 'border'>
      & { typography?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingTypographyStyle, 'font' | 'kerning' | 'letterCase' | 'size' | 'weight'>> }
    )> }>, designSystem?: AdminTypes.Maybe<{ colors?: AdminTypes.Maybe<{ global?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingColorGlobal, 'accent' | 'brand' | 'critical' | 'decorative' | 'info' | 'success' | 'warning'>>, schemes?: AdminTypes.Maybe<{ scheme1?: AdminTypes.Maybe<{ base?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingColorRoles, 'accent' | 'background' | 'border' | 'decorative' | 'icon' | 'text'>>, control?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingControlColorRoles, 'accent' | 'background' | 'border' | 'decorative' | 'icon' | 'text'>>, primaryButton?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingButtonColorRoles, 'accent' | 'background' | 'border' | 'decorative' | 'icon' | 'text'>>, secondaryButton?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingButtonColorRoles, 'accent' | 'background' | 'border' | 'decorative' | 'icon' | 'text'>> }>, scheme2?: AdminTypes.Maybe<{ base?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingColorRoles, 'accent' | 'background' | 'border' | 'decorative' | 'icon' | 'text'>>, control?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingControlColorRoles, 'accent' | 'background' | 'border' | 'decorative' | 'icon' | 'text'>>, primaryButton?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingButtonColorRoles, 'accent' | 'background' | 'border' | 'decorative' | 'icon' | 'text'>>, secondaryButton?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingButtonColorRoles, 'accent' | 'background' | 'border' | 'decorative' | 'icon' | 'text'>> }> }> }>, cornerRadius?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingCornerRadiusVariables, 'base' | 'small' | 'large'>>, typography?: AdminTypes.Maybe<{ primary?: AdminTypes.Maybe<(
        Pick<AdminTypes.CheckoutBrandingFontGroup, 'name' | 'loadingStrategy'>
        & { base?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingCustomFont, 'sources' | 'weight'> | Pick<AdminTypes.CheckoutBrandingShopifyFont, 'sources' | 'weight'>>, bold?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingCustomFont, 'sources' | 'weight'> | Pick<AdminTypes.CheckoutBrandingShopifyFont, 'sources' | 'weight'>> }
      )>, secondary?: AdminTypes.Maybe<(
        Pick<AdminTypes.CheckoutBrandingFontGroup, 'name' | 'loadingStrategy'>
        & { base?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingCustomFont, 'sources' | 'weight'> | Pick<AdminTypes.CheckoutBrandingShopifyFont, 'sources' | 'weight'>>, bold?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingCustomFont, 'sources' | 'weight'> | Pick<AdminTypes.CheckoutBrandingShopifyFont, 'sources' | 'weight'>> }
      )>, size?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingFontSize, 'base' | 'ratio'>> }> }> };

export type CheckoutBrandingUpsertMutationVariables = AdminTypes.Exact<{
  checkoutBrandingInput: AdminTypes.CheckoutBrandingInput;
  checkoutProfileId: AdminTypes.Scalars['ID']['input'];
}>;


export type CheckoutBrandingUpsertMutation = { checkoutBrandingUpsert?: AdminTypes.Maybe<{ checkoutBranding?: AdminTypes.Maybe<{ customizations?: AdminTypes.Maybe<{ checkbox?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingCheckbox, 'cornerRadius'>>, choiceList?: AdminTypes.Maybe<{ group?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingChoiceListGroup, 'spacing'>> }>, control?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingControl, 'border' | 'color' | 'cornerRadius' | 'labelPosition'>>, favicon?: AdminTypes.Maybe<{ image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'id' | 'url'>> }>, global?: AdminTypes.Maybe<(
          Pick<AdminTypes.CheckoutBrandingGlobal, 'cornerRadius'>
          & { typography?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingTypographyStyleGlobal, 'kerning' | 'letterCase'>> }
        )>, header?: AdminTypes.Maybe<(
          Pick<AdminTypes.CheckoutBrandingHeader, 'alignment' | 'position'>
          & { banner?: AdminTypes.Maybe<{ image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'id' | 'url'>> }>, logo?: AdminTypes.Maybe<(
            Pick<AdminTypes.CheckoutBrandingLogo, 'maxWidth'>
            & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'id' | 'url'>> }
          )> }
        )>, headingLevel1?: AdminTypes.Maybe<{ typography?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingTypographyStyle, 'font' | 'kerning' | 'letterCase' | 'size' | 'weight'>> }>, headingLevel2?: AdminTypes.Maybe<{ typography?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingTypographyStyle, 'font' | 'kerning' | 'letterCase' | 'size' | 'weight'>> }>, headingLevel3?: AdminTypes.Maybe<{ typography?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingTypographyStyle, 'font' | 'kerning' | 'letterCase' | 'size' | 'weight'>> }>, main?: AdminTypes.Maybe<(
          Pick<AdminTypes.CheckoutBrandingMain, 'colorScheme'>
          & { backgroundImage?: AdminTypes.Maybe<{ image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'id' | 'url'>> }> }
        )>, merchandiseThumbnail?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingMerchandiseThumbnail, 'border' | 'cornerRadius'>>, orderSummary?: AdminTypes.Maybe<(
          Pick<AdminTypes.CheckoutBrandingOrderSummary, 'colorScheme'>
          & { backgroundImage?: AdminTypes.Maybe<{ image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'id' | 'url'>> }> }
        )>, primaryButton?: AdminTypes.Maybe<(
          Pick<AdminTypes.CheckoutBrandingButton, 'background' | 'blockPadding' | 'border' | 'cornerRadius' | 'inlinePadding'>
          & { typography?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingTypographyStyle, 'font' | 'kerning' | 'letterCase' | 'size' | 'weight'>> }
        )>, secondaryButton?: AdminTypes.Maybe<(
          Pick<AdminTypes.CheckoutBrandingButton, 'background' | 'blockPadding' | 'border' | 'cornerRadius' | 'inlinePadding'>
          & { typography?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingTypographyStyle, 'font' | 'kerning' | 'letterCase' | 'size' | 'weight'>> }
        )>, select?: AdminTypes.Maybe<(
          Pick<AdminTypes.CheckoutBrandingSelect, 'border'>
          & { typography?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingTypographyStyle, 'font' | 'kerning' | 'letterCase' | 'size' | 'weight'>> }
        )>, textField?: AdminTypes.Maybe<(
          Pick<AdminTypes.CheckoutBrandingTextField, 'border'>
          & { typography?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingTypographyStyle, 'font' | 'kerning' | 'letterCase' | 'size' | 'weight'>> }
        )> }>, designSystem?: AdminTypes.Maybe<{ colors?: AdminTypes.Maybe<{ global?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingColorGlobal, 'accent' | 'brand' | 'critical' | 'decorative' | 'info' | 'success' | 'warning'>>, schemes?: AdminTypes.Maybe<{ scheme1?: AdminTypes.Maybe<{ base?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingColorRoles, 'accent' | 'background' | 'border' | 'decorative' | 'icon' | 'text'>>, control?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingControlColorRoles, 'accent' | 'background' | 'border' | 'decorative' | 'icon' | 'text'>>, primaryButton?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingButtonColorRoles, 'accent' | 'background' | 'border' | 'decorative' | 'icon' | 'text'>>, secondaryButton?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingButtonColorRoles, 'accent' | 'background' | 'border' | 'decorative' | 'icon' | 'text'>> }>, scheme2?: AdminTypes.Maybe<{ base?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingColorRoles, 'accent' | 'background' | 'border' | 'decorative' | 'icon' | 'text'>>, control?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingControlColorRoles, 'accent' | 'background' | 'border' | 'decorative' | 'icon' | 'text'>>, primaryButton?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingButtonColorRoles, 'accent' | 'background' | 'border' | 'decorative' | 'icon' | 'text'>>, secondaryButton?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingButtonColorRoles, 'accent' | 'background' | 'border' | 'decorative' | 'icon' | 'text'>> }> }> }>, cornerRadius?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingCornerRadiusVariables, 'base' | 'small' | 'large'>>, typography?: AdminTypes.Maybe<{ primary?: AdminTypes.Maybe<(
            Pick<AdminTypes.CheckoutBrandingFontGroup, 'name' | 'loadingStrategy'>
            & { base?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingCustomFont, 'sources' | 'weight'> | Pick<AdminTypes.CheckoutBrandingShopifyFont, 'sources' | 'weight'>>, bold?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingCustomFont, 'sources' | 'weight'> | Pick<AdminTypes.CheckoutBrandingShopifyFont, 'sources' | 'weight'>> }
          )>, secondary?: AdminTypes.Maybe<(
            Pick<AdminTypes.CheckoutBrandingFontGroup, 'name' | 'loadingStrategy'>
            & { base?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingCustomFont, 'sources' | 'weight'> | Pick<AdminTypes.CheckoutBrandingShopifyFont, 'sources' | 'weight'>>, bold?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingCustomFont, 'sources' | 'weight'> | Pick<AdminTypes.CheckoutBrandingShopifyFont, 'sources' | 'weight'>> }
          )>, size?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingFontSize, 'base' | 'ratio'>> }> }> }>, userErrors: Array<Pick<AdminTypes.CheckoutBrandingUpsertUserError, 'field' | 'message'>> }> };

export type BrandingFragmentFragment = { customizations?: AdminTypes.Maybe<{ checkbox?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingCheckbox, 'cornerRadius'>>, control?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingControl, 'border' | 'color' | 'cornerRadius' | 'labelPosition'>>, favicon?: AdminTypes.Maybe<{ image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'id' | 'url'>> }>, global?: AdminTypes.Maybe<(
      Pick<AdminTypes.CheckoutBrandingGlobal, 'cornerRadius'>
      & { typography?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingTypographyStyleGlobal, 'kerning' | 'letterCase'>> }
    )>, header?: AdminTypes.Maybe<(
      Pick<AdminTypes.CheckoutBrandingHeader, 'alignment' | 'position'>
      & { banner?: AdminTypes.Maybe<{ image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'id' | 'url'>> }>, logo?: AdminTypes.Maybe<(
        Pick<AdminTypes.CheckoutBrandingLogo, 'maxWidth'>
        & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'id' | 'url'>> }
      )> }
    )>, headingLevel1?: AdminTypes.Maybe<{ typography?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingTypographyStyle, 'font' | 'kerning' | 'letterCase' | 'size' | 'weight'>> }>, headingLevel2?: AdminTypes.Maybe<{ typography?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingTypographyStyle, 'font' | 'kerning' | 'letterCase' | 'size' | 'weight'>> }>, headingLevel3?: AdminTypes.Maybe<{ typography?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingTypographyStyle, 'font' | 'kerning' | 'letterCase' | 'size' | 'weight'>> }>, main?: AdminTypes.Maybe<(
      Pick<AdminTypes.CheckoutBrandingMain, 'colorScheme'>
      & { backgroundImage?: AdminTypes.Maybe<{ image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'id' | 'url'>> }> }
    )>, merchandiseThumbnail?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingMerchandiseThumbnail, 'border' | 'cornerRadius'>>, orderSummary?: AdminTypes.Maybe<(
      Pick<AdminTypes.CheckoutBrandingOrderSummary, 'colorScheme'>
      & { backgroundImage?: AdminTypes.Maybe<{ image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'id' | 'url'>> }> }
    )>, primaryButton?: AdminTypes.Maybe<(
      Pick<AdminTypes.CheckoutBrandingButton, 'background' | 'blockPadding' | 'border' | 'cornerRadius' | 'inlinePadding'>
      & { typography?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingTypographyStyle, 'font' | 'kerning' | 'letterCase' | 'size' | 'weight'>> }
    )>, secondaryButton?: AdminTypes.Maybe<(
      Pick<AdminTypes.CheckoutBrandingButton, 'background' | 'blockPadding' | 'border' | 'cornerRadius' | 'inlinePadding'>
      & { typography?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingTypographyStyle, 'font' | 'kerning' | 'letterCase' | 'size' | 'weight'>> }
    )>, select?: AdminTypes.Maybe<(
      Pick<AdminTypes.CheckoutBrandingSelect, 'border'>
      & { typography?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingTypographyStyle, 'font' | 'kerning' | 'letterCase' | 'size' | 'weight'>> }
    )>, textField?: AdminTypes.Maybe<(
      Pick<AdminTypes.CheckoutBrandingTextField, 'border'>
      & { typography?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingTypographyStyle, 'font' | 'kerning' | 'letterCase' | 'size' | 'weight'>> }
    )> }>, designSystem?: AdminTypes.Maybe<{ colors?: AdminTypes.Maybe<{ global?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingColorGlobal, 'accent' | 'brand' | 'critical' | 'decorative' | 'info' | 'success' | 'warning'>>, schemes?: AdminTypes.Maybe<{ scheme1?: AdminTypes.Maybe<{ base?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingColorRoles, 'accent' | 'background' | 'border' | 'decorative' | 'icon' | 'text'>>, control?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingControlColorRoles, 'accent' | 'background' | 'border' | 'decorative' | 'icon' | 'text'>>, primaryButton?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingButtonColorRoles, 'accent' | 'background' | 'border' | 'decorative' | 'icon' | 'text'>>, secondaryButton?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingButtonColorRoles, 'accent' | 'background' | 'border' | 'decorative' | 'icon' | 'text'>> }>, scheme2?: AdminTypes.Maybe<{ base?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingColorRoles, 'accent' | 'background' | 'border' | 'decorative' | 'icon' | 'text'>>, control?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingControlColorRoles, 'accent' | 'background' | 'border' | 'decorative' | 'icon' | 'text'>>, primaryButton?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingButtonColorRoles, 'accent' | 'background' | 'border' | 'decorative' | 'icon' | 'text'>>, secondaryButton?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingButtonColorRoles, 'accent' | 'background' | 'border' | 'decorative' | 'icon' | 'text'>> }> }> }>, cornerRadius?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingCornerRadiusVariables, 'base' | 'small' | 'large'>>, typography?: AdminTypes.Maybe<{ primary?: AdminTypes.Maybe<(
        Pick<AdminTypes.CheckoutBrandingFontGroup, 'name' | 'loadingStrategy'>
        & { base?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingCustomFont, 'sources' | 'weight'> | Pick<AdminTypes.CheckoutBrandingShopifyFont, 'sources' | 'weight'>>, bold?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingCustomFont, 'sources' | 'weight'> | Pick<AdminTypes.CheckoutBrandingShopifyFont, 'sources' | 'weight'>> }
      )>, secondary?: AdminTypes.Maybe<(
        Pick<AdminTypes.CheckoutBrandingFontGroup, 'name' | 'loadingStrategy'>
        & { base?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingCustomFont, 'sources' | 'weight'> | Pick<AdminTypes.CheckoutBrandingShopifyFont, 'sources' | 'weight'>>, bold?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingCustomFont, 'sources' | 'weight'> | Pick<AdminTypes.CheckoutBrandingShopifyFont, 'sources' | 'weight'>> }
      )>, size?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingFontSize, 'base' | 'ratio'>> }> }> };

export type CheckoutBrandingQueryVariables = AdminTypes.Exact<{
  checkoutProfileId: AdminTypes.Scalars['ID']['input'];
}>;


export type CheckoutBrandingQuery = { checkoutBranding?: AdminTypes.Maybe<{ customizations?: AdminTypes.Maybe<{ checkbox?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingCheckbox, 'cornerRadius'>>, control?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingControl, 'border' | 'color' | 'cornerRadius' | 'labelPosition'>>, favicon?: AdminTypes.Maybe<{ image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'id' | 'url'>> }>, global?: AdminTypes.Maybe<(
        Pick<AdminTypes.CheckoutBrandingGlobal, 'cornerRadius'>
        & { typography?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingTypographyStyleGlobal, 'kerning' | 'letterCase'>> }
      )>, header?: AdminTypes.Maybe<(
        Pick<AdminTypes.CheckoutBrandingHeader, 'alignment' | 'position'>
        & { banner?: AdminTypes.Maybe<{ image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'id' | 'url'>> }>, logo?: AdminTypes.Maybe<(
          Pick<AdminTypes.CheckoutBrandingLogo, 'maxWidth'>
          & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'id' | 'url'>> }
        )> }
      )>, headingLevel1?: AdminTypes.Maybe<{ typography?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingTypographyStyle, 'font' | 'kerning' | 'letterCase' | 'size' | 'weight'>> }>, headingLevel2?: AdminTypes.Maybe<{ typography?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingTypographyStyle, 'font' | 'kerning' | 'letterCase' | 'size' | 'weight'>> }>, headingLevel3?: AdminTypes.Maybe<{ typography?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingTypographyStyle, 'font' | 'kerning' | 'letterCase' | 'size' | 'weight'>> }>, main?: AdminTypes.Maybe<(
        Pick<AdminTypes.CheckoutBrandingMain, 'colorScheme'>
        & { backgroundImage?: AdminTypes.Maybe<{ image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'id' | 'url'>> }> }
      )>, merchandiseThumbnail?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingMerchandiseThumbnail, 'border' | 'cornerRadius'>>, orderSummary?: AdminTypes.Maybe<(
        Pick<AdminTypes.CheckoutBrandingOrderSummary, 'colorScheme'>
        & { backgroundImage?: AdminTypes.Maybe<{ image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'id' | 'url'>> }> }
      )>, primaryButton?: AdminTypes.Maybe<(
        Pick<AdminTypes.CheckoutBrandingButton, 'background' | 'blockPadding' | 'border' | 'cornerRadius' | 'inlinePadding'>
        & { typography?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingTypographyStyle, 'font' | 'kerning' | 'letterCase' | 'size' | 'weight'>> }
      )>, secondaryButton?: AdminTypes.Maybe<(
        Pick<AdminTypes.CheckoutBrandingButton, 'background' | 'blockPadding' | 'border' | 'cornerRadius' | 'inlinePadding'>
        & { typography?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingTypographyStyle, 'font' | 'kerning' | 'letterCase' | 'size' | 'weight'>> }
      )>, select?: AdminTypes.Maybe<(
        Pick<AdminTypes.CheckoutBrandingSelect, 'border'>
        & { typography?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingTypographyStyle, 'font' | 'kerning' | 'letterCase' | 'size' | 'weight'>> }
      )>, textField?: AdminTypes.Maybe<(
        Pick<AdminTypes.CheckoutBrandingTextField, 'border'>
        & { typography?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingTypographyStyle, 'font' | 'kerning' | 'letterCase' | 'size' | 'weight'>> }
      )> }>, designSystem?: AdminTypes.Maybe<{ colors?: AdminTypes.Maybe<{ global?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingColorGlobal, 'accent' | 'brand' | 'critical' | 'decorative' | 'info' | 'success' | 'warning'>>, schemes?: AdminTypes.Maybe<{ scheme1?: AdminTypes.Maybe<{ base?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingColorRoles, 'accent' | 'background' | 'border' | 'decorative' | 'icon' | 'text'>>, control?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingControlColorRoles, 'accent' | 'background' | 'border' | 'decorative' | 'icon' | 'text'>>, primaryButton?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingButtonColorRoles, 'accent' | 'background' | 'border' | 'decorative' | 'icon' | 'text'>>, secondaryButton?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingButtonColorRoles, 'accent' | 'background' | 'border' | 'decorative' | 'icon' | 'text'>> }>, scheme2?: AdminTypes.Maybe<{ base?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingColorRoles, 'accent' | 'background' | 'border' | 'decorative' | 'icon' | 'text'>>, control?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingControlColorRoles, 'accent' | 'background' | 'border' | 'decorative' | 'icon' | 'text'>>, primaryButton?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingButtonColorRoles, 'accent' | 'background' | 'border' | 'decorative' | 'icon' | 'text'>>, secondaryButton?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingButtonColorRoles, 'accent' | 'background' | 'border' | 'decorative' | 'icon' | 'text'>> }> }> }>, cornerRadius?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingCornerRadiusVariables, 'base' | 'small' | 'large'>>, typography?: AdminTypes.Maybe<{ primary?: AdminTypes.Maybe<(
          Pick<AdminTypes.CheckoutBrandingFontGroup, 'name' | 'loadingStrategy'>
          & { base?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingCustomFont, 'sources' | 'weight'> | Pick<AdminTypes.CheckoutBrandingShopifyFont, 'sources' | 'weight'>>, bold?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingCustomFont, 'sources' | 'weight'> | Pick<AdminTypes.CheckoutBrandingShopifyFont, 'sources' | 'weight'>> }
        )>, secondary?: AdminTypes.Maybe<(
          Pick<AdminTypes.CheckoutBrandingFontGroup, 'name' | 'loadingStrategy'>
          & { base?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingCustomFont, 'sources' | 'weight'> | Pick<AdminTypes.CheckoutBrandingShopifyFont, 'sources' | 'weight'>>, bold?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingCustomFont, 'sources' | 'weight'> | Pick<AdminTypes.CheckoutBrandingShopifyFont, 'sources' | 'weight'>> }
        )>, size?: AdminTypes.Maybe<Pick<AdminTypes.CheckoutBrandingFontSize, 'base' | 'ratio'>> }> }> }> };

export type CustomFontFragment = (
  { __typename: 'GenericFile' }
  & Pick<AdminTypes.GenericFile, 'id' | 'mimeType' | 'alt' | 'createdAt' | 'fileStatus' | 'originalFileSize' | 'url'>
);

export type CheckoutProfilesQueryVariables = AdminTypes.Exact<{ [key: string]: never; }>;


export type CheckoutProfilesQuery = { checkoutProfiles: { nodes: Array<Pick<AdminTypes.CheckoutProfile, 'id' | 'name' | 'isPublished'>> }, customFonts: { nodes: Array<(
      { __typename: 'GenericFile' }
      & Pick<AdminTypes.GenericFile, 'id' | 'mimeType' | 'alt' | 'createdAt' | 'fileStatus' | 'originalFileSize' | 'url'>
    ) | { __typename: 'MediaImage' | 'Video' }> }, backgroundStyles?: AdminTypes.Maybe<(
    Pick<AdminTypes.__Type, 'name'>
    & { enumValues?: AdminTypes.Maybe<Array<Pick<AdminTypes.__EnumValue, 'name'>>> }
  )>, border?: AdminTypes.Maybe<(
    Pick<AdminTypes.__Type, 'name'>
    & { enumValues?: AdminTypes.Maybe<Array<Pick<AdminTypes.__EnumValue, 'name'>>> }
  )>, colorSelection?: AdminTypes.Maybe<(
    Pick<AdminTypes.__Type, 'name'>
    & { enumValues?: AdminTypes.Maybe<Array<Pick<AdminTypes.__EnumValue, 'name'>>> }
  )>, colorSchemeSelection?: AdminTypes.Maybe<(
    Pick<AdminTypes.__Type, 'name'>
    & { enumValues?: AdminTypes.Maybe<Array<Pick<AdminTypes.__EnumValue, 'name'>>> }
  )>, cornerRadius?: AdminTypes.Maybe<(
    Pick<AdminTypes.__Type, 'name'>
    & { enumValues?: AdminTypes.Maybe<Array<Pick<AdminTypes.__EnumValue, 'name'>>> }
  )>, fontLoadingStrategies?: AdminTypes.Maybe<(
    Pick<AdminTypes.__Type, 'name'>
    & { enumValues?: AdminTypes.Maybe<Array<Pick<AdminTypes.__EnumValue, 'name'>>> }
  )>, globalCornerRadius?: AdminTypes.Maybe<(
    Pick<AdminTypes.__Type, 'name'>
    & { enumValues?: AdminTypes.Maybe<Array<Pick<AdminTypes.__EnumValue, 'name'>>> }
  )>, headerAlignment?: AdminTypes.Maybe<(
    Pick<AdminTypes.__Type, 'name'>
    & { enumValues?: AdminTypes.Maybe<Array<Pick<AdminTypes.__EnumValue, 'name'>>> }
  )>, headerPosition?: AdminTypes.Maybe<(
    Pick<AdminTypes.__Type, 'name'>
    & { enumValues?: AdminTypes.Maybe<Array<Pick<AdminTypes.__EnumValue, 'name'>>> }
  )>, labelPosition?: AdminTypes.Maybe<(
    Pick<AdminTypes.__Type, 'name'>
    & { enumValues?: AdminTypes.Maybe<Array<Pick<AdminTypes.__EnumValue, 'name'>>> }
  )>, simpleBorder?: AdminTypes.Maybe<(
    Pick<AdminTypes.__Type, 'name'>
    & { enumValues?: AdminTypes.Maybe<Array<Pick<AdminTypes.__EnumValue, 'name'>>> }
  )>, spacing?: AdminTypes.Maybe<(
    Pick<AdminTypes.__Type, 'name'>
    & { enumValues?: AdminTypes.Maybe<Array<Pick<AdminTypes.__EnumValue, 'name'>>> }
  )>, typographyFont?: AdminTypes.Maybe<(
    Pick<AdminTypes.__Type, 'name'>
    & { enumValues?: AdminTypes.Maybe<Array<Pick<AdminTypes.__EnumValue, 'name'>>> }
  )>, typographyKerning?: AdminTypes.Maybe<(
    Pick<AdminTypes.__Type, 'name'>
    & { enumValues?: AdminTypes.Maybe<Array<Pick<AdminTypes.__EnumValue, 'name'>>> }
  )>, typographyLetterCase?: AdminTypes.Maybe<(
    Pick<AdminTypes.__Type, 'name'>
    & { enumValues?: AdminTypes.Maybe<Array<Pick<AdminTypes.__EnumValue, 'name'>>> }
  )>, typographySize?: AdminTypes.Maybe<(
    Pick<AdminTypes.__Type, 'name'>
    & { enumValues?: AdminTypes.Maybe<Array<Pick<AdminTypes.__EnumValue, 'name'>>> }
  )>, typographyWeight?: AdminTypes.Maybe<(
    Pick<AdminTypes.__Type, 'name'>
    & { enumValues?: AdminTypes.Maybe<Array<Pick<AdminTypes.__EnumValue, 'name'>>> }
  )> };

export type ShopLocalisationQueryVariables = AdminTypes.Exact<{ [key: string]: never; }>;


export type ShopLocalisationQuery = { shop: Pick<AdminTypes.Shop, 'currencyCode'> };

export type AppIdQueryVariables = AdminTypes.Exact<{ [key: string]: never; }>;


export type AppIdQuery = { app?: AdminTypes.Maybe<Pick<AdminTypes.App, 'id'>> };

interface GeneratedQueryTypes {
  "#graphql\n  #graphql\n  fragment BrandingFragment on CheckoutBranding {\n    customizations {\n      checkbox {\n        cornerRadius\n      }\n      control {\n        border\n        color\n        cornerRadius\n        labelPosition\n      }\n      favicon {\n        image {\n          id\n          url\n        }\n      }\n      global {\n        cornerRadius\n        typography {\n          kerning\n          letterCase\n        }\n      }\n      header {\n        alignment\n        banner {\n          image {\n            id\n            url\n          }\n        }\n        logo {\n          image {\n            id\n            url\n          }\n          maxWidth\n        }\n        position\n      }\n      headingLevel1 {\n        typography {\n          font\n          kerning\n          letterCase\n          size\n          weight\n        }\n      }\n      headingLevel2 {\n        typography {\n          font\n          kerning\n          letterCase\n          size\n          weight\n        }\n      }\n      headingLevel3 {\n        typography {\n          font\n          kerning\n          letterCase\n          size\n          weight\n        }\n      }\n      main {\n        backgroundImage {\n          image {\n            id\n            url\n          }\n        }\n        colorScheme\n      }\n      merchandiseThumbnail {\n        border\n        cornerRadius\n      }\n      orderSummary {\n        colorScheme\n        backgroundImage {\n          image {\n            id\n            url\n          }\n        }\n      }\n      primaryButton {\n        background\n        blockPadding\n        border\n        cornerRadius\n        inlinePadding\n        typography {\n          font\n          kerning\n          letterCase\n          size\n          weight\n        }\n      }\n      secondaryButton {\n        background\n        blockPadding\n        border\n        cornerRadius\n        inlinePadding\n        typography {\n          font\n          kerning\n          letterCase\n          size\n          weight\n        }\n      }\n      select {\n        border\n        typography {\n          font\n          kerning\n          letterCase\n          size\n          weight\n        }\n      }\n      textField {\n        border\n        typography {\n          font\n          kerning\n          letterCase\n          size\n          weight\n        }\n      }\n    }\n    designSystem {\n      colors {\n        global {\n          accent\n          brand\n          critical\n          decorative\n          info\n          success\n          warning\n        }\n        schemes {\n          scheme1 {\n            base {\n              accent\n              background\n              border\n              decorative\n              icon\n              text\n            }\n            control {\n              accent\n              background\n              border\n              decorative\n              icon\n              text\n            }\n            primaryButton {\n              accent\n              background\n              border\n              decorative\n              icon\n              text\n            }\n            secondaryButton {\n              accent\n              background\n              border\n              decorative\n              icon\n              text\n            }\n          }\n          scheme2 {\n            base {\n              accent\n              background\n              border\n              decorative\n              icon\n              text\n            }\n            control {\n              accent\n              background\n              border\n              decorative\n              icon\n              text\n            }\n            primaryButton {\n              accent\n              background\n              border\n              decorative\n              icon\n              text\n            }\n            secondaryButton {\n              accent\n              background\n              border\n              decorative\n              icon\n              text\n            }\n          }\n        }\n      }\n      cornerRadius {\n        base\n        small\n        large\n      }\n      typography {\n        primary {\n          name\n          base {\n            sources\n            weight\n          }\n          bold {\n            sources\n            weight\n          }\n          loadingStrategy\n        }\n        secondary {\n          name\n          base {\n            sources\n            weight\n          }\n          bold {\n            sources\n            weight\n          }\n          loadingStrategy\n        }\n        size {\n          base\n          ratio\n        }\n      }\n    }\n  }\n\n\n  query checkoutBranding($checkoutProfileId: ID!) {\n    checkoutBranding(checkoutProfileId: $checkoutProfileId) {\n      ...BrandingFragment\n    }\n  }\n": {return: CheckoutBrandingQuery, variables: CheckoutBrandingQueryVariables},
  "#graphql\n  fragment CustomFont on GenericFile {\n    __typename\n    id\n    mimeType\n    alt\n    createdAt\n    fileStatus\n    originalFileSize\n    url\n  }\n\n  query checkoutProfiles {\n    checkoutProfiles(first: 100) {\n      nodes {\n        id\n        name\n        isPublished\n      }\n    }\n\n    customFonts: files(\n      first: 250,\n      query: \"media_type:GENERIC_FILE status:ready filename:*.woff\",\n      sortKey: FILENAME\n    ) {\n      nodes {\n        __typename\n\n        ...CustomFont\n      }\n    }\n\n    backgroundStyles: __type(name: \"CheckoutBrandingBackgroundStyle\") {\n      name\n      enumValues {\n        name\n      }\n    }\n    border: __type(name: \"CheckoutBrandingBorder\") {\n      name\n      enumValues {\n        name\n      }\n    }\n    colorSelection: __type(name: \"CheckoutBrandingColorSelection\") {\n      name\n      enumValues {\n        name\n      }\n    }\n    colorSchemeSelection: __type(name: \"CheckoutBrandingColorSchemeSelection\") {\n      name\n      enumValues {\n        name\n      }\n    }\n    cornerRadius: __type(name: \"CheckoutBrandingCornerRadius\") {\n      name\n      enumValues {\n        name\n      }\n    }\n    fontLoadingStrategies: __type(name: \"CheckoutBrandingFontLoadingStrategy\") {\n      name\n      enumValues {\n        name\n      }\n    }\n    globalCornerRadius: __type(name: \"CheckoutBrandingGlobalCornerRadius\") {\n      name\n      enumValues {\n        name\n      }\n    }\n    headerAlignment: __type(name: \"CheckoutBrandingHeaderAlignment\") {\n      name\n      enumValues {\n        name\n      }\n    }\n    headerPosition: __type(name: \"CheckoutBrandingHeaderPosition\") {\n      name\n      enumValues {\n        name\n      }\n    }\n    labelPosition: __type(name: \"CheckoutBrandingLabelPosition\") {\n      name\n      enumValues {\n        name\n      }\n    }\n    simpleBorder: __type(name: \"CheckoutBrandingSimpleBorder\") {\n      name\n      enumValues {\n        name\n      }\n    }\n    spacing: __type(name: \"CheckoutBrandingSpacing\") {\n      name\n      enumValues {\n        name\n      }\n    }\n    typographyFont: __type(name: \"CheckoutBrandingTypographyFont\") {\n      name\n      enumValues {\n        name\n      }\n    }\n    typographyKerning: __type(name: \"CheckoutBrandingTypographyKerning\") {\n      name\n      enumValues {\n        name\n      }\n    }\n    typographyLetterCase: __type(name: \"CheckoutBrandingTypographyLetterCase\") {\n      name\n      enumValues {\n        name\n      }\n    }\n    typographySize: __type(name: \"CheckoutBrandingTypographySize\") {\n      name\n      enumValues {\n        name\n      }\n    }\n    typographyWeight: __type(name: \"CheckoutBrandingTypographyWeight\") {\n      name\n      enumValues {\n        name\n      }\n    }\n  }\n": {return: CheckoutProfilesQuery, variables: CheckoutProfilesQueryVariables},
  "#graphql\n    query shopLocalisation {\n      shop {\n        currencyCode\n      }\n    }\n  ": {return: ShopLocalisationQuery, variables: ShopLocalisationQueryVariables},
  "#graphql\n    query appId {\n      app {\n        id\n      }\n    }\n  ": {return: AppIdQuery, variables: AppIdQueryVariables},
}

interface GeneratedMutationTypes {
  "#graphql\n    mutation populateProduct($input: ProductInput!) {\n      productCreate(input: $input) {\n        product {\n          id\n          title\n          handle\n          status\n          variants(first: 10) {\n            edges {\n              node {\n                id\n                price\n                barcode\n                createdAt\n              }\n            }\n          }\n        }\n      }\n    }": {return: PopulateProductMutation, variables: PopulateProductMutationVariables},
  "#graphql\n  #graphql\n  fragment CheckoutBrandingFragment on CheckoutBranding {\n    customizations {\n      checkbox {\n        cornerRadius\n      }\n      choiceList {\n        group {\n          spacing\n        }\n      }\n      control {\n        border\n        color\n        cornerRadius\n        labelPosition\n      }\n      favicon {\n        image {\n          id\n          url\n        }\n      }\n      global {\n        cornerRadius\n        typography {\n          kerning\n          letterCase\n        }\n      }\n      header {\n        alignment\n        banner {\n          image {\n            id\n            url\n          }\n        }\n        logo {\n          image {\n            id\n            url\n          }\n          maxWidth\n        }\n        position\n      }\n      headingLevel1 {\n        typography {\n          font\n          kerning\n          letterCase\n          size\n          weight\n        }\n      }\n      headingLevel2 {\n        typography {\n          font\n          kerning\n          letterCase\n          size\n          weight\n        }\n      }\n      headingLevel3 {\n        typography {\n          font\n          kerning\n          letterCase\n          size\n          weight\n        }\n      }\n      main {\n        backgroundImage {\n          image {\n            id\n            url\n          }\n        }\n        colorScheme\n      }\n      merchandiseThumbnail {\n        border\n        cornerRadius\n      }\n      orderSummary {\n        colorScheme\n        backgroundImage {\n          image {\n            id\n            url\n          }\n        }\n      }\n      primaryButton {\n        background\n        blockPadding\n        border\n        cornerRadius\n        inlinePadding\n        typography {\n          font\n          kerning\n          letterCase\n          size\n          weight\n        }\n      }\n      secondaryButton {\n        background\n        blockPadding\n        border\n        cornerRadius\n        inlinePadding\n        typography {\n          font\n          kerning\n          letterCase\n          size\n          weight\n        }\n      }\n      select {\n        border\n        typography {\n          font\n          kerning\n          letterCase\n          size\n          weight\n        }\n      }\n      textField {\n        border\n        typography {\n          font\n          kerning\n          letterCase\n          size\n          weight\n        }\n      }\n    }\n    designSystem {\n      colors {\n        global {\n          accent\n          brand\n          critical\n          decorative\n          info\n          success\n          warning\n        }\n        schemes {\n          scheme1 {\n            base {\n              accent\n              background\n              border\n              decorative\n              icon\n              text\n            }\n            control {\n              accent\n              background\n              border\n              decorative\n              icon\n              text\n            }\n            primaryButton {\n              accent\n              background\n              border\n              decorative\n              icon\n              text\n            }\n            secondaryButton {\n              accent\n              background\n              border\n              decorative\n              icon\n              text\n            }\n          }\n          scheme2 {\n            base {\n              accent\n              background\n              border\n              decorative\n              icon\n              text\n            }\n            control {\n              accent\n              background\n              border\n              decorative\n              icon\n              text\n            }\n            primaryButton {\n              accent\n              background\n              border\n              decorative\n              icon\n              text\n            }\n            secondaryButton {\n              accent\n              background\n              border\n              decorative\n              icon\n              text\n            }\n          }\n        }\n      }\n      cornerRadius {\n        base\n        small\n        large\n      }\n      typography {\n        primary {\n          name\n          base {\n            sources\n            weight\n          }\n          bold {\n            sources\n            weight\n          }\n          loadingStrategy\n        }\n        secondary {\n          name\n          base {\n            sources\n            weight\n          }\n          bold {\n            sources\n            weight\n          }\n          loadingStrategy\n        }\n        size {\n          base\n          ratio\n        }\n      }\n    }\n  }\n\n\n  mutation checkoutBrandingUpsert($checkoutBrandingInput: CheckoutBrandingInput!, $checkoutProfileId: ID!) {\n    checkoutBrandingUpsert(checkoutBrandingInput: $checkoutBrandingInput, checkoutProfileId: $checkoutProfileId) {\n      checkoutBranding {\n        ...CheckoutBrandingFragment\n      }\n\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n": {return: CheckoutBrandingUpsertMutation, variables: CheckoutBrandingUpsertMutationVariables},
}
declare module '@shopify/admin-api-client' {
  type InputMaybe<T> = AdminTypes.InputMaybe<T>;
  interface AdminQueries extends GeneratedQueryTypes {}
  interface AdminMutations extends GeneratedMutationTypes {}
}

import { BlockStack, Box, Divider, InlineCode, InlineGrid, Text } from '@shopify/polaris'
import { CornerRadiusEnum } from '~/routes/app.branding._index/components/enums/corner-radius-enum'
import { useCheckoutBranding } from '~/routes/app.branding/route'
import { TypographyKerningEnum } from '~/routes/app.branding._index/components/enums/typography-kerning-enum'
import { TypographyLetterCaseEnum } from '~/routes/app.branding._index/components/enums/typography-letter-case-enum'
import { HeaderAlignmentEnum } from '~/routes/app.branding._index/components/enums/header-alignment-enum'
import { HeaderPositionEnum } from '~/routes/app.branding._index/components/enums/header-position-enum'
import { ColourSchemeSelectionEnum } from '~/routes/app.branding._index/components/enums/colour-scheme-selection-enum'
import { SimpleBorderEnum } from '~/routes/app.branding._index/components/enums/simple-border-enum'
import { FilePicker } from '~/routes/app.files-manager._index/components/file-picker/file-picker'
import { RangeSlider } from '~/components/range-slider'
import React from 'react'
import { Checkbox } from '~/components/checkbox'
import { FooterPositionEnum } from '~/routes/app.branding._index/components/enums/footer-position-enum'
import { SectionBlock } from '~/routes/app.branding._index/components/section-block'
import { GlobalCornerRadiusEnum } from '~/routes/app.branding._index/components/enums/global-corner-radius-enum'

export function LayoutTab() {
  const checkoutBranding = useCheckoutBranding()

  return (
    <>
      <Box paddingInline="500" paddingBlockStart="200" paddingBlockEnd="500">
        <BlockStack gap="200">
          <Text variant="headingSm" as="h3">Buyer journey</Text>

          <BlockStack gap="400">
            <Checkbox
              label="Hide breadcrumbs"
              helpText="The customizations for the breadcrumbs that represent a buyer's journey to the checkout."
              control={checkoutBranding.forms.preview.control}
              name="buyerJourney.visibility"
            />
          </BlockStack>
        </BlockStack>
      </Box>

      <Divider />

      <Box padding="500">
        <BlockStack gap="200">
          <Text variant="headingSm" as="h3">Cart link</Text>

          <BlockStack gap="400">
            <Checkbox
              label="Hide link to cart"
              helpText={
                <Text as="p">The input for checkout cart link customizations. For example, by setting the visibility field to <InlineCode>HIDDEN</InlineCode>, you can hide the cart icon in the header for one-page checkout, and the cart link in breadcrumbs in three-page checkout.</Text>
              }
              control={checkoutBranding.forms.preview.control}
              name="cartLink.visibility"
            />
          </BlockStack>
        </BlockStack>
      </Box>

      <Divider />

      <Box padding="500">
        <BlockStack gap="200">
          <Text variant="headingSm" as="h3">Express checkout</Text>

          <BlockStack gap="400">
            <Text as="p">The express checkout customizations.</Text>

            <CornerRadiusEnum
              control={checkoutBranding.forms.preview.control}
              name="expressCheckout.button.cornerRadius"
              label="Buttons corner radius"
            />
          </BlockStack>
        </BlockStack>
      </Box>

      <Divider />

      <Box padding="500">
        <BlockStack gap="200">
          <Text variant="headingSm" as="h3">
            Favicon
          </Text>

          <BlockStack gap="400">
            <FilePicker
              control={checkoutBranding.forms.layout.control}
              name="favicon.mediaImageId"
              key="Favicon"
              label="Image"
              helpText="The favicon image (must be of PNG format)."
              baseQuery="status:ready media_type:Image filename:*.png used_in:none"
              defaultImageUrl={checkoutBranding.forms.layout.imageUrls.favicon ?? ''}
              onResetClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault()
                e.stopPropagation()

                checkoutBranding.forms.layout.resetField('favicon.mediaImageId')
              }}
            />
          </BlockStack>
        </BlockStack>
      </Box>

      <Divider />

      <Box padding="500">
        <BlockStack gap="200">
          <Text variant="headingSm" as="h3">Footer</Text>

          <BlockStack gap="400">
            <Checkbox
              label="Hide footer content"
              helpText="The visibility settings for footer content."
              control={checkoutBranding.forms.preview.control}
              name="footer.content.visibility"
            />

            <FooterPositionEnum
              control={checkoutBranding.forms.preview.control}
              name="footer.position"
            />
          </BlockStack>
        </BlockStack>
      </Box>

      <Divider />

      <Box padding="500">
        <BlockStack gap="200">
          <Text variant="headingSm" as="h3">
            Global
          </Text>

          <BlockStack gap="400">
            <BlockStack gap="400">
              <InlineGrid gap="300" columns={2}>
                <GlobalCornerRadiusEnum
                  control={checkoutBranding.forms.layout.control}
                  name="global.cornerRadius"
                />

                <TypographyKerningEnum
                  control={checkoutBranding.forms.layout.control}
                  name="global.typography.kerning"
                />

                <TypographyLetterCaseEnum
                  control={checkoutBranding.forms.layout.control}
                  name="global.typography.letterCase"
                />
              </InlineGrid>
            </BlockStack>
          </BlockStack>
        </BlockStack>
      </Box>

      <Divider />

      <Box padding="500">
        <BlockStack gap="200">
          <Text variant="headingSm" as="h3">
            Header
          </Text>

          <BlockStack gap="400">
            <FilePicker
              control={checkoutBranding.forms.layout.control}
              name="header.banner.mediaImageId"
              key="Banner"
              label="Banner"
              helpText="The background image of the header (must not be of SVG format)."
              baseQuery="status:ready media_type:Image -filename:*.svg used_in:none"
              defaultImageUrl={checkoutBranding.forms.layout.imageUrls.headerBanner ?? ''}
              onResetClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault()
                e.stopPropagation()

                checkoutBranding.forms.layout.resetField('header.banner.mediaImageId')
              }}
            />

            <BlockStack gap="200">
              <FilePicker
                control={checkoutBranding.forms.layout.control}
                name="header.logo.image.mediaImageId"
                key="Logo"
                label="Logo"
                helpText="The logo image (must not be of SVG format)."
                baseQuery="status:ready media_type:Image -filename:*.svg used_in:none"
                defaultImageUrl={checkoutBranding.forms.layout.imageUrls.headerLogo ?? ''}
                onResetClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault()
                  e.stopPropagation()

                  checkoutBranding.forms.layout.resetField('header.logo.image.mediaImageId')
                }}
              />

              <Box paddingInline="200">
                <RangeSlider
                  label="Max width"
                  control={checkoutBranding.forms.layout.control}
                  name="header.logo.maxWidth"
                  output
                  min={50}
                  max={500}
                  renderSuffix={value => (
                    <p
                      style={{
                        minWidth: '24px',
                        textAlign: 'right',
                      }}
                    >
                      {value}px
                    </p>
                  )}
                />
              </Box>
            </BlockStack>

            <Checkbox
              label="Hide logo"
              helpText="The visibility of the logo."
              control={checkoutBranding.forms.preview.control}
              name="header.logo.visibility"
            />

            <InlineGrid gap="300" columns={2}>
              <HeaderAlignmentEnum
                control={checkoutBranding.forms.layout.control}
                name="header.alignment"
              />

              <HeaderPositionEnum
                control={checkoutBranding.forms.layout.control}
                name="header.position"
              />
            </InlineGrid>
          </BlockStack>
        </BlockStack>
      </Box>

      <Divider />

      <Box padding="500">
        <BlockStack gap="200">
          <Text variant="headingSm" as="h3">
            Main
          </Text>

          <BlockStack gap="400">
            <FilePicker
              control={checkoutBranding.forms.layout.control}
              name="main.backgroundImage.mediaImageId"
              key="Main Background Image"
              label="Background image"
              helpText="The background image of the main area (must not be of SVG format)."
              baseQuery="status:ready media_type:Image -filename:*.svg used_in:none"
              defaultImageUrl={checkoutBranding.forms.layout.imageUrls.mainBackgroundImage ?? ''}
              onResetClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault()
                e.stopPropagation()

                checkoutBranding.forms.layout.resetField('main.backgroundImage.mediaImageId')
              }}
            />

            <ColourSchemeSelectionEnum
              control={checkoutBranding.forms.layout.control}
              name="main.colorScheme"
            />

            <SectionBlock
              leadingKey="main"
              control={checkoutBranding.forms.preview.control}
            />
          </BlockStack>
        </BlockStack>
      </Box>

      <Divider />

      <Box padding="500">
        <BlockStack gap="200">
          <Text variant="headingSm" as="h3">
            Order summary
          </Text>

          <BlockStack gap="400">
            <FilePicker
              control={checkoutBranding.forms.layout.control}
              name="orderSummary.backgroundImage.mediaImageId"
              key="Order Summary Background Image"
              label="Background image"
              helpText="The background image of the order summary (must not be of SVG format)."
              baseQuery="status:ready media_type:Image -filename:*.svg used_in:none"
              defaultImageUrl={checkoutBranding.forms.layout.imageUrls.orderSummaryBackgroundImage ?? ''}
              onResetClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault()
                e.stopPropagation()

                checkoutBranding.forms.layout.resetField('orderSummary.backgroundImage.mediaImageId')
              }}
            />

            <ColourSchemeSelectionEnum
              control={checkoutBranding.forms.layout.control}
              name="orderSummary.colorScheme"
            />

            <SectionBlock
              leadingKey="orderSummary"
              control={checkoutBranding.forms.preview.control}
            />
          </BlockStack>
        </BlockStack>
      </Box>

      <Divider />

      <Box padding="500">
        <BlockStack gap="200">
          <Text variant="headingSm" as="h3">
            Merchandise thumbnails
          </Text>

          <BlockStack gap="400">
            <BlockStack gap="400">
              <InlineGrid gap="300" columns={2}>
                <SimpleBorderEnum
                  control={checkoutBranding.forms.layout.control}
                  name="merchandiseThumbnail.border"
                />

                <CornerRadiusEnum
                  control={checkoutBranding.forms.layout.control}
                  name="merchandiseThumbnail.cornerRadius"
                />
              </InlineGrid>
            </BlockStack>
          </BlockStack>
        </BlockStack>
      </Box>
    </>
  )
}

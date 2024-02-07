import { BlockStack, Box, Divider, InlineGrid, Text } from '@shopify/polaris'
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

export function LayoutTab() {
  const checkoutBranding = useCheckoutBranding()

  return (
    <>
      <Box padding="500">
        <BlockStack gap="200">
          <Text variant="headingSm" as="h3">
            Favicon
          </Text>

          <BlockStack gap="400">
            <FilePicker
              control={checkoutBranding.forms.layoutForm.control}
              name="favicon.mediaImageId"
              key="Favicon"
              label="Image"
              helpText="The favicon image (must be of PNG format)."
              baseQuery="status:ready media_type:Image filename:*.png used_in:none"
              defaultImageUrl={checkoutBranding.forms.layoutForm.imageUrls.favicon}
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
                <CornerRadiusEnum
                  control={checkoutBranding.forms.layoutForm.control}
                  name="global.cornerRadius"
                />

                <TypographyKerningEnum
                  control={checkoutBranding.forms.layoutForm.control}
                  name="global.typography.kerning"
                />

                <TypographyLetterCaseEnum
                  control={checkoutBranding.forms.layoutForm.control}
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
              control={checkoutBranding.forms.layoutForm.control}
              name="header.banner.mediaImageId"
              key="Banner"
              label="Banner"
              helpText="The background image of the header (must not be of SVG format)."
              baseQuery="status:ready media_type:Image -filename:*.svg used_in:none"
              defaultImageUrl={checkoutBranding.forms.layoutForm.imageUrls.headerBanner ?? ''}
            />

            <BlockStack gap="200">
              <FilePicker
                control={checkoutBranding.forms.layoutForm.control}
                name="header.logo.image.mediaImageId"
                key="Logo"
                label="Logo"
                helpText="The logo image (must not be of SVG format)."
                baseQuery="status:ready media_type:Image -filename:*.svg used_in:none"
                defaultImageUrl={checkoutBranding.forms.layoutForm.imageUrls.headerLogo ?? ''}
                onResetClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault()
                  e.stopPropagation()

                  checkoutBranding.forms.layoutForm.resetField('header.logo.image.mediaImageId')
                }}
              />

              <Box paddingInline="200">
                <RangeSlider
                  label="Max width"
                  control={checkoutBranding.forms.layoutForm.control}
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

            <InlineGrid gap="300" columns={2}>
              <HeaderAlignmentEnum
                control={checkoutBranding.forms.layoutForm.control}
                name="header.alignment"
              />

              <HeaderPositionEnum
                control={checkoutBranding.forms.layoutForm.control}
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
            <BlockStack gap="400">
              <FilePicker
                control={checkoutBranding.forms.layoutForm.control}
                name="main.backgroundImage.mediaImageId"
                key="Main Background Image"
                label="Background image"
                helpText="The background image of the main area (must not be of SVG format)."
                baseQuery="status:ready media_type:Image -filename:*.svg used_in:none"
                defaultImageUrl={checkoutBranding.forms.layoutForm.imageUrls.mainBackgroundImage ?? ''}
                onResetClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault()
                  e.stopPropagation()

                  checkoutBranding.forms.layoutForm.resetField('main.backgroundImage.mediaImageId')
                }}
              />

              <ColourSchemeSelectionEnum
                control={checkoutBranding.forms.layoutForm.control}
                name="main.colorScheme"
              />
            </BlockStack>
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
            <BlockStack gap="400">
              <FilePicker
                control={checkoutBranding.forms.layoutForm.control}
                name="orderSummary.backgroundImage.mediaImageId"
                key="Order Summary Background Image"
                label="Background image"
                helpText="The background image of the order summary (must not be of SVG format)."
                baseQuery="status:ready media_type:Image -filename:*.svg used_in:none"
                defaultImageUrl={checkoutBranding.forms.layoutForm.imageUrls.orderSummaryBackgroundImage ?? ''}
              />

              <ColourSchemeSelectionEnum
                control={checkoutBranding.forms.layoutForm.control}
                name="orderSummary.colorScheme"
              />
            </BlockStack>
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
                  control={checkoutBranding.forms.layoutForm.control}
                  name="merchandiseThumbnail.border"
                />

                <CornerRadiusEnum
                  control={checkoutBranding.forms.layoutForm.control}
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

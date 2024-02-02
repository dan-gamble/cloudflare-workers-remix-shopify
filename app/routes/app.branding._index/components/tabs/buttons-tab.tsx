import { BlockStack, Box, Divider, InlineGrid, Text } from '@shopify/polaris'
import { BackgroundStylesEnum } from '~/routes/app.branding._index/components/enums/background-styles-enum'
import { useCheckoutBranding } from '~/routes/app.branding/route'
import { SpacingEnum } from '~/routes/app.branding._index/components/enums/spacing-enum'
import { SimpleBorderEnum } from '~/routes/app.branding._index/components/enums/simple-border-enum'
import { CornerRadiusEnum } from '~/routes/app.branding._index/components/enums/corner-radius-enum'
import { TypographyFontEnum } from '~/routes/app.branding._index/components/enums/typography-font-enum'
import { TypographyKerningEnum } from '~/routes/app.branding._index/components/enums/typography-kerning-enum'
import { TypographyLetterCaseEnum } from '~/routes/app.branding._index/components/enums/typography-letter-case-enum'
import { TypographySizeEnum } from '~/routes/app.branding._index/components/enums/typography-size-enum'
import { TypographyWeightEnum } from '~/routes/app.branding._index/components/enums/typography-weight-enum'

export function ButtonsTab () {
  const checkoutBranding = useCheckoutBranding()

  return (
    <>
      <Box padding="500">
        <BlockStack gap="200">
          <Text variant="headingSm" as="h3">
            Primary button
          </Text>

          <BlockStack gap="400">
            <Text as="p">The input fields to use to update the buttons customizations.</Text>

            <BlockStack gap="400">
              <BackgroundStylesEnum
                control={checkoutBranding.forms.buttonsForm.control}
                name="primaryButton.background"
              />

              <InlineGrid gap="300" columns={2}>
                <SpacingEnum
                  control={checkoutBranding.forms.buttonsForm.control}
                  name="primaryButton.blockPadding"
                  label="Block padding"
                />

                <SpacingEnum
                  control={checkoutBranding.forms.buttonsForm.control}
                  name="primaryButton.inlinePadding"
                  label="Inline padding"
                />
              </InlineGrid>

              <InlineGrid gap="300" columns={2}>
                <SimpleBorderEnum
                  control={checkoutBranding.forms.buttonsForm.control}
                  name="primaryButton.border"
                />

                <CornerRadiusEnum
                  control={checkoutBranding.forms.buttonsForm.control}
                  name="primaryButton.cornerRadius"
                />
              </InlineGrid>
            </BlockStack>

            <BlockStack gap="200">
              <Text as="p">The input fields to use to update the typography customizations.</Text>

              <BlockStack gap="400">
                <TypographyFontEnum
                  control={checkoutBranding.forms.buttonsForm.control}
                  name="primaryButton.typography.font"
                />

                <InlineGrid gap="300" columns={2}>
                  <TypographyKerningEnum
                    control={checkoutBranding.forms.buttonsForm.control}
                    name="primaryButton.typography.kerning"
                  />

                  <TypographyLetterCaseEnum
                    control={checkoutBranding.forms.buttonsForm.control}
                    name="primaryButton.typography.letterCase"
                  />
                </InlineGrid>

                <InlineGrid gap="300" columns={2}>
                  <TypographySizeEnum
                    control={checkoutBranding.forms.buttonsForm.control}
                    name="primaryButton.typography.size"
                  />

                  <TypographyWeightEnum
                    control={checkoutBranding.forms.buttonsForm.control}
                    name="primaryButton.typography.weight"
                  />
                </InlineGrid>
              </BlockStack>
            </BlockStack>
          </BlockStack>
        </BlockStack>
      </Box>

      <Divider />

      <Box padding="500">
        <BlockStack gap="200">
          <Text variant="headingSm" as="h3">
            Secondary button
          </Text>

          <BlockStack gap="400">
            <Text as="p">The input fields to use to update the buttons customizations.</Text>

            <BlockStack gap="400">
              <BackgroundStylesEnum
                control={checkoutBranding.forms.buttonsForm.control}
                name="secondaryButton.background"
              />

              <InlineGrid gap="300" columns={2}>
                <SpacingEnum
                  control={checkoutBranding.forms.buttonsForm.control}
                  name="secondaryButton.blockPadding"
                  label="Block padding"
                />

                <SpacingEnum
                  control={checkoutBranding.forms.buttonsForm.control}
                  name="secondaryButton.inlinePadding"
                  label="Inline padding"
                />
              </InlineGrid>

              <InlineGrid gap="300" columns={2}>
                <SimpleBorderEnum
                  control={checkoutBranding.forms.buttonsForm.control}
                  name="secondaryButton.border"
                />

                <CornerRadiusEnum
                  control={checkoutBranding.forms.buttonsForm.control}
                  name="secondaryButton.cornerRadius"
                />
              </InlineGrid>
            </BlockStack>

            <BlockStack gap="200">
              <Text as="p">The input fields to use to update the typography customizations.</Text>

              <BlockStack gap="400">
                <TypographyFontEnum
                  control={checkoutBranding.forms.buttonsForm.control}
                  name="secondaryButton.typography.font"
                />

                <InlineGrid gap="300" columns={2}>
                  <TypographyKerningEnum
                    control={checkoutBranding.forms.buttonsForm.control}
                    name="secondaryButton.typography.kerning"
                  />

                  <TypographyLetterCaseEnum
                    control={checkoutBranding.forms.buttonsForm.control}
                    name="secondaryButton.typography.letterCase"
                  />
                </InlineGrid>

                <InlineGrid gap="300" columns={2}>
                  <TypographySizeEnum
                    control={checkoutBranding.forms.buttonsForm.control}
                    name="secondaryButton.typography.size"
                  />

                  <TypographyWeightEnum
                    control={checkoutBranding.forms.buttonsForm.control}
                    name="secondaryButton.typography.weight"
                  />
                </InlineGrid>
              </BlockStack>
            </BlockStack>
          </BlockStack>
        </BlockStack>
      </Box>
    </>
  )
}

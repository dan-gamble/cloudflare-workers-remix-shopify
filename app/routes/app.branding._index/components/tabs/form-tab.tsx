import { Box, Divider, Text, BlockStack, InlineGrid } from '@shopify/polaris'
import { CornerRadiusEnum } from '~/routes/app.branding._index/components/enums/corner-radius-enum'
import { useCheckoutBranding } from '~/routes/app.branding/route'
import { SimpleBorderEnum } from '~/routes/app.branding._index/components/enums/simple-border-enum'
import { ColourSelectionEnum } from '~/routes/app.branding._index/components/enums/colour-selection-enum'
import { LabelPositionEnum } from '~/routes/app.branding._index/components/enums/label-position-enum'
import { TypographyFontEnum } from '~/routes/app.branding._index/components/enums/typography-font-enum'
import { TypographyKerningEnum } from '~/routes/app.branding._index/components/enums/typography-kerning-enum'
import { TypographyLetterCaseEnum } from '~/routes/app.branding._index/components/enums/typography-letter-case-enum'
import { TypographySizeEnum } from '~/routes/app.branding._index/components/enums/typography-size-enum'
import { TypographyWeightEnum } from '~/routes/app.branding._index/components/enums/typography-weight-enum'
import { SpacingKeywordEnum } from '~/routes/app.branding._index/components/enums/spacing-keyword-enum'

export function FormTab () {
  const checkoutBranding = useCheckoutBranding()

  return (
    <>
      <Box padding="500">
        <BlockStack gap="200">
          <Text variant="headingSm" as="h3">Checkbox</Text>

          <BlockStack gap="400">
            <Text as="p">The checkboxes customizations.</Text>

            <BlockStack gap="400">
              <CornerRadiusEnum
                control={checkoutBranding.forms.form.control}
                name="checkbox.cornerRadius"
              />
            </BlockStack>
          </BlockStack>
        </BlockStack>
      </Box>

      <Divider />

      <Box padding="500">
        <BlockStack gap="200">
          <Text variant="headingSm" as="h3">Choice list</Text>

          <BlockStack gap="400">
            <Text as="p">The choice list customizations.</Text>

            <BlockStack gap="400">
              <SpacingKeywordEnum
                control={checkoutBranding.forms.form.control}
                name="choiceList.group.spacing"
              />
            </BlockStack>
          </BlockStack>
        </BlockStack>
      </Box>

      <Divider />

      <Box padding="500">
        <BlockStack gap="200">
          <Text variant="headingSm" as="h3">Control</Text>

          <BlockStack gap="400">
            <Text as="p">The form controls customizations.</Text>

            <BlockStack gap="400">
              <InlineGrid gap="300" columns={2}>
                <SimpleBorderEnum
                  control={checkoutBranding.forms.form.control}
                  name="control.border"
                />

                <ColourSelectionEnum
                  control={checkoutBranding.forms.form.control}
                  name="control.color"
                />

                <CornerRadiusEnum
                  control={checkoutBranding.forms.form.control}
                  name="control.cornerRadius"
                />

                <LabelPositionEnum
                  control={checkoutBranding.forms.form.control}
                  name="control.labelPosition"
                />
              </InlineGrid>
            </BlockStack>
          </BlockStack>
        </BlockStack>
      </Box>

      <Divider />

      <Box padding="500">
        <BlockStack gap="200">
          <Text variant="headingSm" as="h3">Select</Text>

          <BlockStack gap="400">
            <Text as="p">The selects customizations.</Text>

            <SimpleBorderEnum
              control={checkoutBranding.forms.form.control}
              name="select.border"
            />

            <BlockStack gap="200">
              <Text as="p">The input fields to use to update the typography customizations.</Text>

              <BlockStack gap="400">
                <TypographyFontEnum
                  control={checkoutBranding.forms.form.control}
                  name="select.typography.font"
                />

                <InlineGrid gap="300" columns={2}>
                  <TypographyKerningEnum
                    control={checkoutBranding.forms.form.control}
                    name="select.typography.kerning"
                  />

                  <TypographyLetterCaseEnum
                    control={checkoutBranding.forms.form.control}
                    name="select.typography.letterCase"
                  />
                </InlineGrid>

                <InlineGrid gap="300" columns={2}>
                  <TypographySizeEnum
                    control={checkoutBranding.forms.form.control}
                    name="select.typography.size"
                  />

                  <TypographyWeightEnum
                    control={checkoutBranding.forms.form.control}
                    name="select.typography.weight"
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
          <Text variant="headingSm" as="h3">Text field</Text>

          <BlockStack gap="400">
            <Text as="p">The text field customizations.</Text>

            <SimpleBorderEnum
              control={checkoutBranding.forms.form.control}
              name="textField.border"
            />

            <BlockStack gap="200">
              <Text as="p">The input fields to use to update the typography customizations.</Text>

              <BlockStack gap="400">
                <TypographyFontEnum
                  control={checkoutBranding.forms.form.control}
                  name="textField.typography.font"
                />

                <InlineGrid gap="300" columns={2}>
                  <TypographyKerningEnum
                    control={checkoutBranding.forms.form.control}
                    name="textField.typography.kerning"
                  />

                  <TypographyLetterCaseEnum
                    control={checkoutBranding.forms.form.control}
                    name="textField.typography.letterCase"
                  />
                </InlineGrid>

                <InlineGrid gap="300" columns={2}>
                  <TypographySizeEnum
                    control={checkoutBranding.forms.form.control}
                    name="textField.typography.size"
                  />

                  <TypographyWeightEnum
                    control={checkoutBranding.forms.form.control}
                    name="textField.typography.weight"
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

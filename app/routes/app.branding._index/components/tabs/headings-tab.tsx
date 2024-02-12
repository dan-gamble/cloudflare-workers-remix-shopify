import { Box, Divider, Text, BlockStack, InlineGrid } from '@shopify/polaris'
import { useCheckoutBranding } from '~/routes/app.branding/route'
import { TypographyFontEnum } from '~/routes/app.branding._index/components/enums/typography-font-enum'
import { TypographyKerningEnum } from '~/routes/app.branding._index/components/enums/typography-kerning-enum'
import { TypographyLetterCaseEnum } from '~/routes/app.branding._index/components/enums/typography-letter-case-enum'
import { TypographySizeEnum } from '~/routes/app.branding._index/components/enums/typography-size-enum'
import { TypographyWeightEnum } from '~/routes/app.branding._index/components/enums/typography-weight-enum'

export function HeadingsTab () {
  const checkoutBranding = useCheckoutBranding()

  return (
    <>
      <Box padding="500">
        <BlockStack gap="200">
          <Text variant="headingSm" as="h3">Level 1</Text>

          <BlockStack gap="400">
            <Text as="p">The Heading Level 1 customizations.</Text>

            <BlockStack gap="400">
              <TypographyFontEnum
                control={checkoutBranding.forms.headings.control}
                name="headingLevel1.typography.font"
              />

              <InlineGrid gap="300" columns={2}>
                <TypographyKerningEnum
                  control={checkoutBranding.forms.headings.control}
                  name="headingLevel1.typography.kerning"
                />

                <TypographyLetterCaseEnum
                  control={checkoutBranding.forms.headings.control}
                  name="headingLevel1.typography.letterCase"
                />
              </InlineGrid>

              <InlineGrid gap="300" columns={2}>
                <TypographySizeEnum
                  control={checkoutBranding.forms.headings.control}
                  name="headingLevel1.typography.size"
                />

                <TypographyWeightEnum
                  control={checkoutBranding.forms.headings.control}
                  name="headingLevel1.typography.weight"
                />
              </InlineGrid>
            </BlockStack>
          </BlockStack>
        </BlockStack>
      </Box>

      <Divider />

      <Box padding="500">
        <BlockStack gap="200">
          <Text variant="headingSm" as="h3">Level 2</Text>

          <BlockStack gap="400">
            <Text as="p">The Heading Level 2 customizations.</Text>

            <BlockStack gap="400">
              <TypographyFontEnum
                control={checkoutBranding.forms.headings.control}
                name="headingLevel2.typography.font"
              />

              <InlineGrid gap="300" columns={2}>
                <TypographyKerningEnum
                  control={checkoutBranding.forms.headings.control}
                  name="headingLevel2.typography.kerning"
                />

                <TypographyLetterCaseEnum
                  control={checkoutBranding.forms.headings.control}
                  name="headingLevel2.typography.letterCase"
                />
              </InlineGrid>

              <InlineGrid gap="300" columns={2}>
                <TypographySizeEnum
                  control={checkoutBranding.forms.headings.control}
                  name="headingLevel2.typography.size"
                />

                <TypographyWeightEnum
                  control={checkoutBranding.forms.headings.control}
                  name="headingLevel2.typography.weight"
                />
              </InlineGrid>
            </BlockStack>
          </BlockStack>
        </BlockStack>
      </Box>

      <Divider />

      <Box padding="500">
        <BlockStack gap="200">
          <Text variant="headingSm" as="h3">Level 3</Text>

          <BlockStack gap="400">
            <Text as="p">The Heading Level 3 customizations.</Text>

            <BlockStack gap="400">
              <TypographyFontEnum
                control={checkoutBranding.forms.headings.control}
                name="headingLevel3.typography.font"
              />

              <InlineGrid gap="300" columns={2}>
                <TypographyKerningEnum
                  control={checkoutBranding.forms.headings.control}
                  name="headingLevel3.typography.kerning"
                />

                <TypographyLetterCaseEnum
                  control={checkoutBranding.forms.headings.control}
                  name="headingLevel3.typography.letterCase"
                />
              </InlineGrid>

              <InlineGrid gap="300" columns={2}>
                <TypographySizeEnum
                  control={checkoutBranding.forms.headings.control}
                  name="headingLevel3.typography.size"
                />

                <TypographyWeightEnum
                  control={checkoutBranding.forms.headings.control}
                  name="headingLevel3.typography.weight"
                />
              </InlineGrid>
            </BlockStack>
          </BlockStack>
        </BlockStack>
      </Box>
    </>
  )
}

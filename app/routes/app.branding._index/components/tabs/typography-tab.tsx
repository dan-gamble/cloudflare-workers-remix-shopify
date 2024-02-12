import { Banner, BlockStack, Box, Divider, Select, Text } from '@shopify/polaris'
import { FontTypes } from '~/routes/app.branding._index/hooks/use-typography-form'
import { TextField } from '~/components/text-field'
import { useCheckoutBranding, useCheckoutBrandingData, useCheckoutBrandingState } from '~/routes/app.branding/route'
import { ShopifyFont } from '~/routes/app.branding._index/components/fonts/shopify-font'
import { CustomFont } from '~/routes/app.branding._index/components/fonts/custom-font'
import { useFetcher } from '@remix-run/react'
import { useState } from 'react'

const FontComponents = {
  [FontTypes.Custom]: CustomFont,
  [FontTypes.Shopify]: ShopifyFont,
} as const

export function TypographyTab () {
  const checkoutBranding = useCheckoutBranding()
  const checkoutBrandingData = useCheckoutBrandingData()
  const checkoutBrandingState = useCheckoutBrandingState()

  const dismisser = useFetcher()

  const [customFontsBannerDismissed, setCustomFontsBannerDismissed] = useState(false)

  const PrimaryFontComponent = FontComponents[checkoutBranding.forms.typography.primaryFormType]
  const SecondaryFontComponent = FontComponents[checkoutBranding.forms.typography.secondaryFormType]

  const shouldShowCustomFontsBanner = (
    customFontsBannerDismissed === false &&
    checkoutBrandingData.fonts.customFonts.length === 0 &&
    checkoutBrandingState.hasDismissedCustomFontsBanner === false
  )

  return (
    <>
      {shouldShowCustomFontsBanner && (
        <Box paddingInline="500" paddingBlockStart="200">
          <Banner
            title="Custom Fonts"
            action={{
              content: 'Go to files',
              url: 'shopify://admin/content/files',
              target: '_top',
            }}
            tone="info"
            onDismiss={() => {
              setCustomFontsBannerDismissed(true)

              dismisser.submit({}, {
                action: '/app/branding/dismiss-custom-fonts-banner',
                method: 'POST',
              })
            }}
          >
            <p>To be able to use a custom font with the Branding API please upload a .woff or .woff2 file under "Content {`->`} Files".</p>
          </Banner>
        </Box>
      )}

      <Box padding="500">
        <BlockStack gap="200">
          <Text variant="headingSm" as="h3">Primary font</Text>

          <BlockStack gap="400">
            <Select
              label="Type"
              options={[
                { label: 'Shopify', value: FontTypes.Shopify },
                {
                  label: 'Custom',
                  value: FontTypes.Custom,
                  disabled: checkoutBrandingData.fonts.customFonts.length === 0
                },
              ]}
              value={checkoutBranding.forms.typography.primaryFormType}
              onChange={value => checkoutBranding.forms.typography.setPrimaryFormType(value as FontTypes)}
            />

            <PrimaryFontComponent
              lookupKey="primary"
              key={checkoutBranding.forms.typography.primaryFormType}
            />
          </BlockStack>
        </BlockStack>
      </Box>

      <Divider />

      <Box padding="500">
        <BlockStack gap="200">
          <Text variant="headingSm" as="h3">Secondary font</Text>

          <BlockStack gap="400">
            <BlockStack gap="400">
              <Select
                label="Type"
                options={[
                  { label: 'Shopify', value: FontTypes.Shopify },
                  {
                    label: 'Custom',
                    value: FontTypes.Custom,
                    disabled: checkoutBrandingData.fonts.customFonts.length === 0,
                  },
                ]}
                value={checkoutBranding.forms.typography.secondaryFormType}
                onChange={value => checkoutBranding.forms.typography.setSecondaryFormType(value as FontTypes)}
              />

              <SecondaryFontComponent
                lookupKey="secondary"
                key={checkoutBranding.forms.typography.secondaryFormType}
              />
            </BlockStack>
          </BlockStack>
        </BlockStack>
      </Box>

      <Divider />

      <Box padding="500">
        <BlockStack gap="200">
          <Text variant="headingSm" as="h3">Global</Text>

          <BlockStack gap="400">
            <Text as="p">This property group applies to global typography font faces, sizes, and weights.</Text>

            <BlockStack gap="400">
              <TextField
                control={checkoutBranding.forms.typography.control}
                name="size.base"
                label="Base"
                type="number"
                min="12.0"
                max="18.0"
                autoComplete="off"
                helpText="The base font size. Its value should be between 12.0 and 18.0."
                onChange={(value, field) => {
                  field.onChange(value)
                }}
                onBlur={(event, field) => {
                  if (typeof event === 'undefined') return

                  const float = parseFloat(event.target.value)

                  if (Number.isNaN(float)) {
                    field.onChange(event.target.value)
                  }

                  field.onChange(float)
                }}
              />

              <TextField
                control={checkoutBranding.forms.typography.control}
                name="size.ratio"
                label="Ratio"
                type="number"
                min="1.0"
                max="1.4"
                step={0.1}
                autoComplete="off"
                helpText="The scale ratio used to derive all font sizes such as small and large. Its value should be between 1.0 and 1.4."
                onChange={(value, field) => {
                  return field.onChange(value)
                }}
                onBlur={(event, field) => {
                  if (typeof event === 'undefined') return

                  const float = parseFloat(event.target.value)

                  if (Number.isNaN(float)) {
                    field.onChange(event.target.value)
                  }

                  field.onChange(float)
                }}
              />
            </BlockStack>
          </BlockStack>
        </BlockStack>
      </Box>
    </>
  )
}

import { useCheckoutBranding, useCheckoutBrandingData } from '~/routes/app.branding/route'
import { BlockStack, Box, InlineGrid } from '@shopify/polaris'
import { Select } from '~/components/select'
import { CheckoutBrandingFontLoadingStrategy } from '~/types/admin.types'
import { TextField } from '~/components/text-field'

export function ShopifyFont ({
  lookupKey,
}: {
  readonly lookupKey: 'primary' | 'secondary'
}) {
  const checkoutBranding = useCheckoutBranding()
  const checkoutBrandingData = useCheckoutBrandingData()

  const fontFamilyName = `${lookupKey}.shopifyFontGroup.name` as const
  const fontLoadingStrategyName = `${lookupKey}.shopifyFontGroup.loadingStrategy` as const
  const baseWeightName = `${lookupKey}.shopifyFontGroup.baseWeight` as const
  const boldWeightName = `${lookupKey}.shopifyFontGroup.boldWeight` as const

  return (
    <Box>
      <BlockStack gap="400">
        <InlineGrid gap="300" columns={2}>
          <Select
            control={checkoutBranding.forms.typography.control}
            name={fontFamilyName}
            label="Font family"
            options={
              [
                { label: '-', value: '' },
                ...checkoutBrandingData.fonts.shopifyFonts
                  .map(fontFamily => {
                    return { label: fontFamily.name, value: fontFamily.name }
                  }),
              ]
            }
          />

          <Select
            control={checkoutBranding.forms.typography.control}
            name={fontLoadingStrategyName}
            label="Font loading strategy"
            options={[
              { label: '-', value: '' },
              { label: 'Auto', value: CheckoutBrandingFontLoadingStrategy.Auto },
              { label: 'Block', value: CheckoutBrandingFontLoadingStrategy.Block },
              { label: 'Fallback', value: CheckoutBrandingFontLoadingStrategy.Fallback },
              { label: 'Optional', value: CheckoutBrandingFontLoadingStrategy.Optional },
              { label: 'Swap', value: CheckoutBrandingFontLoadingStrategy.Swap },
            ]}
          />

          <TextField
            control={checkoutBranding.forms.typography.control}
            name={baseWeightName}
            label="Base font weight"
            type="number"
            min="100"
            max="900"
            autoComplete="off"
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
            name={boldWeightName}
            label="Bold font weight"
            type="number"
            min="100"
            max="900"
            autoComplete="off"
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
        </InlineGrid>
      </BlockStack>
    </Box>
  )
}

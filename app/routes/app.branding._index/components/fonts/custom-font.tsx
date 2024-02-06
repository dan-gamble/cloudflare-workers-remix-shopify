import { BlockStack, InlineGrid, Text } from '@shopify/polaris'
import { Select } from '~/components/select'
import { useCheckoutBranding, useCheckoutBrandingData } from '~/routes/app.branding/route'
import { CheckoutBrandingFontLoadingStrategy } from '~/types/admin.types'
import { TextField } from '~/components/text-field'
import { parseFileNameAndExtensionFromUrl } from '~/utils'

export function CustomFont ({
  lookupKey,
}: {
  readonly lookupKey: 'primary' | 'secondary'
}) {
  const checkoutBranding = useCheckoutBranding()
  const checkoutBrandingData = useCheckoutBrandingData()

  const loadingStrategyName = `${lookupKey}.customFontGroup.loadingStrategy` as const
  const baseGenericFileIdName = `${lookupKey}.customFontGroup.base.genericFileId` as const
  const baseWeightName = `${lookupKey}.customFontGroup.base.weight` as const
  const boldGenericFileIdName = `${lookupKey}.customFontGroup.bold.genericFileId` as const
  const boldWeightName = `${lookupKey}.customFontGroup.bold.weight` as const

  return (
    <BlockStack gap="400">
      <Text as="p">To use a custom font please upload a .woff or .woff2 under Content {'->'} Files. Once they're uploaded they will appear here as a choice.</Text>

      <BlockStack gap="200">
        <Text as="p" variant="headingSm">Base</Text>

        <InlineGrid gap="300" columns={2}>
          <Select
            control={checkoutBranding.forms.typographyForm.control}
            name={baseGenericFileIdName}
            label="Font family"
            options={[
              { label: '-', value: '' },
              ...checkoutBrandingData.fonts.customFonts.map(font => {
                const { extension, fileName } = parseFileNameAndExtensionFromUrl(font.url)

                return {
                  label: `${fileName} (${extension})`,
                  value: font.id,
                }
              })
            ]}
          />

          <TextField
            control={checkoutBranding.forms.typographyForm.control}
            name={baseWeightName}
            label="Font weight"
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

      <BlockStack gap="200">
        <Text as="p" variant="headingSm">Bold</Text>

        <InlineGrid gap="300" columns={2}>
          <Select
            control={checkoutBranding.forms.typographyForm.control}
            name={boldGenericFileIdName}
            label="Font family"
            options={[
              { label: '-', value: '' },
              ...checkoutBrandingData.fonts.customFonts.map(font => {
                const { extension, fileName } = parseFileNameAndExtensionFromUrl(font.url)

                return {
                  label: `${fileName} (${extension})`,
                  value: font.id,
                }
              })
            ]}
          />

          <TextField
            control={checkoutBranding.forms.typographyForm.control}
            name={boldWeightName}
            label="Font weight"
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

      <Select
        control={checkoutBranding.forms.typographyForm.control}
        name={loadingStrategyName}
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
    </BlockStack>
  )
}

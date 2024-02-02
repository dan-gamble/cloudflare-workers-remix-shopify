import { Select } from '@shopify/polaris'
import type { EnumProps } from './index'
import { CheckoutBrandingColorSchemeSelection } from '~/types/admin.types'
import { useCheckoutBrandingData } from '~/routes/app.branding/route'
import { enumValuesToOptions } from '~/routes/app.branding._index/components/enums/utils'

const SchemeMap = new Map([
  [CheckoutBrandingColorSchemeSelection.ColorScheme1, 'Scheme 1'],
  [CheckoutBrandingColorSchemeSelection.ColorScheme2, 'Scheme 2'],
  [CheckoutBrandingColorSchemeSelection.Transparent, 'Transparent'],
])

export function ColourSchemeSelectionEnum ({ label = 'Colour scheme', ...props }: EnumProps) {
  const { enums } = useCheckoutBrandingData()
  const options = enumValuesToOptions(enums.colorSchemeSelection.enumValues)
    .map(({ label, value }) => ({ label: SchemeMap.get(value as CheckoutBrandingColorSchemeSelection) ?? label, value }))

  return (
    <Select
      label={label}
      options={[
        { label: '-', value: '' },
        ...options,
      ]}
      {...props}
    />
  )
}

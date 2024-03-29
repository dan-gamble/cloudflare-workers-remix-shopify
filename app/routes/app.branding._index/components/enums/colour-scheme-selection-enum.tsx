import type { EnumProps } from './index'
import { CheckoutBrandingColorSchemeSelection } from '~/types/admin.types'
import { useCheckoutBrandingData } from '~/routes/app.branding/route'
import { enumValuesToOptions } from '~/routes/app.branding._index/components/enums/utils'
import { Select } from '~/components/select'
import type { FieldPath, FieldValues } from 'react-hook-form'

const SchemeMap = new Map([
  [CheckoutBrandingColorSchemeSelection.ColorScheme1, 'Scheme 1'],
  [CheckoutBrandingColorSchemeSelection.ColorScheme2, 'Scheme 2'],
  [CheckoutBrandingColorSchemeSelection.Transparent, 'Transparent'],
])

export function ColourSchemeSelectionEnum<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label = 'Colour scheme',
  ...props
}: EnumProps<TFieldValues, TName>) {
  const { enums } = useCheckoutBrandingData()
  const options = enumValuesToOptions(
    enums.colorSchemeSelection.enumValues,
  ).map(({ label, value }) => ({
    label:
      SchemeMap.get(value as CheckoutBrandingColorSchemeSelection) ?? label,
    value,
  }))

  return (
    <Select
      label={label}
      options={[{ label: '-', value: '' }, ...options]}
      {...props}
      onChange={(value, field) => {
        if (value === '') {
          return field.onChange(null)
        }

        return field.onChange(value)
      }}
    />
  )
}

import type { EnumProps } from './index'
import { useCheckoutBrandingData } from '~/routes/app.branding/route'
import { enumValuesToOptions } from '~/routes/app.branding._index/components/enums/utils'
import { Select } from '~/components/select'
import type { FieldPath, FieldValues } from 'react-hook-form'

const ColourMap = new Map([
  ['COLOR1', 'Primary'],
  ['COLOR2', 'Secondary'],
])

export function ColourSelectionEnum<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ label = 'Colour', ...props }: EnumProps<TFieldValues, TName>) {
  const { enums } = useCheckoutBrandingData()
  const options = enumValuesToOptions(enums.colorSelection.enumValues).map(
    ({ label, value }) => ({ label: ColourMap.get(value) ?? label, value }),
  )

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

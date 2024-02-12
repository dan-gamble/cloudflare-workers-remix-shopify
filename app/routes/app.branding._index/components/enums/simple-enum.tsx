import type { EnumProps } from '~/routes/app.branding._index/components/enums/index'
import { Select } from '~/components/select'
import { enumValuesToOptions } from '~/routes/app.branding._index/components/enums/utils'
import type { FieldPath, FieldValues } from 'react-hook-form'

export function SimpleEnum<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> ({ control, enumValues, label, name }: EnumProps<TFieldValues, TName> & { enumValues: { name: string }[] }) {
  return (
    <Select
      control={control}
      name={name}
      label={label}
      options={[
        { label: '-', value: '' },
        ...enumValuesToOptions(enumValues),
      ]}
      onChange={(value, field) => {
        if (value === '') {
          return field.onChange(null)
        }

        return field.onChange(value)
      }}
    />
  )
}

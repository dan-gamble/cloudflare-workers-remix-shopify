import type { EnumProps } from '~/routes/app.branding._index/components/enums/index'
import { Select } from '~/components/select'
import { enumValuesToOptions } from '~/routes/app.branding._index/components/enums/utils'

export function SimpleEnum ({ control, enumValues, label, name }: EnumProps & { enumValues: { name: string }[] }) {
  return (
    <Select
      control={control}
      name={name}
      label={label}
      options={[
        { label: '-', value: '' },
        ...enumValuesToOptions(enumValues),
      ]}
    />
  )
}

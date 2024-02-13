import type { EnumProps } from '~/routes/app.branding._index/components/enums/index'
import { useCheckoutBrandingData } from '~/routes/app.branding/route'
import { SimpleEnum } from '~/routes/app.branding._index/components/enums/simple-enum'
import type { FieldPath, FieldValues } from 'react-hook-form'

export function CornerRadiusEnum<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> ({ label = 'Corner radius', ...props }: EnumProps<TFieldValues, TName>) {
  const { enums } = useCheckoutBrandingData()

  return (
    <SimpleEnum
      {...props}
      label={label}
      enumValues={enums.cornerRadius.enumValues}
    />
  )
}

import type { EnumProps } from './index'
import { SimpleEnum } from '~/routes/app.branding._index/components/enums/simple-enum'
import { useCheckoutBrandingData } from '~/routes/app.branding/route'
import type { FieldPath, FieldValues } from 'react-hook-form'

export function TypographySizeEnum<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> ({ label = 'Size', ...props }: EnumProps<TFieldValues, TName>) {
  const { enums } = useCheckoutBrandingData()

  return (
    <SimpleEnum
      {...props}
      label={label}
      enumValues={enums.typographySize.enumValues}
    />
  )
}

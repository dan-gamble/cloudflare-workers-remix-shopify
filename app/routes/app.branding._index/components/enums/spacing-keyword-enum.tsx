import type { EnumProps } from './index'
import { useCheckoutBrandingData } from '~/routes/app.branding/route'
import { SimpleEnum } from '~/routes/app.branding._index/components/enums/simple-enum'
import type { FieldPath, FieldValues } from 'react-hook-form'

export function SpacingKeywordEnum<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> (props: EnumProps<TFieldValues, TName>) {
  const { enums } = useCheckoutBrandingData()

  return (
    <SimpleEnum
      label="Spacing"
      {...props}
      enumValues={enums.spacingKeyword.enumValues}
    />
  )
}

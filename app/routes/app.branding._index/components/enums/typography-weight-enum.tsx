import type { EnumProps } from './index'
import { useCheckoutBrandingData } from '~/routes/app.branding/route'
import { SimpleEnum } from '~/routes/app.branding._index/components/enums/simple-enum'

export function TypographyWeightEnum ({ label = 'Weight', ...props }: EnumProps) {
  const { enums } = useCheckoutBrandingData()

  return (
    <SimpleEnum
      {...props}
      label={label}
      enumValues={enums.typographyWeight.enumValues}
    />
  )
}

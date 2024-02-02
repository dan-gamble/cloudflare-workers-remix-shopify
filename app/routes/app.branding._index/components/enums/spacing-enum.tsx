import type { EnumProps } from './index'
import { useCheckoutBrandingData } from '~/routes/app.branding/route'
import { SimpleEnum } from '~/routes/app.branding._index/components/enums/simple-enum'

export function SpacingEnum (props: EnumProps) {
  const { enums } = useCheckoutBrandingData()

  return (
    <SimpleEnum
      {...props}
      enumValues={enums.spacing.enumValues}
    />
  )
}

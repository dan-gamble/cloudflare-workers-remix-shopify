import type { EnumProps } from '~/routes/app.branding._index/components/enums/index'
import { useCheckoutBrandingData } from '~/routes/app.branding/route'
import { SimpleEnum } from '~/routes/app.branding._index/components/enums/simple-enum'

export function CornerRadiusEnum ({ label = 'Corner radius', ...props }: EnumProps) {
  const { enums } = useCheckoutBrandingData()

  return (
    <SimpleEnum
      {...props}
      label={label}
      enumValues={enums.cornerRadius.enumValues}
    />
  )
}

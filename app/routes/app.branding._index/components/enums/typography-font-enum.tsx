import type { EnumProps } from './index'
import { SimpleEnum } from '~/routes/app.branding._index/components/enums/simple-enum'
import { useCheckoutBrandingData } from '~/routes/app.branding/route'

export function TypographyFontEnum ({ label = 'Font', ...props }: EnumProps) {
  const { enums } = useCheckoutBrandingData()

  return (
    <SimpleEnum
      {...props}
      label={label}
      enumValues={enums.typographyFont.enumValues}
    />
  )
}

import { useCornerRadiusForm } from '~/routes/app.branding._index/hooks/use-corner-radius-form'
import { checkoutBrandingInputSchema } from '~/routes/app.branding._index/schema'
import { useButtonsForm } from '~/routes/app.branding._index/hooks/use-buttons-form'
import { useFormForm } from '~/routes/app.branding._index/hooks/use-form-form'
import { useHeadingsForm } from '~/routes/app.branding._index/hooks/use-headings-form'
import { useColoursForm } from '~/routes/app.branding._index/hooks/use-colours-form'
import { useTypographyForm } from '~/routes/app.branding._index/hooks/use-typography-form'
import { useLayoutForm } from '~/routes/app.branding._index/hooks/use-layout-form'
import { merge } from 'ts-deepmerge'
import type { CurrentCheckoutBranding } from '~/routes/app.branding/types'
import type { CustomFontFragment } from '~/types/admin.generated'

export function useBrandingForms (
  currentBranding: CurrentCheckoutBranding,
  customFonts: CustomFontFragment[],
) {
  const buttonsForm = useButtonsForm(currentBranding)
  const coloursForm = useColoursForm(currentBranding)
  const cornerRadiusForm = useCornerRadiusForm(currentBranding)
  const formForm = useFormForm(currentBranding)
  const headingsForm = useHeadingsForm(currentBranding)
  const layoutForm = useLayoutForm(currentBranding)
  const typographyForm = useTypographyForm(currentBranding, customFonts)

  const forms = {
    buttonsForm,
    coloursForm,
    cornerRadiusForm,
    formForm,
    headingsForm,
    layoutForm,
    typographyForm,
  }

  return {
    forms,

    isDirty: Object.values(forms).some(form => form.isDirty),

    toValues () {
      const values = Object.values(forms)
        .filter(form => form.isDirty)
        .map(form => form.toValues())
        .reduce((acc, values) => merge(acc, values), {})
      // TODO: Safe parse

      return checkoutBrandingInputSchema.parse(values)
    },

    reset () {
      for (const form of Object.values(forms)) {
        form.reset()
      }
    },
  }
}

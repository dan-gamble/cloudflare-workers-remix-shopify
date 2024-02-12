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
import { usePreviewForm } from '~/routes/app.branding._index/hooks/use-preview-form'

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

  const previewForm = usePreviewForm(currentBranding)

  const forms = {
    buttons: buttonsForm,
    colours: coloursForm,
    cornerRadius: cornerRadiusForm,
    form: formForm,
    headings: headingsForm,
    layout: layoutForm,
    typography: typographyForm,

    preview: previewForm,
  }

  return {
    forms,

    isDirty: Object.values(forms).some(form => form.isDirty),

    toDirtyInputValues () {
      const values = Object.values(forms)
        .filter(form => form.isDirty)
        .map(form => form.toDirtyInputValues())
        .reduce((acc, values) => {
          console.log({ acc, values })

          return merge(acc, values)
        }, {})
      // TODO: Safe parse

      return checkoutBrandingInputSchema.parse(values)
    },

    toValues () {
      return Object.values(forms)
        .map(form => form.toValues())
        .reduce((acc, values) => {
          return merge(acc, values)
        }, {})
    },

    reset () {
      for (const form of Object.values(forms)) {
        form.reset()
      }
    },
  }
}

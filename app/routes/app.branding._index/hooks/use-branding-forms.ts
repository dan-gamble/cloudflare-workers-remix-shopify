import { useCornerRadiusForm } from '~/routes/app.branding._index/hooks/use-corner-radius-form'
import { checkoutBrandingSchema } from '~/routes/app.branding._index/schema'
import { useButtonsForm } from '~/routes/app.branding._index/hooks/use-buttons-form'
import { useFormForm } from '~/routes/app.branding._index/hooks/use-form-form'
import { useHeadingsForm } from '~/routes/app.branding._index/hooks/use-headings-form'
import { useColoursForm } from '~/routes/app.branding._index/hooks/use-colours-form'

export function useBrandingForms () {
  const buttonsForm = useButtonsForm()
  const coloursForm = useColoursForm()
  const cornerRadiusForm = useCornerRadiusForm()
  const formForm = useFormForm()
  const headingsForm = useHeadingsForm()

  const forms = {
    buttonsForm,
    coloursForm,
    cornerRadiusForm,
    formForm,
    headingsForm,
  }

  return {
    forms,

    isDirty: Object.values(forms).some(form => form.formState.isDirty),

    handleSubmit () {
      const values = Object.values(forms)
        .map(form => form.toValues())
        .reduce((acc, values) => ({ ...acc, ...values }), {})
      console.log({ values })
      const data = checkoutBrandingSchema.parse(values)

      console.log({ data })
    },

    reset () {
      for (const form of Object.values(forms)) {
        form.reset()
      }
    },
  }
}

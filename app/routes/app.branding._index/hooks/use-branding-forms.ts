import { useCornerRadiusForm } from '~/routes/app.branding._index/hooks/use-corner-radius-form'
import { checkoutBrandingSchema } from '~/routes/app.branding._index/schema'
import { useButtonsForm } from '~/routes/app.branding._index/hooks/use-buttons-form'
import { useFormForm } from '~/routes/app.branding._index/hooks/use-form-form'

export function useBrandingForms () {
  const buttonsForm = useButtonsForm()
  const cornerRadiusForm = useCornerRadiusForm()
  const formForm = useFormForm()

  const forms = {
    buttonsForm,
    cornerRadiusForm,
    formForm,
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

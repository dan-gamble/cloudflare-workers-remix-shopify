import type { FieldValues } from 'react-hook-form/dist/types'
import type { Control, FormState, UseFormReset } from 'react-hook-form/dist/types/form'
import type { CheckoutBranding } from '~/types/admin.types'

export type BrandingFormHook<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues = TFieldValues
> = {
  control: Control<TFieldValues, TContext, TTransformedValues>;
  formState: FormState<TFieldValues>;
  reset: UseFormReset<TFieldValues>;
  toValues: () => CheckoutBranding;
}

import type { FieldValues } from 'react-hook-form/dist/types'
import type { Control, UseFormReset, UseFormResetField } from 'react-hook-form/dist/types/form'
import type { CheckoutBrandingInput } from '~/types/admin.types'

export type BrandingFormHook<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues = TFieldValues
> = {
  control: Control<TFieldValues, TContext, TTransformedValues>;
  isDirty: boolean;
  reset: UseFormReset<TFieldValues>;
  resetField: UseFormResetField<TFieldValues>
  toValues: () => CheckoutBrandingInput;
  toDirtyInputValues: () => CheckoutBrandingInput;
}

import type { FieldPath, FieldValues } from 'react-hook-form'
import type { Control } from 'react-hook-form/dist/types'

export type EnumProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  control: Control<TFieldValues>
  name: TName
  label?: string
}

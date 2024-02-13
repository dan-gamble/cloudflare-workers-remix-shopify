import type { FieldPath, FieldValues } from 'react-hook-form'
import type { CheckboxProps } from '~/components/checkbox';
import { Checkbox } from '~/components/checkbox'

export function VisibilityEnum<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> (props: CheckboxProps<TFieldValues, TName>) {
  return (
    <Checkbox
      {...props}
      checked={field => field.value === 'HIDDEN'}
      onChange={(newChecked, field) => {
        field.onChange(newChecked ? 'HIDDEN' : 'VISIBLE')
      }}
    />
  )
}

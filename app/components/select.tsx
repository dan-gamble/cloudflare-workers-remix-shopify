import type { SelectProps as ShopifySelectProps } from '@shopify/polaris';
import { Select as ShopifySelect } from '@shopify/polaris'
import type { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form'
import { useController } from 'react-hook-form'
import type { ControllerRenderProps } from 'react-hook-form/dist/types/controller'

type SelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<ShopifySelectProps, 'name'|'onChange'> & UseControllerProps<TFieldValues, TName> & {
  onChange?: (value: string, field: ControllerRenderProps<TFieldValues, TName>) => void
}

export function Select<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> (props: SelectProps<TFieldValues, TName>) {
  const { field, fieldState } = useController<TFieldValues, TName>(props)

  return (
    <ShopifySelect
      {...props}
      value={field.value}
      onChange={value => {
        if (typeof props.onChange === 'function') {
          return props.onChange(value, field)
        }

        return field.onChange(value)
      }}
      onBlur={field.onBlur}
      error={fieldState.error?.message}
    />
  )
}

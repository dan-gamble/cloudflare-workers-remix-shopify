import type { TextFieldProps as ShopifyTextFieldProps } from '@shopify/polaris';
import { TextField as ShopifyTextField } from '@shopify/polaris'
import type { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form'
import { useController } from 'react-hook-form'
import type { ControllerRenderProps } from 'react-hook-form/dist/types/controller'

type TextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<ShopifyTextFieldProps, 'name'|'onChange'> & UseControllerProps<TFieldValues, TName> & {
  onChange?: (value: string, field: ControllerRenderProps<TFieldValues, TName>) => void
}

export function TextField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> (props: TextFieldProps<TFieldValues, TName>) {
  const { field, fieldState } = useController<TFieldValues, TName>(props)

  return (
    <ShopifyTextField
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

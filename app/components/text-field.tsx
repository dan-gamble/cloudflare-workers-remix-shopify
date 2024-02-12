import type { TextFieldProps as ShopifyTextFieldProps } from '@shopify/polaris';
import { TextField as ShopifyTextField } from '@shopify/polaris'
import type { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form'
import { useController } from 'react-hook-form'
import type { ControllerRenderProps } from 'react-hook-form/dist/types/controller'
import React from 'react'

type TextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<ShopifyTextFieldProps, 'name'|'onChange'|'onBlur'> & UseControllerProps<TFieldValues, TName> & {
  onBlur?: (event: React.FocusEvent<HTMLInputElement> | undefined, field: ControllerRenderProps<TFieldValues, TName>) => void
  onChange?: (event: string, field: ControllerRenderProps<TFieldValues, TName>) => void
}

export function TextField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> (props: TextFieldProps<TFieldValues, TName>) {
  const { field, fieldState } = useController<TFieldValues, TName>({
    name: props.name,
    rules: props.rules,
    shouldUnregister: props.shouldUnregister,
    defaultValue: props.defaultValue,
    control: props.control,
    disabled: props.disabled,
  })

  // console.log(field, fieldState)

  return (
    <ShopifyTextField
      {...props}
      value={field.value ?? ''}
      onChange={value => {
        if (typeof props.onChange === 'function') {
          return props.onChange(value, field)
        }

        return field.onChange(value)
      }}
      onBlur={event => {
        if (typeof props.onBlur === 'function') {
          return props.onBlur(event as React.FocusEvent<HTMLInputElement>, field)
        } else {
          return field.onBlur()
        }
      }}
      error={fieldState.error?.message}
    />
  )
}

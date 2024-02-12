import type { CheckboxProps as ShopifyCheckboxProps } from '@shopify/polaris';
import { Checkbox as ShopifyCheckbox } from '@shopify/polaris'
import type { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form'
import { useController } from 'react-hook-form'
import type { ControllerRenderProps } from 'react-hook-form/dist/types/controller'
import React from 'react'

type CheckboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<ShopifyCheckboxProps, 'name'|'onChange'> & UseControllerProps<TFieldValues, TName> & {
  onChange?: (newChecked: boolean, field: ControllerRenderProps<TFieldValues, TName>) => void
}

export function Checkbox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> (props: CheckboxProps<TFieldValues, TName>) {
  const { field, fieldState } = useController<TFieldValues, TName>({
    name: props.name,
    rules: props.rules,
    shouldUnregister: props.shouldUnregister,
    defaultValue: props.defaultValue,
    control: props.control,
    disabled: props.disabled,
  })

  return (
    <ShopifyCheckbox
      {...props}
      checked={!!field.value}
      onChange={newChecked => {
        if (typeof props.onChange === 'function') {
          return props.onChange(newChecked, field)
        }

        return field.onChange(newChecked)
      }}
      error={fieldState.error?.message}
    />
  )
}

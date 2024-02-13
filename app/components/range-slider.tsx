import type { RangeSliderProps as ShopifyRangeSliderProps } from '@shopify/polaris'
import { RangeSlider as ShopifyRangeSlider } from '@shopify/polaris'
import type { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import { useController } from 'react-hook-form'
import React from 'react'
import type { ControllerRenderProps } from 'react-hook-form/dist/types/controller'
import type { RangeSliderValue } from '@shopify/polaris/build/ts/src/components/RangeSlider/types'
import type { FieldPathValue } from 'react-hook-form/dist/types'

type RangeSliderProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<ShopifyRangeSliderProps, 'name'|'onChange'|'onBlur'|'value'> & UseControllerProps<TFieldValues, TName> & {
  onBlur?: (field: ControllerRenderProps<TFieldValues, TName>) => void
  onChange?: (value: RangeSliderValue, field: ControllerRenderProps<TFieldValues, TName>) => void
  hideClear?: boolean
  renderSuffix?: (value: FieldPathValue<TFieldValues, TName>) => React.ReactNode
}

export function RangeSlider<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> (props: RangeSliderProps<TFieldValues, TName>) {
  const { field, fieldState } = useController<TFieldValues, TName>({
    name: props.name,
    rules: props.rules,
    shouldUnregister: props.shouldUnregister,
    defaultValue: props.defaultValue,
    control: props.control,
    disabled: props.disabled,
  })

  const labelAction = props.hideClear ? undefined : {
    content: 'Clear',
    onAction: () => field.onChange(null),
  }

  function onChange (value: RangeSliderValue) {
    if (typeof props?.onChange === 'function') {
      return props.onChange(value, field)
    }

    return field.onChange(value)
  }

  function onBlur () {
    if (typeof props?.onBlur === 'function') {
      return props.onBlur(field)
    }

    return field.onBlur()
  }

  function suffix () {
    if (typeof props?.renderSuffix === 'function') {
      return props.renderSuffix(field.value)
    }

    if (typeof props.suffix !== 'undefined') {
      return props.suffix
    }

    return undefined
  }

  return (
    <ShopifyRangeSlider
      labelAction={labelAction}
      {...props}
      onChange={onChange}
      onBlur={onBlur}
      value={field.value as RangeSliderValue}
      error={fieldState.error?.message}
      suffix={suffix()}
    />
  )
}

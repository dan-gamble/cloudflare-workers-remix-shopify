import type { HSBAColor, HSBColor} from '@shopify/polaris';
import { InlineStack ,
  Button,
  ColorPicker,
  FormLayout,
  hexToRgb,
  hsbToHex,
  Icon,
  Popover,
  rgbToHsb,
  Text,
  BlockStack
} from '@shopify/polaris'
import React, { useState } from 'react'
// @ts-ignore
import validateColor from 'validate-color'
import { ColorIcon, PlusCircleIcon } from '@shopify/polaris-icons'
import type { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import { useController } from 'react-hook-form'
import { TextField } from '~/components/text-field'
import { FlexItem } from '~/components/flex-item'

type ColourChoiceProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  label: string
  helpText?: string
} & UseControllerProps<TFieldValues, TName>

export function ColourChoice<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> ({
  label,
  helpText,
  ...props
}: ColourChoiceProps<TFieldValues, TName>) {
  const { field } = useController<TFieldValues, TName>(props)

  const [colour, setColour] = useState<HSBColor>({
    hue: 120,
    saturation: 1,
    brightness: 1,
  })
  const [popoverActive, setPopoverActive] = useState(false)

  const showReset = !!field.value

  const mySetColour = (colour: HSBAColor) => {
    setColour(colour)

    field.onChange(hsbToHex(colour))
  }

  const activator = (
    <button
      style={{
        position: 'relative',
        appearance: 'none',
        background: field.value ? field.value.toString() : 'none',
        border: 'var(--p-border-width-050) dashed #8c9196',
        borderRadius: 'var(--p-border-radius-200)',
        color: 'inherit',
        cursor: 'pointer',
        display: 'flex',
        fontSize: 'inherit',
        height: '2.8125rem',
        lineHeight: 'inherit',
        margin: '0',
        padding: '0',
        width: '2.8125rem',
      }}
    >
      {
        field.value
          ? (
            <div
              style={{
                backgroundColor: '#fff',
                border: 'var(--p-border-width-100) solid #8d919680',
                borderRadius: 'var(--p-border-radius-100)',
                bottom: '18.18%',
                left: '63.64%',
                position: 'absolute',
                right: '18.18%',
                top: '63.64%',
              }}
            />
          )
          : <Icon source={ColorIcon} tone="base" />
      }
    </button>
  )

  return (
    <div
      className="ColourChoice"
      onClick={() => setPopoverActive(true)}
    >
      <InlineStack blockAlign="center" wrap={false} gap="400">
        <div>
          <Popover
            active={popoverActive}
            activator={activator}
            onClose={() => setPopoverActive(false)}
            sectioned
          >
            <FormLayout>
              <BlockStack gap="200">
                <div
                  onClick={e => e.stopPropagation()}
                >
                  <ColorPicker
                    fullWidth
                    color={colour}
                    onChange={mySetColour}
                  />
                </div>

                <TextField
                  label={label}
                  autoComplete="off"
                  {...props}
                  onChange={value => {
                    if (!value.startsWith('#')) {
                      value = `#${value}`
                    }

                    value = value.slice(0, 7)

                    if (validateColor(value)) {
                      setColour(rgbToHsb(hexToRgb(value)))
                    }

                    return field.onChange(value)
                  }}
                  suffix={(
                    <div
                      style={{
                        display: 'block',
                        width: '20px',
                        height: '20px',

                        background: field.value ? field.value.toString() : '',
                        border: `var(--p-border-width-025) solid var(--p-color-input-border)`,
                        borderRadius: '50%',
                      }}
                    ></div>
                  )}
                />
              </BlockStack>
            </FormLayout>
          </Popover>
        </div>

        <FlexItem fill>
          {
            field.value
              ? (
                <>
                  <Text variant="bodyMd" as="p" fontWeight="medium">
                    {label}
                  </Text>
                  <Text variant="bodyMd" as="p" tone="subdued">
                    {helpText}
                  </Text>
                  <Text variant="bodyMd" as="p">
                    {field.value.toString()}
                  </Text>
                </>
              )
              : (
                <>
                  <Text variant="bodyMd" as="p" fontWeight="semibold">
                    {label}
                  </Text>
                  <Text variant="bodyMd" as="p" tone="subdued">
                    {helpText}
                  </Text>
                </>
              )
          }
        </FlexItem>

        <FlexItem>
          <div>
            {showReset
              ? (
                <Button
                  // @ts-ignore
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault()
                    e.stopPropagation()

                    field.onChange(null)
                    setPopoverActive(false)
                  }}
                  variant="plain"
                  tone="critical"
                >
                  Reset
                </Button>
              )
              : <Icon source={PlusCircleIcon} tone="interactive" />}
          </div>
        </FlexItem>
      </InlineStack>
    </div>
  );
}

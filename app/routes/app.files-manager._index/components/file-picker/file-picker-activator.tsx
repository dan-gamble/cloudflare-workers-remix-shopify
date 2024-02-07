import {
  Box,
  Button,
  Icon,
  InlineGrid,
  InlineStack,
  Text,
  Thumbnail,
} from '@shopify/polaris'
import React from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import type { ImageFile } from '~/routes/app.files-manager._index/components/file-picker/types'
import { ImageIcon, PlusCircleIcon } from '@shopify/polaris-icons'
import type { FieldPathValue } from 'react-hook-form/dist/types'

type FilePickerActivatorProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  label: string
  value: FieldPathValue<TFieldValues, TName>
  dirty: boolean
  onClick: () => void
  onResetClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  defaultImageUrl?: string
  helpText?: string
  activeFile?: ImageFile
}

export function FilePickerActivator<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FilePickerActivatorProps<TFieldValues, TName>) {
  const imageUrl = (() => {
    if (props.value == null) return null

    return props.value && props.activeFile
      ? props.activeFile?.image?.thumbnail
      : props.defaultImageUrl
  })()
  const showClear = !!(props.value && (props.activeFile || imageUrl))

  return (
    <div onClick={props.onClick} style={{ cursor: 'pointer' }}>
      <Box padding="200">
        <InlineGrid columns="auto 1fr auto" gap="400" alignItems="center">
          <div>
            {imageUrl ? (
              <Thumbnail source={imageUrl} alt={props.activeFile?.alt ?? ''} />
            ) : (
              <button
                style={{
                  position: 'relative',
                  appearance: 'none',
                  background: 'none',
                  border: 'var(--p-border-width-050) dashed #8c9196',
                  borderRadius: 'var(--p-border-radius-200)',
                  color: 'inherit',
                  cursor: 'pointer',
                  display: 'flex',
                  fontSize: 'inherit',
                  height: '3.75rem',
                  lineHeight: 'inherit',
                  margin: '0',
                  padding: '0',
                  width: '3.75rem',
                }}
              >
                <Icon source={ImageIcon} tone="base" />
              </button>
            )}
          </div>

          <Box>
            <InlineStack gap="200">
              <Text variant="bodyMd" as="p" fontWeight="semibold">
                {props.label}
              </Text>
            </InlineStack>

            <Text variant="bodyMd" as="p" tone="subdued">
              {props.helpText}
            </Text>
          </Box>

          <div>
            {showClear ? (
              <Button
                // @ts-ignore
                onClick={props.onResetClick}
                variant="plain"
                tone="critical"
              >
                Reset
              </Button>
            ) : (
              <Icon source={PlusCircleIcon} tone="interactive" />
            )}
          </div>
        </InlineGrid>
      </Box>
    </div>
  )
}

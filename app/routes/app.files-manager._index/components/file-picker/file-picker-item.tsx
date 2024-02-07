import { Box, Checkbox, Text, BlockStack } from '@shopify/polaris'
import React from 'react'

import type { ImageFile } from './types'

type Props = {
  file: ImageFile,
  fileName: string,
  extension: string,
  onClick: (file: ImageFile) => void,
  selected: boolean,
}

export function FilePickerItem ({ file, fileName, extension, onClick, selected }: Props) {
  return (
    <div onClick={() => onClick(file)}>
      <Box padding="300" paddingBlockStart="500">
        <BlockStack gap="300">
          <Box
            borderRadius="200"
            padding="100"
            shadow="border-inset"
          >
            <Box
              borderRadius="200"
              background="bg-surface"
            >
              <div
                style={{
                  position: 'relative',

                  alignItems: 'center',
                  justifyContent: 'center',

                  display: 'flex',
                  width: '100%',
                  paddingBottom: '100%',

                  backgroundColor: 'var(--p-color-bg-surface-selected)',
                  cursor: 'pointer',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '4px',
                    left: '4px',
                    zIndex: 3,
                  }}
                >
                  <Checkbox label="Test" labelHidden checked={selected} />
                </div>

                <img
                  src={file.image?.thumbnail}
                  alt={file.image?.altText ?? `${fileName}.${extension}`}
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',

                    width: '100%',
                    height: '100%',

                    borderRadius: 'var(--p-border-radius-200)',
                    objectFit: 'contain',
                    objectPosition: 'center',
                  }}
                />
              </div>
            </Box>
          </Box>

          <div>
            <Text as="p" variant="bodySm" alignment="center" truncate>
              {fileName}
            </Text>

            <Text as="p" variant="bodySm" tone="subdued" alignment="center" truncate>
              {extension}
            </Text>
          </div>
        </BlockStack>
      </Box>
    </div>
  )
}

import {
  ActionList,
  Badge,
  BlockStack,
  Box,
  Button,
  ButtonGroup,
  Icon,
  InlineGrid,
  InlineStack,
  Modal,
  Popover,
  Spinner,
  Text,
  TextField,
} from '@shopify/polaris'
import { parseFileNameAndExtensionFromUrl } from '~/utils'
import { useDebounce } from 'use-debounce'
import { SearchIcon, SortIcon } from '@shopify/polaris-icons'
import type { Maybe } from '~/types/admin.types';
import { FileSortKeys } from '~/types/admin.types'
import React, { useMemo, useState } from 'react'
import type {
  FieldPath,
  FieldValues,
  UseControllerProps} from 'react-hook-form';
import {
  useController
} from 'react-hook-form'
import { useFileManager } from '~/routes/app.files-manager._index/components/file-picker/hooks/use-file-manager'
import { FilePickerActivator } from '~/routes/app.files-manager._index/components/file-picker/file-picker-activator'
import type { ImageFile } from '~/routes/app.files-manager._index/components/file-picker/types'
import { FilePickerItem } from './file-picker-item'

type FilePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  label: string
  placeHolderText?: string
  helpText?: string
  baseQuery?: string
  defaultImageUrl?: Maybe<string>
  onResetClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
} & UseControllerProps<TFieldValues, TName>

export function FilePicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  helpText,
  baseQuery,
  ...props
}: FilePickerProps<TFieldValues, TName>) {
  const { field, fieldState } = useController<TFieldValues, TName>({
    name: props.name,
    rules: props.rules,
    shouldUnregister: props.shouldUnregister,
    defaultValue: props.defaultValue,
    control: props.control,
    disabled: props.disabled,
  })

  const [sortActive, setSortActive] = useState(false)
  const [sortKey, setSortKey] = useState(FileSortKeys.Id)
  const [reverse, setReverse] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [debouncedSearchText] = useDebounce(searchText, 500)

  const query = useMemo(() => {
    if (searchText) {
      return `${baseQuery} ${debouncedSearchText}`
    }

    return baseQuery
  }, [baseQuery, debouncedSearchText])

  const { files, loading, modalOpen, setModalOpen } = useFileManager({
    query,
    sortKey,
    reverse,
  })

  const activeFile = files.find(file => {
    if (field.value == null) return false
    if (file.id === field.value) return true

    return file?.image?.id === field.value
  }) as ImageFile | undefined

  const activator = (
    <FilePickerActivator
      {...props}
      value={field.value}
      dirty={fieldState.isDirty}
      label={label}
      helpText={helpText}
      defaultImageUrl={props.defaultImageUrl}
      activeFile={activeFile}
      onClick={() => setModalOpen(true)}
      onResetClick={props.onResetClick}
      onClearClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()

        field.onChange(null)
      }}
    />
  )

  return (
    <Modal
      size="large"
      open={modalOpen}
      title="Select image"
      onClose={() => setModalOpen(false)}
      activator={activator}
      primaryAction={{
        content: 'Done',
        // disabled: !props.dirty,
        disabled: false,
        onAction: () => setModalOpen(false),
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction() {
            setModalOpen(false)
          },
        },
      ]}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 3fr',
          height: '70vh',
        }}
      >
        <Box borderInlineEndWidth="025" borderColor="border">
          <Box borderBlockEndWidth="025" borderColor="border">
            <Box
              paddingBlockStart="200"
              paddingBlockEnd="200"
              paddingInlineEnd="200"
            >
              <BlockStack>
                <InlineStack gap="200" wrap={false}>
                  <Box
                    width="0.25rem"
                    minHeight="2.25rem"
                    background="bg-surface-inverse"
                    borderStartEndRadius="100"
                    borderEndEndRadius="100"
                  />

                  <Box
                    background="bg-surface-secondary-hover"
                    padding="200"
                    width="100%"
                    borderRadius="100"
                  >
                    <InlineStack align="space-between" blockAlign="center">
                      <Text
                        as="p"
                        variant="headingSm"
                        fontWeight="medium"
                        truncate
                      >
                        Images
                      </Text>

                      {loading ? (
                        <div style={{ height: '20px', width: '20px' }}>
                          <Spinner size="small" />
                        </div>
                      ) : (
                        <Badge tone="info">{files.length.toString()}</Badge>
                      )}
                    </InlineStack>
                  </Box>
                </InlineStack>
              </BlockStack>
            </Box>
          </Box>
        </Box>

        <div>
          <BlockStack gap="500">
            <Box
              paddingBlockStart="300"
              paddingBlockEnd="100"
              paddingInlineStart="500"
              paddingInlineEnd="500"
              position="sticky"
              zIndex="1000"
            >
              {loading && (
                <div
                  style={{
                    position: 'absolute',
                    top: '110%',
                    right: 'var(--p-space-500)',
                    left: 'var(--p-space-500)',
                    zIndex: 'var(--p-z-index-3)',
                  }}
                >
                  <Box
                    borderRadius="100"
                    background="bg-surface-info"
                    padding="200"
                  >
                    <InlineStack gap="200" blockAlign="center">
                      <Spinner size="small" />

                      <Text as="p" variant="bodySm" truncate>
                        Loading images...
                      </Text>
                    </InlineStack>
                  </Box>
                </div>
              )}

              <InlineStack align="space-between">
                <TextField
                  label="Search"
                  labelHidden
                  autoComplete="off"
                  placeholder="Search files"
                  prefix={<Icon source={SearchIcon} />}
                  value={searchText}
                  onChange={setSearchText}
                />

                <ButtonGroup>
                  <Popover
                    active={sortActive}
                    activator={
                      <Button
                        onClick={() => setSortActive(val => !val)}
                        icon={SortIcon}
                      >
                        Sort
                      </Button>
                    }
                    onClose={() => setSortActive(false)}
                    preferredAlignment="right"
                  >
                    <ActionList
                      actionRole="menuitem"
                      items={[
                        {
                          content: 'Date added (newest first)',
                          onAction: () => {
                            setSortKey(FileSortKeys.CreatedAt)
                            setReverse(false)
                            setSortActive(false)
                          },
                          active:
                            sortKey === FileSortKeys.CreatedAt && !reverse,
                        },
                        {
                          content: 'Date added (oldest first)',
                          onAction: () => {
                            setSortKey(FileSortKeys.CreatedAt)
                            setReverse(true)
                            setSortActive(false)
                          },
                          active: sortKey === FileSortKeys.CreatedAt && reverse,
                        },
                        {
                          content: 'Name (A-Z)',
                          onAction: () => {
                            setSortKey(FileSortKeys.Filename)
                            setReverse(false)
                            setSortActive(false)
                          },
                          active: sortKey === FileSortKeys.Filename && !reverse,
                        },
                        {
                          content: 'Name (Z-A)',
                          onAction: () => {
                            setSortKey(FileSortKeys.Filename)
                            setReverse(true)
                            setSortActive(false)
                          },
                          active: sortKey === FileSortKeys.Filename && reverse,
                        },
                        {
                          content: 'File size (smallest first)',
                          onAction: () => {
                            setSortKey(FileSortKeys.OriginalUploadSize)
                            setReverse(false)
                            setSortActive(false)
                          },
                          active:
                            sortKey === FileSortKeys.OriginalUploadSize &&
                            !reverse,
                        },
                        {
                          content: 'File size (largest first)',
                          onAction: () => {
                            setSortKey(FileSortKeys.OriginalUploadSize)
                            setReverse(true)
                            setSortActive(false)
                          },
                          active:
                            sortKey === FileSortKeys.OriginalUploadSize &&
                            reverse,
                        },
                      ]}
                    />
                  </Popover>
                </ButtonGroup>
              </InlineStack>
            </Box>

            {/*<Box paddingInlineStart="500" paddingInlineEnd="500">*/}
            {/*  <DropZone>*/}
            {/*    <DropZone.FileUpload actionTitle="Add images" actionHint="or drag and drop" />*/}
            {/*  </DropZone>*/}
            {/*</Box>*/}

            <Box paddingInlineStart="200" paddingInlineEnd="200">
              <InlineGrid
                columns="repeat(auto-fill, minmax(8.125rem, 1fr))"
                gap="200"
              >
                {files.map(file => {
                  if (file.__typename !== 'MediaImage') return null
                  if (file.image == null) return null

                  const { fileName, extension } =
                    parseFileNameAndExtensionFromUrl(file.image.thumbnail)

                  return (
                    <FilePickerItem
                      key={file.id}
                      file={file}
                      fileName={fileName}
                      extension={extension}
                      selected={file.id === activeFile?.id}
                      onClick={item => {
                        const isAlreadySelected = item.id === activeFile?.id

                        field.onChange(isAlreadySelected ? null : item.id)
                      }}
                    />
                  )
                })}
              </InlineGrid>
            </Box>
          </BlockStack>
        </div>
      </div>
    </Modal>
  )
}

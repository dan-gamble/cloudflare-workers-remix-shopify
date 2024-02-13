import { Modal, TextField } from '@shopify/polaris'
import type { ModalProps } from '@shopify/polaris/build/ts/src/components/Modal/Modal'
import { useState } from 'react'

export function ImportModal (props: ModalProps & {
  onSubmit: (value: string) => void,
  loading: boolean,
}) {
  const [value, setValue] = useState('')

  return (
    <Modal
      {...props}
      primaryAction={{
        content: 'Import',
        loading: props.loading,
        onAction: () => props.onSubmit(value),
      }}
    >
      <Modal.Section>
        <TextField
          label="Data"
          labelHidden
          autoComplete="off"
          multiline={10}
          monospaced
          maxHeight="40vh"
          value={value}
          onChange={value => setValue(value)}
        />
      </Modal.Section>
    </Modal>
  )
}

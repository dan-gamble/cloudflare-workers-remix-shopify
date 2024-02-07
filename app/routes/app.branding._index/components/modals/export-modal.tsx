import { Modal, TextField } from '@shopify/polaris'
import type { ModalProps } from '@shopify/polaris/build/ts/src/components/Modal/Modal'
import { useCheckoutBranding } from '~/routes/app.branding/route'

export function ExportModal (props: ModalProps) {
  const checkoutBranding = useCheckoutBranding()

  return (
    <Modal {...props}>
      <Modal.Section>
        <TextField
          label="Data"
          labelHidden
          autoComplete="off"
          multiline={10}
          readOnly
          maxHeight="40vh"
          value={JSON.stringify(checkoutBranding.toValues(), null, 2)}
          monospaced
          selectTextOnFocus
        />
      </Modal.Section>
    </Modal>
  )
}

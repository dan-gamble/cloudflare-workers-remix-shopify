import { useFetcher, useNavigation } from '@remix-run/react'
import { BlockStack, Card, FormLayout, Layout, Page, PageActions, Text } from '@shopify/polaris'
import { TextFontIcon } from '@shopify/polaris-icons'
import { TextField } from '~/components/text-field'
import { useCheckoutBranding } from '~/routes/app.branding/route'
import { CheckoutBrandingTabs } from '~/routes/app.branding._index/components/tabs'

export default function CheckoutBranding () {
  const fetcher = useFetcher()
  const navigation = useNavigation()

  const checkoutBranding = useCheckoutBranding()

  const primaryAction = {
    content: 'Save',
    disabled: !checkoutBranding.isDirty,
    loading: navigation.state === 'submitting',
    onAction: checkoutBranding.handleSubmit,
  }

  return (
    <Page
      title="Checkout Branding"
      primaryAction={primaryAction}
      secondaryActions={[
        {
          content: 'Update Shopify Font Families',
          icon: TextFontIcon,
          async onAction () {
            fetcher.submit({}, {
              action: '/app/update-shopify-font-families',
              method: 'POST',
            })
          },
          loading: fetcher.state === 'loading' || fetcher.state === 'submitting',
        },
      ]}
    >
      <Layout>
        <Layout.Section>
          <CheckoutBrandingTabs />
        </Layout.Section>

        <Layout.Section variant="oneThird">
          <Card padding="400">
            <BlockStack gap="200">
              <Text variant="headingSm" as="h2">
                Corner radiuses
              </Text>

              <BlockStack gap="400">
                <Text as="p">
                  This property group applies to global corner radius token values.
                </Text>

                <div>
                  <FormLayout>
                    <TextField
                      name="base"
                      control={checkoutBranding.forms.cornerRadiusForm.control}
                      label="Base"
                      type="number"
                      min="0"
                      autoComplete="off"
                      helpText="The pixel value for base corner radiuses. It should be strictly positive."
                      onChange={(value, field) => {
                        const number = parseInt(value, 10)

                        field.onChange(number)
                      }}
                    />

                    <TextField
                      name="small"
                      control={checkoutBranding.forms.cornerRadiusForm.control}
                      label="Small"
                      type="number"
                      min="0"
                      autoComplete="off"
                      helpText="The pixel value for small corner radiuses. It should be strictly positive."
                      onChange={(value, field) => {
                        const number = parseInt(value, 10)

                        field.onChange(number)
                      }}
                    />

                    <TextField
                      name="large"
                      control={checkoutBranding.forms.cornerRadiusForm.control}
                      label="Large"
                      type="number"
                      min="0"
                      autoComplete="off"
                      helpText="The pixel value for large corner radiuses. It should be strictly positive."
                      onChange={(value, field) => {
                        const number = parseInt(value, 10)

                        field.onChange(number)
                      }}
                    />
                  </FormLayout>
                </div>
              </BlockStack>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section variant="fullWidth">
          <PageActions primaryAction={primaryAction} />
        </Layout.Section>
      </Layout>
    </Page>
  )
}

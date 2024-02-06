import type { ActionFunctionArgs, LinksFunction } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare'
import { useFetcher, useNavigation, useSubmit } from '@remix-run/react'
import { BlockStack, Card, Layout, Page, PageActions, Text } from '@shopify/polaris'
import { TextFontIcon } from '@shopify/polaris-icons'
import { TextField } from '~/components/text-field'
import { useCheckoutBranding, useCheckoutBrandingData } from '~/routes/app.branding/route'
import { CheckoutBrandingTabs } from '~/routes/app.branding._index/components/tabs'

import styles from './styles.css'
import { getContext } from '~/utils/context.server'
import { checkoutBrandingFormData } from '~/routes/app.branding._index/schema'
import { parseWithZod } from '@conform-to/zod'
import { makeRequest } from '~/utils/graphql.server'
import {
  checkoutBrandingUpsertMutation
} from '~/routes/app.branding._index/graphql/mutations/checkout-branding-upsert-mutation'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
]

export async function action ({ request }: ActionFunctionArgs) {
  const { shopify } = getContext()
  const { admin } = await shopify.authenticate.admin(request)

  const submission = parseWithZod(await request.formData(), { schema: checkoutBrandingFormData })

  if (submission.status !== 'success') {
    return json(submission.reply(), {
      status: submission.status === 'error' ? 400 : 200,
    })
  }

  // TODO: Check for errors
  await makeRequest(admin.graphql, checkoutBrandingUpsertMutation, {
    variables: {
      checkoutProfileId: submission.value.checkoutProfileId,
      checkoutBrandingInput: submission.value.checkoutBrandingInput,
    }
  })

  return json({ status: 'success', submission } as const)
}

export default function CheckoutBranding () {
  const fetcher = useFetcher()
  const navigation = useNavigation()
  const submit = useSubmit()

  const checkoutBranding = useCheckoutBranding()
  const checkoutBrandingData = useCheckoutBrandingData()

  function handleSubmit () {
    return submit({
      checkoutProfileId: checkoutBrandingData.branding.profileId,
      checkoutBrandingInput: JSON.stringify(checkoutBranding.toValues()),
    }, { method: 'POST' })
  }

  const primaryAction = {
    content: 'Save',
    disabled: !checkoutBranding.isDirty,
    loading: navigation.state === 'submitting',
    onAction: handleSubmit,
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
                  <BlockStack gap="400">
                    <TextField
                      name="base"
                      control={checkoutBranding.forms.cornerRadiusForm.control}
                      label="Base"
                      type="number"
                      min="0"
                      autoComplete="off"
                      helpText="The pixel value for small corner radiuses. It should be strictly positive."
                      onChange={(value, field) => {
                        const number = parseInt(value, 10)

                        if (Number.isNaN(number)) {
                          return field.onChange(null)
                        }

                        return field.onChange(number)
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

                        if (Number.isNaN(number)) {
                          return field.onChange(null)
                        }

                        return field.onChange(number)
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

                        if (Number.isNaN(number)) {
                          return field.onChange(null)
                        }

                        return field.onChange(number)
                      }}
                    />
                  </BlockStack>
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

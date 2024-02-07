import type { ActionFunctionArgs, LinksFunction } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { useFetcher, useNavigation, useSearchParams, useSubmit } from '@remix-run/react'
import { BlockStack, Card, Icon, Layout, Page, PageActions, Select, Spinner, Text } from '@shopify/polaris'
import { TextFontIcon, ViewIcon } from '@shopify/polaris-icons'
import { TextField } from '~/components/text-field'
import { useCheckoutBranding, useCheckoutBrandingData } from '~/routes/app.branding/route'
import { CheckoutBrandingTabs } from '~/routes/app.branding._index/components/tabs'

import styles from './styles.css'
import { getContext } from '~/utils/context.server'
import { checkoutBrandingFormData } from '~/routes/app.branding._index/schema'
import { parseWithZod } from '@conform-to/zod'
import { makeRequest } from '~/utils/graphql.server'
import {
  checkoutBrandingUpsertMutation,
} from '~/routes/app.branding._index/graphql/mutations/checkout-branding-upsert-mutation'
import { parseGid } from '@shopify/admin-graphql-api-utilities'

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
    },
  })

  return json({ status: 'success', submission } as const)
}

export default function CheckoutBranding () {
  const updateShopifyFontFamilies = useFetcher()
  const navigation = useNavigation()
  const [, setSearchParams] = useSearchParams()
  const submit = useSubmit()

  const checkoutBranding = useCheckoutBranding()
  const checkoutBrandingData = useCheckoutBrandingData()

  const isUpdatingShopifyFontFamilies = updateShopifyFontFamilies.state === 'loading' || updateShopifyFontFamilies.state === 'submitting'

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
      titleMetadata={isUpdatingShopifyFontFamilies && <Spinner size="small" />}
      primaryAction={primaryAction}
      secondaryActions={[
        {
          content: 'Preview',
          icon: ViewIcon,
          onAction: () => {
            open(
              `shopify:admin/settings/checkout/preview/profiles/${parseGid(checkoutBrandingData.branding.profileId)}`,
              '_blank',
            )
          },
        },
      ]}
      actionGroups={[
        {
          title: 'BAO',
          actions: [
            {
              content: 'Update Shopify Font Families',
              async onAction () {
                updateShopifyFontFamilies.submit({}, {
                  action: '/app/update-shopify-font-families',
                  method: 'POST',
                })
              },
              prefix: (
                <Icon source={TextFontIcon} />
              )
            }
          ]
        }
      ]}
    >
      <Layout>
        <Layout.Section>
          <CheckoutBrandingTabs />
        </Layout.Section>

        <Layout.Section variant="oneThird">
          <BlockStack gap="400">
            {checkoutBrandingData.branding.profiles.length > 1 && (
              <Card padding="400">
                <BlockStack gap="200">
                  <Text variant="headingSm" as="h2">
                    Checkout profiles
                  </Text>

                  <BlockStack gap="400">
                    <Select
                      label="Checkout profiles"
                      labelHidden
                      options={[
                        ...checkoutBrandingData.branding.profiles.map(profile => (
                          {
                            label: profile.name,
                            value: profile.id,
                          }
                        )),
                      ]}
                      value={checkoutBrandingData.branding.profileId}
                      onChange={value => {
                        setSearchParams(previousParams => {
                          previousParams.set('profileId', value)

                          return previousParams
                        })
                      }}
                    />
                  </BlockStack>
                </BlockStack>
              </Card>
            )}

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
          </BlockStack>
        </Layout.Section>

        <Layout.Section variant="fullWidth">
          <PageActions primaryAction={primaryAction} />
        </Layout.Section>
      </Layout>
    </Page>
  )
}

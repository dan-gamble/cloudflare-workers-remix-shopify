import type { ActionFunctionArgs, LinksFunction } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { useActionData, useFetcher, useNavigation, useSubmit } from '@remix-run/react'
import { Banner, BlockStack, Card, Icon, Layout, Page, PageActions, Select, Spinner, Text } from '@shopify/polaris'
import { ExportIcon, ImportIcon, TextFontIcon, ViewIcon } from '@shopify/polaris-icons'
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
import { useCallback, useEffect } from 'react'
import { ExportModal } from '~/routes/app.branding._index/components/modals/export-modal'
import { ImportModal } from '~/routes/app.branding._index/components/modals/import-modal'
import { invariant } from '@epic-web/invariant'
import { useShopifySearchParams } from '~/hooks/use-shopify-search-params'

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
      // TODO:
      // @ts-ignore
      checkoutBrandingInput: submission.value.checkoutBrandingInput,
    },
  })

  return json({ status: 'success', submission } as const)
}

export default function CheckoutBranding () {
  const actionData = useActionData<typeof action>()
  const updateShopifyFontFamilies = useFetcher()
  const navigation = useNavigation()
  const [searchParams, setSearchParams] = useShopifySearchParams()
  const submit = useSubmit()

  const checkoutBranding = useCheckoutBranding()
  const checkoutBrandingData = useCheckoutBrandingData()

  const isUpdatingShopifyFontFamilies = updateShopifyFontFamilies.state === 'loading' || updateShopifyFontFamilies.state === 'submitting'

  const currentCheckoutProfile = checkoutBrandingData.branding.profiles.find(profile => profile.id === checkoutBrandingData.branding.profileId)
  invariant(currentCheckoutProfile, 'Current checkout profile not found')

  function handleSubmit () {
    return submit({
      checkoutProfileId: checkoutBrandingData.branding.profileId,
      checkoutBrandingInput: JSON.stringify(checkoutBranding.toDirtyInputValues()),
    }, { method: 'POST' })
  }

  const primaryAction = {
    content: 'Save',
    disabled: !checkoutBranding.isDirty,
    loading: navigation.state === 'submitting',
    onAction: handleSubmit,
  }

  const openExportModal = useCallback(() => {
    return setSearchParams(searchParams => {
      searchParams.set('export', '')

      return searchParams
    })
  }, [setSearchParams])

  const closeExportModal = useCallback(() => {
    return setSearchParams(searchParams => {
      searchParams.delete('export')

      return searchParams
    })
  }, [setSearchParams])

  const openImportModal = useCallback(() => {
    return setSearchParams(searchParams => {
      searchParams.set('import', '')

      return searchParams
    })
  }, [setSearchParams])

  const closeImportModal = useCallback(() => {
    return setSearchParams(searchParams => {
      searchParams.delete('import')

      return searchParams
    })
  }, [setSearchParams])

  useEffect(() => {
    if (actionData?.status === 'success') {
      shopify.toast.show('Checkout branding has been updated')

      closeImportModal()
    }
  }, [actionData?.status, closeImportModal])

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
              `shopify:admin/settings/checkout/editor/profiles/${parseGid(checkoutBrandingData.branding.profileId)}?page=checkout`,
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
            },
            {
              content: 'Export',
              accessibilityLabel: 'Export',
              onAction: openExportModal,
              prefix: (
                <Icon source={ExportIcon} />
              ),
            },
            {
              content: 'Import',
              accessibilityLabel: 'Import',
              onAction: openImportModal,
              prefix: (
                <Icon source={ImportIcon} />
              ),
            },
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
                            label: `${profile.name}${profile.isPublished ? ' (published)' : ''}`,
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

                    {currentCheckoutProfile.isPublished && (
                      <Banner
                        title="Warning"
                        tone="warning"
                      >
                        <Text as="p">You are editing the <Text as="span" fontWeight="bold">published</Text> checkout profile</Text>
                      </Banner>
                    )}
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
                        control={checkoutBranding.forms.cornerRadius.control}
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
                        control={checkoutBranding.forms.cornerRadius.control}
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
                        control={checkoutBranding.forms.cornerRadius.control}
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

      <ExportModal
        open={searchParams.has('export')}
        title="Export"
        onClose={closeExportModal}
        primaryAction={{
          content: 'Copy',
          onAction: async () => {
            await navigator.clipboard.writeText(
              JSON.stringify(
                checkoutBranding.toValues(),
                null,
                2,
              ),
            )

            shopify.toast.show('Copied to clipboard')

            closeExportModal()
          },
        }}
        secondaryActions={[
          {
            content: 'Close',
            onAction: closeExportModal,
          },
        ]}
      />

      <ImportModal
        open={searchParams.has('import')}
        title="Import"
        onClose={closeImportModal}
        loading={navigation.state === 'submitting'}
        secondaryActions={[
          {
            content: 'Close',
            onAction: closeImportModal,
          },
        ]}
        onSubmit={(value) => {
          submit({
            checkoutProfileId: checkoutBrandingData.branding.profileId,
            checkoutBrandingInput: value,
          }, { method: 'POST' })
        }}
      />
    </Page>
  )
}

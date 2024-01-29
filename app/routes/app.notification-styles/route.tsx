import CodeMirror from '@uiw/react-codemirror'
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { parse } from '@conform-to/zod'
import { useActionData, useLoaderData, useNavigation, useSubmit } from '@remix-run/react'
import type { PropsWithChildren } from 'react'
import { useEffect, useState } from 'react'
import { BlockStack, Box, Card, Layout, Page, Text } from '@shopify/polaris'
import { gruvboxDark } from '@uiw/codemirror-theme-gruvbox-dark'
import { css } from '@codemirror/lang-css'
import { makeRequest } from '~/utils/graphql.server'
import { shopMetafieldQuery } from '~/graphql/queries/shop-metafield-query'
import { UpdateNotificationStylesJob } from '~/jobs/update-notification-styles-job'
import {
  METAFIELD_KEY,
  METAFIELD_NAMESPACE,
  notificationStylesSchema,
} from '~/routes/app.notification-styles/constants'

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const { admin } = await context.shopify.authenticate.admin(request)

  const notificationStyles = await makeRequest(admin.graphql, shopMetafieldQuery, {
    variables: {
      namespace: METAFIELD_NAMESPACE,
      key: METAFIELD_KEY,
    },
  })

  return json(notificationStyles.data)
}

export default function NotificationStyles () {
  const actionData = useActionData<typeof action>()
  const loaderData = useLoaderData<typeof loader>()

  const navigation = useNavigation()
  const submit = useSubmit()

  const isLoading =
    ['loading', 'submitting'].includes(navigation.state) && navigation.formMethod === 'POST'

  const [codeString, setCodeString] = useState(loaderData.shop.metafield?.value ?? '')

  const ok = actionData?.ok

  useEffect(() => {
    if (ok) {
      shopify.toast.show('Notification styles saved')
    }
  }, [ok])

  return (
    <Page
      title="Notification Styles"
      fullWidth
      primaryAction={{
        content: 'Save',
        onAction () {
          submit(
            { value: codeString, ownerId: loaderData.shop.id },
            { method: 'POST', replace: true },
          )
        },
        loading: isLoading,
      }}
    >
      <BlockStack gap="500">
        <Layout>
          <Layout.Section variant="fullWidth">
            <Card>
              <BlockStack gap="300">
                <Text as="p">The metafield is saved to the shop
                  under <Code>shop.metafields.{METAFIELD_NAMESPACE}.{METAFIELD_KEY}</Code></Text>

                <CodeMirror
                  value={codeString}
                  height="70vh"
                  onChange={setCodeString}
                  theme={gruvboxDark}
                  extensions={[css()]}
                  basicSetup={{
                    highlightActiveLine: true,
                  }}
                />
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  )
}

function Code ({ children }: PropsWithChildren) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-secondary"
      borderWidth="100"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  )
}

export const action = async ({ context, request }: ActionFunctionArgs) => {
  const { session } = await context.shopify.authenticate.admin(request)
  const formData = await request.formData()
  const submission = parse(formData, { schema: notificationStylesSchema })

  if (submission.intent !== 'submit') {
    return json({ status: 'idle', submission, ok: false } as const)
  }

  if (!submission.value) {
    return json({ status: 'error', submission, ok: false } as const, { status: 400 })
  }

  await UpdateNotificationStylesJob.dispatch(session.shop, submission.value.value)

  return json({ status: 'success', submission, ok: true } as const)
}
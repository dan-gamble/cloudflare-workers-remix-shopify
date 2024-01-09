import CodeMirror from '@uiw/react-codemirror'
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { z } from 'zod'
import { makeGraphQLRequest } from '~/utils/graphql.server'
import { ShopMetafieldDocument } from '~/generated/graphql'
import { parse } from '@conform-to/zod'
import { useActionData, useLoaderData, useNavigation, useSubmit } from '@remix-run/react'
import type { PropsWithChildren} from 'react';
import { useEffect, useState } from 'react'
import { BlockStack, Box, Card, Layout, Page, Text } from '@shopify/polaris'
import { gruvboxDark } from '@uiw/codemirror-theme-gruvbox-dark'
import { css } from '@codemirror/lang-css'

const METAFIELD_NAMESPACE = 'emails'
const METAFIELD_KEY = 'notification_style'

const notificationStylesSchema = z.object({
  ownerId: z.string({ required_error: 'Owner ID is required' }),
  value: z.string({ required_error: 'Value is required' }),
})

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const { admin } = await context.shopify.authenticate.admin(request)
  const notificationStyles = await makeGraphQLRequest(admin.graphql, {
    document: ShopMetafieldDocument,
    variables: {
      namespace: METAFIELD_NAMESPACE,
      key: METAFIELD_KEY,
    },
  })

  return json(notificationStyles)
}

export default function NotificationStyles () {
  const actionData = useActionData<typeof action>()
  const loaderData = useLoaderData<typeof loader>()

  const navigation = useNavigation()
  const submit = useSubmit()

  const isLoading =
    ['loading', 'submitting'].includes(navigation.state) && navigation.formMethod === 'POST'

  const [codeString, setCodeString] = useState(loaderData.shop.metafield?.value ?? '')

  const metafieldId = actionData?.metafield?.id

  console.log({ metafieldId })

  useEffect(() => {
    if (metafieldId) {
      shopify.toast.show('Notification styles saved')
    }
  }, [metafieldId])

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
  const { admin, session } = await context.shopify.authenticate.admin(request)
  const formData = await request.formData()
  const submission = parse(formData, { schema: notificationStylesSchema })

  if (submission.intent !== 'submit') {
    return json({ status: 'idle', submission, metafield: null } as const)
  }

  if (!submission.value) {
    return json({ status: 'error', submission, metafield: null } as const, { status: 400 })
  }

  const metafield = new admin.rest.resources.Metafield({ session: session })
  metafield.namespace = METAFIELD_NAMESPACE
  metafield.key = METAFIELD_KEY
  metafield.type = 'multi_line_text_field'
  metafield.value = submission.value.value

  await metafield.save({ update: true })

  return json({ status: 'success', submission, metafield } as const)
}

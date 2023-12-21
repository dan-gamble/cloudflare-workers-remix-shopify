import { ActionFunctionArgs, json, unstable_parseMultipartFormData } from '@remix-run/cloudflare'
import { Form } from '@remix-run/react'
import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
} from '@shopify/polaris'
import { parseMultipartFormData } from '~/utils/form-data.server'
import { storage } from '~/utils/storage.server'

export async function action ({ context, request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const file = formData.get('file')
  if (!(file instanceof File)) throw new Error('Not a file')
  const key = file.name

  const r2Object = await storage().put(key, file)

  // const formData = await parseMultipartFormData(
  //   request,
  //   async ({ name, filename, stream, data, ...rest }) => {
  //     console.log({ rest })
  //
  //     if (name === 'file') {
  //       console.log('a', { stream })
  //       const r2Object = await storage().put(filename, stream, {
  //         httpMetadata: request.headers,
  //       })
  //       console.log({ r2Object })
  //       console.log('b')
  //
  //       return r2Object.key
  //     }
  //
  //     console.log({ name, filename, data })
  //
  //     return data
  //   }
  // )

  const url = storage().url(key)

  console.log({ url })

  return json({})
}

export default function AdditionalPage () {
  return (
    <Page>
      <ui-title-bar title='Additional page' />

      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap='300'>
              <Text as='p' variant='bodyMd'>
                The app template comes with an additional page which
                demonstrates how to create multiple pages within app navigation
                using{' '}
                <Link
                  url='https://shopify.dev/docs/apps/tools/app-bridge'
                  target='_blank'
                  removeUnderline
                >
                  App Bridge
                </Link>
                .
              </Text>
              <Text as='p' variant='bodyMd'>
                To create your own page and have it show up in the app
                navigation, add a page inside <Code>app/routes</Code>, and a
                link to it in the <Code>&lt;ui-nav-menu&gt;</Code> component
                found in <Code>app/routes/app.jsx</Code>.
              </Text>

              <Form method="post" encType="multipart/form-data">
                <label htmlFor="avatar-input">Avatar</label>
                <input id="avatar-input" type="file" name="file" />
                <button>Upload</button>
              </Form>
              </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section variant='oneThird'>
          <Card>
            <BlockStack gap='200'>
              <Text as='h2' variant='headingMd'>
                Resources
              </Text>
              <List>
                <List.Item>
                  <Link
                    url='https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav'
                    target='_blank'
                    removeUnderline
                  >
                    App nav best practices
                  </Link>
                </List.Item>
              </List>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}

function Code ({ children }: { children: React.ReactNode }) {
  return (
    <Box
      as='span'
      padding='025'
      paddingInlineStart='100'
      paddingInlineEnd='100'
      background='bg-surface-active'
      borderWidth='025'
      borderColor='border'
      borderRadius='100'
    >
      <code>{children}</code>
    </Box>
  )
}

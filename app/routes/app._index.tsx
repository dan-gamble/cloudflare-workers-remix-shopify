import { useEffect } from 'react'
import type {
  ActionFunctionArgs,
  HeadersFunction,
  LoaderFunctionArgs
} from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { useActionData, useNavigation, useSubmit } from '@remix-run/react'
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  List,
  Link,
  InlineStack
} from '@shopify/polaris'
import { shops } from '~/utils/db/schema.server'
import { eq } from 'drizzle-orm'
import { combineServerTimings, makeTimings, time } from '~/utils/timing.server'
import { SayHelloJob } from '~/jobs/say-hello-job'

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const { session } = await context.shopify.authenticate.admin(request)
  const { cache } = context

  const timings = makeTimings('index')

  // This doesn't need to be cached, but it's a good example of how to use the cache with timings
  const shop = await time(
    () =>
      cache({
        ttl: 1000 * 10,
        key: `index:shop:${session.shop}`,
        async getFreshValue () {
          const [shop]  = await context.db.select().from(shops).where(eq(shops.shopDomain, session.shop)).limit(1)

          return shop
        },
      }),
    { timings, type: 'find shop' }
  )

  SayHelloJob.dispatch('Hello, world :)')

  return json(
    { shop },
    {
      headers: { 'Server-Timing': timings.toString() }
    }
  )
}

export const headers: HeadersFunction = ({ loaderHeaders, parentHeaders }) => {
  return {
    'Server-Timing': combineServerTimings(parentHeaders, loaderHeaders)
  }
}

export const action = async ({ context, request }: ActionFunctionArgs) => {
  const { admin } = await context.shopify.authenticate.admin(request)
  const color = ['Red', 'Orange', 'Yellow', 'Green'][
    Math.floor(Math.random() * 4)
  ]
  const response = await admin.graphql(
    `#graphql
    mutation populateProduct($input: ProductInput!) {
      productCreate(input: $input) {
        product {
          id
          title
          handle
          status
          variants(first: 10) {
            edges {
              node {
                id
                price
                barcode
                createdAt
              }
            }
          }
        }
      }
    }`,
    {
      variables: {
        input: {
          title: `${color} Snowboard`,
          variants: [{ price: Math.random() * 100 }]
        }
      }
    }
  )
  const responseJson = await response.json()

  return json({
    // @ts-expect-error
    product: responseJson.data.productCreate.product
  })
}

export default function Index () {
  const nav = useNavigation()
  const actionData = useActionData<typeof action>()
  const submit = useSubmit()
  const isLoading =
    ['loading', 'submitting'].includes(nav.state) && nav.formMethod === 'POST'
  const productId = actionData?.product?.id.replace(
    'gid://shopify/Product/',
    ''
  )

  useEffect(() => {
    if (productId) {
      shopify.toast.show('Product created')
    }
  }, [productId])
  const generateProduct = () => submit({}, { replace: true, method: 'POST' })

  return (
    <Page>
      <BlockStack gap='500'>
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap='500'>
                <BlockStack gap='200'>
                  <Text as='h2' variant='headingMd'>
                    Congrats on creating a new Shopify app 🎉
                  </Text>
                  <Text variant='bodyMd' as='p'>
                    This embedded app template uses{' '}
                    <Link
                      url='https://shopify.dev/docs/apps/tools/app-bridge'
                      target='_blank'
                      removeUnderline
                    >
                      App Bridge
                    </Link>{' '}
                    interface examples like an{' '}
                    <Link url='/app/additional' removeUnderline>
                      additional page in the app nav
                    </Link>
                    , as well as an{' '}
                    <Link
                      url='https://shopify.dev/docs/api/admin-graphql'
                      target='_blank'
                      removeUnderline
                    >
                      Admin GraphQL
                    </Link>{' '}
                    mutation demo, to provide a starting point for app
                    development.
                  </Text>
                </BlockStack>
                <BlockStack gap='200'>
                  <Text as='h3' variant='headingMd'>
                    Get started with products
                  </Text>
                  <Text as='p' variant='bodyMd'>
                    Generate a product with GraphQL and get the JSON output for
                    that product. Learn more about the{' '}
                    <Link
                      url='https://shopify.dev/docs/api/admin-graphql/latest/mutations/productCreate'
                      target='_blank'
                      removeUnderline
                    >
                      productCreate
                    </Link>{' '}
                    mutation in our API references.
                  </Text>
                </BlockStack>
                <InlineStack gap='300'>
                  <Button loading={isLoading} onClick={generateProduct}>
                    Generate a product
                  </Button>
                  {actionData?.product && (
                    <Button
                      url={`shopify:admin/products/${productId}`}
                      target='_blank'
                      variant='plain'
                    >
                      View product
                    </Button>
                  )}
                </InlineStack>
                {actionData?.product && (
                  <Box
                    padding='400'
                    background='bg-surface-active'
                    borderWidth='025'
                    borderRadius='200'
                    borderColor='border'
                    overflowX='scroll'
                  >
                    <pre style={{ margin: 0 }}>
                      <code>{JSON.stringify(actionData.product, null, 2)}</code>
                    </pre>
                  </Box>
                )}
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant='oneThird'>
            <BlockStack gap='500'>
              <Card>
                <BlockStack gap='200'>
                  <Text as='h2' variant='headingMd'>
                    App template specs
                  </Text>
                  <BlockStack gap='200'>
                    <InlineStack align='space-between'>
                      <Text as='span' variant='bodyMd'>
                        Framework
                      </Text>
                      <Link
                        url='https://remix.run'
                        target='_blank'
                        removeUnderline
                      >
                        Remix
                      </Link>
                    </InlineStack>
                    <InlineStack align='space-between'>
                      <Text as='span' variant='bodyMd'>
                        Database
                      </Text>
                      <Link
                        url='https://www.prisma.io/'
                        target='_blank'
                        removeUnderline
                      >
                        Prisma
                      </Link>
                    </InlineStack>
                    <InlineStack align='space-between'>
                      <Text as='span' variant='bodyMd'>
                        Interface
                      </Text>
                      <span>
                        <Link
                          url='https://polaris.shopify.com'
                          target='_blank'
                          removeUnderline
                        >
                          Polaris
                        </Link>
                        {', '}
                        <Link
                          url='https://shopify.dev/docs/apps/tools/app-bridge'
                          target='_blank'
                          removeUnderline
                        >
                          App Bridge
                        </Link>
                      </span>
                    </InlineStack>
                    <InlineStack align='space-between'>
                      <Text as='span' variant='bodyMd'>
                        API
                      </Text>
                      <Link
                        url='https://shopify.dev/docs/api/admin-graphql'
                        target='_blank'
                        removeUnderline
                      >
                        GraphQL API
                      </Link>
                    </InlineStack>
                  </BlockStack>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap='200'>
                  <Text as='h2' variant='headingMd'>
                    Next steps
                  </Text>
                  <List>
                    <List.Item>
                      Build an{' '}
                      <Link
                        url='https://shopify.dev/docs/apps/getting-started/build-app-example'
                        target='_blank'
                        removeUnderline
                      >
                        {' '}
                        example app
                      </Link>{' '}
                      to get started
                    </List.Item>
                    <List.Item>
                      Explore Shopify’s API with{' '}
                      <Link
                        url='https://shopify.dev/docs/apps/tools/graphiql-admin-api'
                        target='_blank'
                        removeUnderline
                      >
                        GraphiQL
                      </Link>
                    </List.Item>
                  </List>
                </BlockStack>
              </Card>
            </BlockStack>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  )
}

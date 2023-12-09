import { useState } from 'react'
import type {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunctionArgs
} from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import {
  AppProvider as PolarisAppProvider,
  Button,
  Card,
  FormLayout,
  Page,
  Text,
  TextField
} from '@shopify/polaris'

import { Form, useActionData, useLoaderData } from '@remix-run/react'
import polarisStyles from '@shopify/polaris/build/esm/styles.css'

import { loginErrorMessage } from './error.server'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: polarisStyles }
]

export async function loader ({ context, request }: LoaderFunctionArgs) {
  const errors = loginErrorMessage(await context.shopify.login(request))

  return json({
    errors,
    polarisTranslations: require('@shopify/polaris/locales/en.json')
  })
}

export async function action ({ context, request }: ActionFunctionArgs) {
  const errors = loginErrorMessage(await context.shopify.login(request))

  return json({
    errors
  })
}

export default function Auth () {
  const { polarisTranslations } = useLoaderData<typeof loader>()
  const loaderData = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()
  const [shop, setShop] = useState('')
  const { errors } = actionData || loaderData

  return (
    <PolarisAppProvider i18n={polarisTranslations}>
      <Page>
        <Card>
          <Form method='post'>
            <FormLayout>
              <Text variant='headingMd' as='h2'>
                Log in
              </Text>

              <TextField
                type='text'
                name='shop'
                label='Shop domain'
                helpText='example.myshopify.com'
                value={shop}
                onChange={setShop}
                autoComplete='on'
                error={errors?.shop ?? ''}
              />

              <Button submit>Log in</Button>
            </FormLayout>
          </Form>
        </Card>
      </Page>
    </PolarisAppProvider>
  )
}

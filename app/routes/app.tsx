import { Link, Outlet, useLoaderData, useRouteError } from '@remix-run/react'
import polarisStyles from '@shopify/polaris/build/esm/styles.css'
import { boundary } from '@shopify/shopify-app-remix'
import type { HeadersFunction, LoaderFunctionArgs } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
// @ts-ignore
import { AppProvider } from '@shopify/shopify-app-remix/react'
import { ShopLocalisationDocument } from '~/generated/graphql'
import { makeGraphQLRequest } from '~/utils/graphql.server'
import { I18nContext, I18nManager } from '@shopify/react-i18n'
import type { AppContext } from '~/types'
import { getContext } from '~/utils/context.server'

export const links = () => [{ rel: 'stylesheet', href: polarisStyles }]

export async function loader ({ request }: LoaderFunctionArgs) {
  const { env, shopify } = getContext()
  const { admin } = await shopify.authenticate.admin(request)

  const { shop } = await makeGraphQLRequest(admin.graphql, {
    document: ShopLocalisationDocument,
  })

  return json({
    polarisTranslations: require('@shopify/polaris/locales/en.json'),
    apiKey: env?.SHOPIFY_API_KEY ?? '',
    shop,
  })
}

export default function App () {
  const { apiKey, polarisTranslations, shop } = useLoaderData<typeof loader>()
  const locale = 'en'
  const i18nManager = new I18nManager({
    locale,
  })

  return (
    <AppProvider
      isEmbeddedApp
      apiKey={apiKey}
      i18n={polarisTranslations}
    >
      <ui-nav-menu>
        <Link to="/app" rel="home">
          Home
        </Link>

        <Link to="/app/additional">Additional</Link>

        <Link to="/app/notification-styles">Notification styles</Link>
      </ui-nav-menu>

      <I18nContext.Provider value={i18nManager}>
        <Outlet context={{ shop } satisfies AppContext} />
      </I18nContext.Provider>
    </AppProvider>
  )
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary () {
  return boundary.error(useRouteError())
}

export const headers: HeadersFunction = headersArgs => {
  return boundary.headers(headersArgs)
}

import { brandingFragment } from '~/routes/app.branding/graphql/fragments/branding-fragment'

export const brandingQuery = `#graphql
  ${brandingFragment}

  query checkoutBranding($checkoutProfileId: ID!) {
    checkoutBranding(checkoutProfileId: $checkoutProfileId) {
      ...BrandingFragment
    }
  }
` as const

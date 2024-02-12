import { checkoutBrandingFragment } from '~/routes/app.branding._index/graphql/fragments/checkout-branding-fragment'

export const brandingQuery = `#graphql
  ${checkoutBrandingFragment}

  query checkoutBranding($checkoutProfileId: ID!) {
    checkoutBranding(checkoutProfileId: $checkoutProfileId) {
      ...CheckoutBrandingFragment
    }
  }
` as const

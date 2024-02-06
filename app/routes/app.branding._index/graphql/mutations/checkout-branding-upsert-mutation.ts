import {
  checkoutBrandingFragment
} from '~/routes/app.branding._index/graphql/fragments/checkout-branding-fragment'

export const checkoutBrandingUpsertMutation = `#graphql
  ${checkoutBrandingFragment}

  mutation checkoutBrandingUpsert($checkoutBrandingInput: CheckoutBrandingInput!, $checkoutProfileId: ID!) {
    checkoutBrandingUpsert(checkoutBrandingInput: $checkoutBrandingInput, checkoutProfileId: $checkoutProfileId) {
      checkoutBranding {
        ...CheckoutBrandingFragment
      }

      userErrors {
        field
        message
      }
    }
  }
`

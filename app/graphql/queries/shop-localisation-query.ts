import gql from 'graphql-tag'

export const shopLocalisationQuery = gql`
  query shopLocalisation {
    shop {
      currencyCode
    }
  }
`

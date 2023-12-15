import gql from 'graphql-tag'

export const shopMetafieldQuery = gql`
  query shopMetafield ($namespace: String!, $key: String!) {
    shop {
      id
      metafield(namespace: $namespace, key: $key) {
        id
        namespace
        key
        value
        type
      }
    }
  }
`

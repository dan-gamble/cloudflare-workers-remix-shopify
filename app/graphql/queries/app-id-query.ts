import gql from 'graphql-tag'

export const appIdQuery = gql`
  query appId {
    app {
      id
    }
  }
`

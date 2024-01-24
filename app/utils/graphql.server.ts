import type { AdminOperations } from '@shopify/admin-api-client'
import type { GraphQLClient, GraphQLQueryOptions } from '@shopify/shopify-app-remix/build/ts/server/clients/types'
import { GraphqlQueryError } from '@shopify/shopify-api'
import type { ClientResponse } from '@shopify/graphql-client'
import { invariant } from '@epic-web/invariant'

export type ShopifyGraphQLClient<Operations extends AdminOperations = AdminOperations> = GraphQLClient<Operations>

type ErrorBodyResponse = Required<Omit<ClientResponse, 'data'>>

export async function makeRequest<
  Operations extends AdminOperations,
  Operation extends keyof Operations,
  Client extends GraphQLClient<Operations> = GraphQLClient<Operations>,
> (
  client: Client,
  query: Operation,
  options?: GraphQLQueryOptions<Operation, Operations>
) {
  const defaultOptions: GraphQLQueryOptions<Operation, Operations> = {
    headers: {
      ...options?.headers,
      'X-GraphQL-Cost-Include-Fields': true,
    },
  }

  // TODO: Add rate limiting stuff like the metadata worker project
  try {
    const response = await client(query, Object.assign({}, defaultOptions, options))

    return await response.json()
  } catch (e: any) {
    if (e instanceof GraphqlQueryError) {
      const body = e.body as ErrorBodyResponse

      if (body.errors.message?.includes(`Review 'graphQLErrors' for details.`)) {
        invariant(body?.errors?.graphQLErrors, 'Expected graphQLErrors to be present')

        for (const graphQLError of body.errors.graphQLErrors) {
          throw new Error(graphQLError.message)
        }
      }
    }

    throw new Error(e.message)
  }
}

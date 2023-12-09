import type { RequestDocument, RequestOptions, Variables } from 'graphql-request'
import type { GraphQLClientRequestHeaders, JsonSerializer } from 'graphql-request/src/types'
import { resolveRequestDocument } from 'graphql-request'
import type { GraphqlQueryFunction } from '@shopify/shopify-app-remix/build/ts/server/clients/admin/graphql'

export async function makeGraphQLRequest<T, V extends Variables = Variables> (
  graphql: GraphqlQueryFunction,
  options: RequestOptions<V, T>,
): Promise<T> {
  const { variables, requestHeaders } = options
  const requestOptions = parseRequestArgs(options, variables, requestHeaders)
  const { query } = resolveRequestDocument(requestOptions.document)

  return makeRequest<T>(graphql, query, requestOptions.variables)
    .then(({ data }) => data)
}

async function makeRequest<T = unknown, V extends Variables = Variables> (
  graphql: GraphqlQueryFunction,
  query: string,
  variables?: V,
): Promise<{ status: number, data: T }> {
  const response = await graphql(query, { variables })
  const result = await getResult(response)

  const successfullyReceivedData = Array.isArray(result)
    ? !result.some(({ data }) => !data)
    : Boolean(result.data)

  if (response.ok && successfullyReceivedData) {
    return {
      // @ts-expect-error TODO
      data: result.data,
      // @ts-expect-error TODO
      headers: response.headers,
      status: response.status,
    }
  }

  throw new Error(`There was an error with your GraphQL request: ${JSON.stringify(result)}`)
}

function parseRequestArgs<V extends Variables = Variables> (
  documentOrOptions: RequestDocument | RequestOptions<V>,
  variables?: V,
  requestHeaders?: GraphQLClientRequestHeaders,
): RequestOptions<V> {
  return (
    documentOrOptions as RequestOptions<V>
  ).document
    ? (
      documentOrOptions as RequestOptions<V>
    )
    : (
      {
        document: documentOrOptions as RequestDocument,
        variables: variables,
        requestHeaders: requestHeaders,
        signal: undefined,
      } as unknown as RequestOptions<V>
    )
}

async function getResult (response: Response, jsonSerializer: JsonSerializer = JSON): Promise<
  | { data: object; errors: undefined }[]
  | { data: object; errors: undefined }
  | { data: undefined; errors: object }
  | { data: undefined; errors: object[] }
> {
  let contentType: string | undefined

  response.headers.forEach((value, key) => {
    if (key.toLowerCase() === 'content-type') {
      contentType = value.toLowerCase()
    }
  })

  if (
    contentType &&
    (
      contentType.toLowerCase().startsWith(`application/json`) ||
      contentType.toLowerCase().startsWith(`application/graphql+json`) ||
      contentType.toLowerCase().startsWith(`application/graphql-response+json`)
    )
  ) {
    return jsonSerializer.parse(await response.text()) as any
  } else {
    return await response.text() as any
  }
}

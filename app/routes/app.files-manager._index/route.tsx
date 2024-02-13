import type { LoaderFunctionArgs } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { getContext } from '~/utils/context.server'
import { FileSortKeys } from '~/types/admin.types'
import { makeRequest } from '~/utils/graphql.server'
import { invariant } from '@epic-web/invariant'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  if (request.method !== 'GET') return json({ error: 'Method not allowed' }, { status: 405 })

  const { shopify } = getContext()

  const url = new URL(request.url)
  const query = url.searchParams.get('query') || 'status:ready media_type:Image'
  const sortKey = url.searchParams.get('sortKey') as FileSortKeys | null || FileSortKeys.Id
  const reverse = url.searchParams.get('reverse') === 'true'

  const { admin } = await shopify.authenticate.admin(request)
  const data = await makeRequest(admin.graphql, `#graphql
    fragment MediaImageFragment on MediaImage {
      id
      image {
        id
        altText
        thumbnail: url(transform: {maxWidth: 150})
        preview: url(transform: {maxWidth: 430})
        url
        width
        height
        __typename
      }
      __typename
    }

    query Files($first: Int, $last: Int, $after: String, $before: String, $sortKey: FileSortKeys, $reverse: Boolean, $query: String, $savedSearchId: ID = null) {
      files(
        first: $first
        last: $last
        after: $after
        before: $before
        sortKey: $sortKey
        reverse: $reverse
        query: $query
        savedSearchId: $savedSearchId
      ) {
        nodes {
          createdAt
          alt
          __typename
          ... on Node {
            id
            __typename
          }
          ... on GenericFile {
            id
            originalFileSize
            url
            __typename
          }
          ...MediaImageFragment
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
      }
    }
  `, {
    variables: {
      after: null,
      before: null,
      first: 50,
      last: null,
      query,
      reverse,
      sortKey,
    }
  })

  invariant(data.data, 'No data returned from Shopify')

  return json({ files: data.data.files })
}

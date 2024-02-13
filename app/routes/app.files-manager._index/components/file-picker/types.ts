import type { ExtractSuccessResponseType, ResolvedReturnType } from '~/types'
import type { loader as filesManagerLoader } from '~/routes/app.files-manager._index/route'

export type FilesManagerLoaderResponse = ExtractSuccessResponseType<ResolvedReturnType<typeof filesManagerLoader>>
type Files = FilesManagerLoaderResponse['files']['nodes']
export type ImageFile = Extract<Files[number], { __typename: 'MediaImage' }>

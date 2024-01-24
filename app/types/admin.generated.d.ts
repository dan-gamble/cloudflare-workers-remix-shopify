/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import * as AdminTypes from './admin.types.d.ts';

export type MetafieldsSetMutationVariables = AdminTypes.Exact<{
  metafields: Array<AdminTypes.MetafieldsSetInput> | AdminTypes.MetafieldsSetInput;
}>;


export type MetafieldsSetMutation = { metafieldsSet?: AdminTypes.Maybe<{ metafields?: AdminTypes.Maybe<Array<Pick<AdminTypes.Metafield, 'id' | 'value'>>>, userErrors: Array<Pick<AdminTypes.MetafieldsSetUserError, 'field' | 'message'>> }> };

export type AppIdQueryVariables = AdminTypes.Exact<{ [key: string]: never; }>;


export type AppIdQuery = { app?: AdminTypes.Maybe<Pick<AdminTypes.App, 'id'>> };

export type ShopLocalisationQueryVariables = AdminTypes.Exact<{ [key: string]: never; }>;


export type ShopLocalisationQuery = { shop: Pick<AdminTypes.Shop, 'currencyCode'> };

export type ShopMetafieldQueryVariables = AdminTypes.Exact<{
  namespace: AdminTypes.Scalars['String']['input'];
  key: AdminTypes.Scalars['String']['input'];
}>;


export type ShopMetafieldQuery = { shop: (
    Pick<AdminTypes.Shop, 'id'>
    & { metafield?: AdminTypes.Maybe<Pick<AdminTypes.Metafield, 'id' | 'namespace' | 'key' | 'value' | 'type'>> }
  ) };

export type PopulateProductMutationVariables = AdminTypes.Exact<{
  input: AdminTypes.ProductInput;
}>;


export type PopulateProductMutation = { productCreate?: AdminTypes.Maybe<{ product?: AdminTypes.Maybe<(
      Pick<AdminTypes.Product, 'id' | 'title' | 'handle' | 'status'>
      & { variants: { edges: Array<{ node: Pick<AdminTypes.ProductVariant, 'id' | 'price' | 'barcode' | 'createdAt'> }> } }
    )> }> };

interface GeneratedQueryTypes {
  "\n  query appId {\n    app {\n      id\n    }\n  }\n": {return: AppIdQuery, variables: AppIdQueryVariables},
  "\n  query shopLocalisation {\n    shop {\n      currencyCode\n    }\n  }\n": {return: ShopLocalisationQuery, variables: ShopLocalisationQueryVariables},
  "\n  query shopMetafield ($namespace: String!, $key: String!) {\n    shop {\n      id\n      metafield(namespace: $namespace, key: $key) {\n        id\n        namespace\n        key\n        value\n        type\n      }\n    }\n  }\n": {return: ShopMetafieldQuery, variables: ShopMetafieldQueryVariables},
}

interface GeneratedMutationTypes {
  "\n  mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {\n    metafieldsSet(metafields: $metafields) {\n      metafields {\n        id\n        value\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n": {return: MetafieldsSetMutation, variables: MetafieldsSetMutationVariables},
  "#graphql\n    mutation populateProduct($input: ProductInput!) {\n      productCreate(input: $input) {\n        product {\n          id\n          title\n          handle\n          status\n          variants(first: 10) {\n            edges {\n              node {\n                id\n                price\n                barcode\n                createdAt\n              }\n            }\n          }\n        }\n      }\n    }": {return: PopulateProductMutation, variables: PopulateProductMutationVariables},
}
declare module '@shopify/admin-api-client' {
  type InputMaybe<T> = AdminTypes.InputMaybe<T>;
  interface AdminQueries extends GeneratedQueryTypes {}
  interface AdminMutations extends GeneratedMutationTypes {}
}

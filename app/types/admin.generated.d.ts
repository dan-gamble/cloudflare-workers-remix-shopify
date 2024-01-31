/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import * as AdminTypes from './admin.types.d.ts';

export type PopulateProductMutationVariables = AdminTypes.Exact<{
  input: AdminTypes.ProductInput;
}>;


export type PopulateProductMutation = { productCreate?: AdminTypes.Maybe<{ product?: AdminTypes.Maybe<(
      Pick<AdminTypes.Product, 'id' | 'title' | 'handle' | 'status'>
      & { variants: { edges: Array<{ node: Pick<AdminTypes.ProductVariant, 'id' | 'price' | 'barcode' | 'createdAt'> }> } }
    )> }> };

export type ShopLocalisationQueryVariables = AdminTypes.Exact<{ [key: string]: never; }>;


export type ShopLocalisationQuery = { shop: Pick<AdminTypes.Shop, 'currencyCode'> };

export type AppIdQueryVariables = AdminTypes.Exact<{ [key: string]: never; }>;


export type AppIdQuery = { app?: AdminTypes.Maybe<Pick<AdminTypes.App, 'id'>> };

interface GeneratedQueryTypes {
  "#graphql\n    query shopLocalisation {\n      shop {\n        currencyCode\n      }\n    }\n  ": {return: ShopLocalisationQuery, variables: ShopLocalisationQueryVariables},
  "#graphql\n    query appId {\n      app {\n        id\n      }\n    }\n  ": {return: AppIdQuery, variables: AppIdQueryVariables},
}

interface GeneratedMutationTypes {
  "#graphql\n    mutation populateProduct($input: ProductInput!) {\n      productCreate(input: $input) {\n        product {\n          id\n          title\n          handle\n          status\n          variants(first: 10) {\n            edges {\n              node {\n                id\n                price\n                barcode\n                createdAt\n              }\n            }\n          }\n        }\n      }\n    }": {return: PopulateProductMutation, variables: PopulateProductMutationVariables},
}
declare module '@shopify/admin-api-client' {
  type InputMaybe<T> = AdminTypes.InputMaybe<T>;
  interface AdminQueries extends GeneratedQueryTypes {}
  interface AdminMutations extends GeneratedMutationTypes {}
}

import type { CodegenConfig } from '@graphql-codegen/cli'
import { LATEST_API_VERSION } from '@shopify/shopify-api'

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    [`https://shopify.dev/admin-graphql-direct-proxy/${LATEST_API_VERSION}`]: {
      headers: {}
    }
  },
  generates: {
    'app/generated/graphql.ts': {
      documents: ['app/graphql/**/*.{ts,tsx}', 'app/routes/**/*.{ts,tsx}'],
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      watchPattern: [
        'app/graphql/**/!(*.d).{js,jsx,ts,tsx}',
        'app/routes/**/!(*.d).{js,jsx,ts,tsx}'
      ]
    }
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
  watch: true
}

export default config

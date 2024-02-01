import fs from 'fs'

import { LATEST_API_VERSION } from '@shopify/shopify-api'
import { shopifyApiProject, ApiType } from '@shopify/api-codegen-preset'
import type { IGraphQLConfig } from 'graphql-config'

const outputDir = './app/types'
const defaultConfig = shopifyApiProject({
  apiType: ApiType.Admin,
  apiVersion: LATEST_API_VERSION,
  documents: ['./app/**/*.{js,ts,jsx,tsx}'],
  outputDir: outputDir,
})

defaultConfig.extensions.codegen.generates[`${outputDir}/admin.types.ts`] =
  defaultConfig.extensions.codegen.generates[`${outputDir}/admin.types.d.ts`]
delete defaultConfig.extensions.codegen.generates[
  `${outputDir}/admin.types.d.ts`
]

function getConfig() {
  const config: IGraphQLConfig = {
    projects: {
      default: defaultConfig,
    },
  }

  let extensions: string[] = []
  try {
    extensions = fs.readdirSync('./extensions')
  } catch {
    // ignore if no extensions
  }

  for (const entry of extensions) {
    const extensionPath = `./extensions/${entry}`
    const schema = `${extensionPath}/schema.graphql`
    if (!fs.existsSync(schema)) {
      continue
    }
    config.projects[entry] = {
      schema,
      documents: [`${extensionPath}/**/*.graphql`],
    }
  }

  // @ts-ignore
  config.ignoreNoDocuments = true

  return config
}

module.exports = getConfig()

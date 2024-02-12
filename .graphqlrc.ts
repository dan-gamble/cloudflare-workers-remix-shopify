import fs from 'fs'

import { shopifyApiProject, ApiType } from '@shopify/api-codegen-preset'
import type { IGraphQLConfig } from 'graphql-config'

const outputDir = './app/types'
const defaultConfig = shopifyApiProject({
  apiType: ApiType.Admin,
  apiVersion: "2024-04",
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

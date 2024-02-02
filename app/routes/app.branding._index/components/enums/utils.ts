import { sentenceCaseString } from '~/utils'

export function enumValuesToOptions (enumValues: Array<{ name: string }>) {
  return enumValues.map(option => {
    return {
      label: sentenceCaseString(option.name),
      value: option.name,
    }
  })
}

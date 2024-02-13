import type { FieldValues } from 'react-hook-form/dist/types'
import type { FieldNamesMarkedBoolean } from 'react-hook-form/dist/types/form'

export function removeCleanFields<TFieldValues extends FieldValues = FieldValues> (
  values: TFieldValues,
  dirtyFields: Partial<Readonly<FieldNamesMarkedBoolean<TFieldValues>>>,
) {
  for (const valuesKey in values) {
    if (typeof dirtyFields[valuesKey] === 'object') {
      // @ts-ignore
      removeCleanFields(values[valuesKey], dirtyFields[valuesKey])
    } else if (!dirtyFields[valuesKey]) {
      delete values[valuesKey]
    }
  }

  return values
}

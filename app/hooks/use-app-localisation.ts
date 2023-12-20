import { useOutletContext } from '@remix-run/react'
import type { AppContext } from '~/types'

export function useAppLocalisation () {
  return useOutletContext<AppContext>()
}

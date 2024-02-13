import { useSearchParams } from '@remix-run/react'
import { useEffect } from 'react'
import type { SetURLSearchParams } from 'react-router-dom'

export function useShopifySearchParams () {
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    shopify.loading(false)
  }, [searchParams])

  function set (...args: Parameters<SetURLSearchParams>) {
    shopify.loading(true)

    return setSearchParams(...args)
  }

  return [searchParams, set] as const
}

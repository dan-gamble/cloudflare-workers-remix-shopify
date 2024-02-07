import { FileSortKeys } from '~/types/admin.types'
import { useFetcher } from '@remix-run/react'
import { useEffect, useState } from 'react'
import type { FilesManagerLoaderResponse, ImageFile } from '~/routes/app.files-manager._index/components/file-picker/types'

interface FileManagerProps {
  query?: string
  sortKey?: FileSortKeys
  reverse?: boolean
}

export function useFileManager ({ query = '', sortKey = FileSortKeys.Id, reverse = false }: FileManagerProps) {
  const fetcher = useFetcher<FilesManagerLoaderResponse>()

  const [modalOpen, setModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [files, setFiles] = useState<ImageFile[]>([])

  const loading = fetcher.state === 'loading' || fetcher.state === 'submitting' && !fetcher.data

  useEffect(() => {
    if (mounted) return

    if (modalOpen) {
      fetcher.submit(
        { query, sortKey, reverse },
        { method: 'GET', action: '/app/files-manager?index' },
      )

      setMounted(true)
    }
  }, [modalOpen, mounted])

  useEffect(() => {
    if (!modalOpen) return

    fetcher.submit(
      { query, sortKey, reverse },
      { method: 'GET', action: '/app/files-manager?index' },
    )
  }, [query, sortKey, reverse])

  useEffect(() => {
    if (typeof fetcher.data === 'undefined') {
      return
    }

    setFiles(fetcher.data.files.nodes.filter(file => file.__typename === 'MediaImage') as ImageFile[])
  }, [fetcher.data])

  return {
    files,
    loading,
    modalOpen,
    setModalOpen,
  }
}

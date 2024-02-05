import type { PropsWithChildren } from 'react'

type FlexItemProps = PropsWithChildren & {
  fill?: boolean
}

export function FlexItem ({ fill = false, ...props }: FlexItemProps) {
  return (
    <div style={{ minWidth: 0, flex: fill ? '1 1 auto' : '0 0 auto' }}>
      {props.children}
    </div>
  )
}

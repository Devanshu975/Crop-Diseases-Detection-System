import type { ReactNode } from 'react'
import type { BadgeTone } from '@/lib/types'

export function StatusBadge({
  children,
  tone = 'green',
}: {
  children: ReactNode
  tone?: BadgeTone
}) {
  return <span className={`badge badge-${tone}`}>{children}</span>
}

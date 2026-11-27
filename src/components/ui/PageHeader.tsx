import type { ReactNode } from 'react'

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle?: string
  action?: ReactNode
}) {
  return (
    <header className="mb-8 flex items-end justify-between gap-4 border-b border-line pb-5">
      <div>
        {subtitle && <p className="label-caps mb-1">{subtitle}</p>}
        <h1 className="text-3xl md:text-4xl">{title}</h1>
      </div>
      {action}
    </header>
  )
}

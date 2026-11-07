import type { ReactNode } from "react"

import { cn } from "@/lib/utils"
import { Breadcrumbs, type Crumb } from "@/components/shared/breadcrumbs"

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: Crumb[]
  actions?: ReactNode
  className?: string
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "relative overflow-hidden border-b border-border/70 bg-secondary/40",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 size-72 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="container relative mx-auto flex flex-col gap-4 px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs items={breadcrumbs} />
        )}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-semibold text-balance text-foreground sm:text-4xl">
              {title}
            </h1>
            {description && (
              <p className="mt-3 text-base text-pretty text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
        </div>
      </div>
    </header>
  )
}

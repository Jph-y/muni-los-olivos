import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface SectionProps {
  children: ReactNode
  className?: string
  containerClassName?: string
  id?: string
}

export function Section({
  children,
  className,
  containerClassName,
  id,
}: SectionProps) {
  return (
    <section id={id} className={cn("py-12 sm:py-16", className)}>
      <div
        className={cn(
          "container mx-auto px-4 sm:px-6 lg:px-8",
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  )
}

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className="max-w-2xl">
        {eyebrow && (
          <span className="mb-2 inline-flex items-center rounded-full bg-accent/70 px-3 py-1 text-xs font-semibold tracking-wide text-accent-foreground uppercase">
            {eyebrow}
          </span>
        )}
        <h2 className="text-2xl font-semibold text-balance sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-pretty text-muted-foreground">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

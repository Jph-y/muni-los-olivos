import type { ComponentType } from "react"
import { Link } from "react-router"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

export interface Crumb {
  label: string
  to?: string
  icon?: ComponentType<{ className?: string }>
}

interface BreadcrumbsProps {
  items: Crumb[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Ruta de navegación" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
        <li>
          <Link
            to="/"
            className="rounded-sm underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            Inicio
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const Icon = item.icon
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              <ChevronRight className="size-3.5 shrink-0 opacity-60" aria-hidden="true" />
              {isLast || !item.to ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn(
                    "inline-flex items-center gap-1.5",
                    isLast && "font-medium text-foreground"
                  )}
                >
                  {Icon && <Icon className="size-3.5" />}
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className="inline-flex items-center gap-1.5 rounded-sm underline-offset-4 transition-colors hover:text-primary hover:underline"
                >
                  {Icon && <Icon className="size-3.5" />}
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

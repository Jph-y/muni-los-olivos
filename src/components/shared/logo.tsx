import { Link } from "react-router"

import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  compact?: boolean
}

export function Logo({ className, compact = false }: LogoProps) {
  return (
    <Link
      to="/"
      className={cn(
        "group flex items-center gap-3 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
      aria-label="Ir al inicio del portal de la Municipalidad de Los Olivos"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <svg
          viewBox="0 0 64 64"
          className="size-7"
          aria-hidden="true"
          fill="none"
        >
          <path
            d="M32 50V26"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M32 34c-8-1-13-6-14-13 8 0 13 5 14 13Z"
            fill="currentColor"
            opacity="0.85"
          />
          <path
            d="M32 29c7-1 12-6 13-12-7 0-12 5-13 12Z"
            fill="currentColor"
          />
          <path
            d="M23 49h18"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="32" cy="17" r="2.5" fill="currentColor" />
        </svg>
      </span>
      {!compact && (
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="font-heading text-base font-semibold text-foreground sm:text-lg">
            Municipalidad de Los Olivos
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            Portal institucional
          </span>
        </span>
      )}
    </Link>
  )
}

import { useState } from "react"
import { Leaf } from "lucide-react"

import { cn } from "@/lib/utils"

interface SmartImageProps {
  src: string
  alt: string
  className?: string
  imgClassName?: string
}

export function SmartImage({
  src,
  alt,
  className,
  imgClassName,
}: SmartImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-primary/25 via-secondary to-accent/50 text-primary/70",
          className
        )}
      >
        <Leaf className="size-10" aria-hidden="true" />
      </div>
    )
  }

  return (
    <div className={cn("overflow-hidden bg-secondary", className)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className={cn("size-full object-cover", imgClassName)}
      />
    </div>
  )
}

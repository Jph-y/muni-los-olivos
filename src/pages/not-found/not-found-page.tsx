import { Link } from "react-router"
import { Home, Search } from "lucide-react"

import { useDocumentMeta } from "@/lib/seo"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function NotFoundPage() {
  useDocumentMeta({
    title: "Página no encontrada",
    description: "La página que buscas no existe o fue movida.",
  })

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
      <p className="font-heading text-7xl font-semibold text-primary sm:text-8xl">
        404
      </p>
      <h1 className="mt-4 font-heading text-2xl font-semibold sm:text-3xl">
        Página no encontrada
      </h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        La página que buscas no existe, fue movida o ya no está disponible.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className={cn(buttonVariants(), "gap-2")}>
          <Home className="size-4" /> Volver al inicio
        </Link>
        <Link
          to="/buscar"
          className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
        >
          <Search className="size-4" /> Buscar en el portal
        </Link>
      </div>
    </div>
  )
}

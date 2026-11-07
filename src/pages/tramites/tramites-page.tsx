import { useMemo, useState } from "react"
import { Link } from "react-router"
import { ArrowRight, Clock, FileText, Search, Wallet } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { Section } from "@/components/shared/section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { categoriasTramites, tramites } from "@/data/tramites"
import { useDocumentMeta } from "@/lib/seo"
import { cn } from "@/lib/utils"

export function TramitesPage() {
  const [query, setQuery] = useState("")
  const [categoria, setCategoria] = useState("Todas")

  useDocumentMeta({
    title: "Trámites y servicios",
    description:
      "Listado de trámites y servicios de la Municipalidad Distrital de Los Olivos con requisitos, costos y plazos.",
  })

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    return tramites.filter((tramite) => {
      const matchesCategory =
        categoria === "Todas" || tramite.categoria === categoria
      const matchesTerm =
        !term ||
        `${tramite.titulo} ${tramite.resumen} ${tramite.categoria}`
          .toLowerCase()
          .includes(term)
      return matchesCategory && matchesTerm
    })
  }, [query, categoria])

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Trámites y servicios"
        description="Encuentra requisitos, costos, plazos y canales para realizar tus trámites municipales."
        breadcrumbs={[{ label: "Trámites y servicios" }]}
      />

      <Section>
        <div className="mb-6 flex flex-col gap-4">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar trámite o servicio..."
              aria-label="Buscar trámites y servicios"
              className="h-10 pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categoriasTramites.map((item) => (
              <Button
                key={item}
                type="button"
                size="sm"
                variant={categoria === item ? "default" : "outline"}
                onClick={() => setCategoria(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>

        <p className="mb-6 text-sm text-muted-foreground">
          {filtered.length} trámite(s) encontrado(s)
        </p>

        {filtered.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FileText />
              </EmptyMedia>
              <EmptyTitle>No se encontraron trámites</EmptyTitle>
              <EmptyDescription>
                Prueba con otra palabra clave o cambia la categoría.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((tramite) => (
              <Link
                key={tramite.id}
                to={`/tramites/${tramite.slug}`}
                className="group flex flex-col gap-3 rounded-xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="secondary">{tramite.categoria}</Badge>
                  <Badge
                    variant="outline"
                    className={cn(
                      tramite.modalidad === "Virtual" &&
                        "border-primary/30 text-primary"
                    )}
                  >
                    {tramite.modalidad}
                  </Badge>
                </div>
                <h2 className="font-heading text-lg leading-snug text-balance group-hover:text-primary">
                  {tramite.titulo}
                </h2>
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {tramite.resumen}
                </p>
                <div className="mt-auto flex flex-col gap-1.5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Wallet className="size-3.5" /> {tramite.costo}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5" /> {tramite.plazo}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Ver detalle <ArrowRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </div>
  )
}

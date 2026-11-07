import { useMemo, useState } from "react"
import { Link } from "react-router"
import { ArrowRight, Calendar, Newspaper, Search } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { Section } from "@/components/shared/section"
import { SmartImage } from "@/components/shared/smart-image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { noticias } from "@/data/noticias"
import { formatDate } from "@/lib/format"
import { useDocumentMeta } from "@/lib/seo"

export function NoticiasPage() {
  const [query, setQuery] = useState("")
  const [categoria, setCategoria] = useState("Todas")

  useDocumentMeta({
    title: "Noticias",
    description:
      "Últimas noticias y novedades de la Municipalidad Distrital de Los Olivos.",
  })

  const categorias = useMemo(
    () => ["Todas", ...Array.from(new Set(noticias.map((n) => n.categoria)))],
    []
  )

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    return noticias.filter((noticia) => {
      const matchesCategory =
        categoria === "Todas" || noticia.categoria === categoria
      const matchesTerm =
        !term ||
        `${noticia.titulo} ${noticia.resumen} ${noticia.categoria}`
          .toLowerCase()
          .includes(term)
      return matchesCategory && matchesTerm
    })
  }, [query, categoria])

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Noticias"
        description="Conoce las acciones, obras y actividades de la gestión municipal."
        breadcrumbs={[{ label: "Noticias" }]}
      />

      <Section>
        <div className="mb-6 flex flex-col gap-4">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar noticias..."
              aria-label="Buscar noticias"
              className="h-10 pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categorias.map((item) => (
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

        {filtered.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Newspaper />
              </EmptyMedia>
              <EmptyTitle>No se encontraron noticias</EmptyTitle>
              <EmptyDescription>
                Prueba con otra palabra clave o categoría.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((noticia) => (
              <Link
                key={noticia.id}
                to={`/noticias/${noticia.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <SmartImage
                  src={noticia.imagen}
                  alt={noticia.titulo}
                  className="aspect-[16/9] w-full"
                  imgClassName="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary">{noticia.categoria}</Badge>
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3.5" />
                      {formatDate(noticia.fecha)}
                    </span>
                  </div>
                  <h2 className="font-heading text-lg leading-snug text-balance group-hover:text-primary">
                    {noticia.titulo}
                  </h2>
                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {noticia.resumen}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-primary">
                    Leer más <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </div>
  )
}

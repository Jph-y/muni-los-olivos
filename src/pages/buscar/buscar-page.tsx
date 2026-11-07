import { useMemo, useState } from "react"
import { Link, useSearchParams } from "react-router"
import { FileText, Newspaper, Search as SearchIcon, Users } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { Section } from "@/components/shared/section"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { campanas } from "@/data/campanas"
import { funcionarios } from "@/data/funcionarios"
import { informes } from "@/data/informes"
import { normas } from "@/data/normas"
import { noticias } from "@/data/noticias"
import { tramites } from "@/data/tramites"
import { useDocumentMeta } from "@/lib/seo"

interface Resultado {
  id: string
  titulo: string
  descripcion: string
  tipo: string
  to: string
}

export function BuscarPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get("q") ?? ""
  const [term, setTerm] = useState(query)

  useDocumentMeta({
    title: query ? `Resultados para "${query}"` : "Buscar",
    description: "Busca trámites, noticias, normas y funcionarios del portal municipal.",
  })

  const results = useMemo<Resultado[]>(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []

    const items: Resultado[] = [
      ...tramites.map((item) => ({
        id: `tramite-${item.id}`,
        titulo: item.titulo,
        descripcion: item.resumen,
        tipo: "Trámite",
        to: `/tramites/${item.slug}`,
      })),
      ...noticias.map((item) => ({
        id: `noticia-${item.id}`,
        titulo: item.titulo,
        descripcion: item.resumen,
        tipo: "Noticia",
        to: `/noticias/${item.slug}`,
      })),
      ...campanas.map((item) => ({
        id: `campana-${item.id}`,
        titulo: item.titulo,
        descripcion: item.descripcion,
        tipo: "Campaña",
        to: `/campanas/${item.slug}`,
      })),
      ...normas.map((item) => ({
        id: `norma-${item.id}`,
        titulo: item.titulo,
        descripcion: item.resumen,
        tipo: item.tipo,
        to: "/normas",
      })),
      ...informes.map((item) => ({
        id: `informe-${item.id}`,
        titulo: item.titulo,
        descripcion: item.descripcion,
        tipo: item.tipo,
        to: "/informes",
      })),
      ...funcionarios.map((item) => ({
        id: `funcionario-${item.id}`,
        titulo: item.nombre,
        descripcion: `${item.cargo} · ${item.area}`,
        tipo: "Funcionario",
        to: `/funcionarios/${item.slug}`,
      })),
    ]

    return items.filter((item) =>
      `${item.titulo} ${item.descripcion} ${item.tipo}`
        .toLowerCase()
        .includes(q)
    )
  }, [query])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = term.trim()
    setSearchParams(value ? { q: value } : {})
  }

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Buscar en el portal"
        description="Encuentra trámites, noticias, normas, funcionarios y más."
        breadcrumbs={[{ label: "Buscar" }]}
      />

      <Section>
        <form onSubmit={handleSubmit} className="flex w-full max-w-xl gap-2">
          <div className="relative flex-1">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="¿Qué estás buscando?"
              aria-label="Buscar en el portal"
              className="h-10 pl-9"
            />
          </div>
          <Button type="submit" className="h-10">
            Buscar
          </Button>
        </form>

        {query ? (
          <div className="mt-8">
            <p className="mb-4 text-sm text-muted-foreground">
              {results.length} resultado(s) para{" "}
              <span className="font-medium text-foreground">"{query}"</span>
            </p>

            {results.length === 0 ? (
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <SearchIcon />
                  </EmptyMedia>
                  <EmptyTitle>Sin resultados</EmptyTitle>
                  <EmptyDescription>
                    Intenta con otras palabras o navega por el menú principal.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              <ul className="flex flex-col gap-3">
                {results.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={item.to}
                      className="flex flex-col gap-1 rounded-xl border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-secondary/40 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                    >
                      <span className="text-xs font-medium text-primary">
                        {item.tipo}
                      </span>
                      <span className="font-heading text-base font-semibold">
                        {item.titulo}
                      </span>
                      <span className="line-clamp-2 text-sm text-muted-foreground">
                        {item.descripcion}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { icon: FileText, label: "Trámites y servicios", to: "/tramites" },
              { icon: Newspaper, label: "Noticias", to: "/noticias" },
              { icon: Users, label: "Funcionarios", to: "/funcionarios" },
            ].map((suggestion) => {
              const Icon = suggestion.icon
              return (
                <Link
                  key={suggestion.to}
                  to={suggestion.to}
                  className="flex items-center gap-3 rounded-xl border bg-card p-4 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-secondary/40"
                >
                  <Icon className="size-5 text-primary" />
                  {suggestion.label}
                </Link>
              )
            })}
          </div>
        )}
      </Section>
    </div>
  )
}

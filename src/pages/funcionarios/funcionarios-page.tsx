import { useMemo, useState } from "react"
import { Link } from "react-router"
import { ArrowRight, Search, UserRound } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { Section } from "@/components/shared/section"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { funcionarios } from "@/data/funcionarios"
import { getInitials } from "@/lib/format"
import { useDocumentMeta } from "@/lib/seo"

export function FuncionariosPage() {
  const [query, setQuery] = useState("")

  useDocumentMeta({
    title: "Directorio de funcionarios",
    description:
      "Directorio de autoridades, regidores y funcionarios de la Municipalidad Distrital de Los Olivos.",
  })

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return funcionarios
    return funcionarios.filter((funcionario) =>
      `${funcionario.nombre} ${funcionario.cargo} ${funcionario.area}`
        .toLowerCase()
        .includes(term)
    )
  }, [query])

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Directorio de funcionarios"
        description="Conoce a las autoridades, regidores y funcionarios de la municipalidad."
        breadcrumbs={[
          { label: "Municipalidad" },
          { label: "Directorio de funcionarios" },
        ]}
      />

      <Section>
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nombre, cargo o área..."
              aria-label="Buscar funcionarios"
              className="h-10 pl-9"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {filtered.length} de {funcionarios.length} resultados
          </p>
        </div>

        {filtered.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <UserRound />
              </EmptyMedia>
              <EmptyTitle>No se encontraron funcionarios</EmptyTitle>
              <EmptyDescription>
                Prueba con otro nombre, cargo o área.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((funcionario) => (
              <Link
                key={funcionario.id}
                to={`/funcionarios/${funcionario.slug}`}
                className="group flex items-start gap-4 rounded-xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <Avatar className="size-14 shrink-0">
                  <AvatarFallback className="bg-primary text-base font-semibold text-primary-foreground">
                    {getInitials(funcionario.nombre)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 flex-col gap-1">
                  <h3 className="font-semibold leading-snug group-hover:text-primary">
                    {funcionario.nombre}
                  </h3>
                  <Badge variant="secondary" className="w-fit">
                    {funcionario.cargo}
                  </Badge>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {funcionario.area}
                  </p>
                  <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Ver perfil <ArrowRight className="size-3.5" />
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

import { useMemo, useState } from "react"
import { FileText, Search } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { Section } from "@/components/shared/section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { informes } from "@/data/informes"
import { formatDate } from "@/lib/format"
import { useDocumentMeta } from "@/lib/seo"

export function InformesPage() {
  const [query, setQuery] = useState("")
  const [tipo, setTipo] = useState("Todos")

  useDocumentMeta({
    title: "Informes y publicaciones",
    description:
      "Formatos, formularios y publicaciones de la Municipalidad Distrital de Los Olivos.",
  })

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    return informes.filter((informe) => {
      const matchesType = tipo === "Todos" || informe.tipo === tipo
      const matchesTerm =
        !term ||
        `${informe.titulo} ${informe.descripcion}`
          .toLowerCase()
          .includes(term)
      return matchesType && matchesTerm
    })
  }, [query, tipo])

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Informes y publicaciones"
        description="Descarga formatos, formularios y documentos de interés para tus trámites."
        breadcrumbs={[{ label: "Normas y documentos" }, { label: "Informes y publicaciones" }]}
      />

      <Section>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar informes y publicaciones..."
              aria-label="Buscar informes"
              className="h-10 pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {["Todos", "Formato", "Formulario"].map((item) => (
              <Button
                key={item}
                type="button"
                size="sm"
                variant={tipo === item ? "default" : "outline"}
                onClick={() => setTipo(item)}
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
                <FileText />
              </EmptyMedia>
              <EmptyTitle>No se encontraron publicaciones</EmptyTitle>
              <EmptyDescription>
                Prueba con otro término o tipo de publicación.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((informe) => (
              <Card key={informe.id} className="transition-colors hover:border-primary/30">
                <CardContent className="flex gap-4 p-5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                    <FileText className="size-5" />
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">{informe.tipo}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(informe.fecha)}
                      </span>
                    </div>
                    <h2 className="font-heading text-base font-semibold leading-snug">
                      {informe.titulo}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {informe.descripcion}
                    </p>
                    {informe.url && (
                      <a
                        href={informe.url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-fit text-sm font-medium text-primary hover:underline"
                      >
                        Descargar
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Section>
    </div>
  )
}

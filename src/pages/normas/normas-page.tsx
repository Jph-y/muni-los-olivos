import { useMemo, useState } from "react"
import { Download, Gavel, Search } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { Section } from "@/components/shared/section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { normas, tiposNorma } from "@/data/normas"
import { formatDate } from "@/lib/format"
import { useDocumentMeta } from "@/lib/seo"

export function NormasPage() {
  const [query, setQuery] = useState("")
  const [tipo, setTipo] = useState<string>("Todas")

  useDocumentMeta({
    title: "Normas y documentos legales",
    description:
      "Ordenanzas, decretos, acuerdos y resoluciones de la Municipalidad Distrital de Los Olivos.",
  })

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    return normas.filter((norma) => {
      const matchesType = tipo === "Todas" || norma.tipo === tipo
      const matchesTerm =
        !term ||
        `${norma.titulo} ${norma.resumen} ${norma.tipo}`
          .toLowerCase()
          .includes(term)
      return matchesType && matchesTerm
    })
  }, [query, tipo])

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Normas y documentos legales"
        description="Consulta las ordenanzas, decretos, acuerdos y resoluciones emitidas por la municipalidad."
        breadcrumbs={[{ label: "Normas y documentos" }]}
      />

      <Section>
        <div className="mb-6 flex flex-col gap-4">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por número, título o resumen..."
              aria-label="Buscar normas y documentos"
              className="h-10 pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {tiposNorma.map((item) => (
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

        <p className="mb-4 text-sm text-muted-foreground">
          {filtered.length} documento(s) encontrado(s)
        </p>

        {filtered.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Gavel />
              </EmptyMedia>
              <EmptyTitle>No se encontraron documentos</EmptyTitle>
              <EmptyDescription>
                Prueba con otro término o tipo de norma.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((norma) => (
              <Card key={norma.id} className="transition-colors hover:border-primary/30">
                <CardContent className="flex flex-col gap-2 p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{norma.tipo}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(norma.fecha)}
                    </span>
                  </div>
                  <h2 className="font-heading text-base font-semibold sm:text-lg">
                    {norma.titulo}
                  </h2>
                  <p className="text-sm text-muted-foreground">{norma.resumen}</p>
                  {norma.url ? (
                    <a
                      href={norma.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-fit items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      <Download className="size-4" /> Descargar documento
                    </a>
                  ) : (
                    <span className="inline-flex w-fit items-center gap-1 text-xs text-muted-foreground">
                      <Download className="size-3.5" /> Documento disponible en
                      mesa de partes
                    </span>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Section>
    </div>
  )
}

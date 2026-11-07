import { Link } from "react-router"
import { ArrowRight, Calendar, Megaphone } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { Section } from "@/components/shared/section"
import { SmartImage } from "@/components/shared/smart-image"
import { Badge } from "@/components/ui/badge"
import { campanas } from "@/data/campanas"
import { formatDate } from "@/lib/format"
import { useDocumentMeta } from "@/lib/seo"

export function CampanasPage() {
  useDocumentMeta({
    title: "Campañas y eventos",
    description:
      "Campañas, beneficios y eventos organizados por la Municipalidad Distrital de Los Olivos.",
  })

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Campañas y eventos"
        description="Conoce las campañas, beneficios tributarios y actividades de la municipalidad."
        breadcrumbs={[{ label: "Campañas y eventos" }]}
      />

      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {campanas.map((campana) => (
            <Link
              key={campana.id}
              to={`/campanas/${campana.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <SmartImage
                src={campana.imagen}
                alt={campana.titulo}
                className="aspect-[16/9] w-full"
                imgClassName="transition-transform duration-500 group-hover:scale-105"
              />
              <div className="flex flex-1 flex-col gap-2 p-5">
                <Badge variant="secondary" className="w-fit gap-1">
                  <Megaphone className="size-3.5" /> Campaña
                </Badge>
                <h2 className="font-heading text-lg leading-snug text-balance group-hover:text-primary">
                  {campana.titulo}
                </h2>
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {campana.descripcion}
                </p>
                <span className="mt-auto flex items-center gap-1 pt-2 text-xs text-muted-foreground">
                  <Calendar className="size-3.5" />
                  {formatDate(campana.fechaInicio)}
                  {campana.fechaFin
                    ? ` - ${formatDate(campana.fechaFin)}`
                    : ""}
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Ver campaña <ArrowRight className="size-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  )
}

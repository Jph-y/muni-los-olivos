import { Link } from "react-router"
import { ArrowRight, Briefcase, Calendar, Wallet } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { Section } from "@/components/shared/section"
import { Badge } from "@/components/ui/badge"
import { convocatorias } from "@/data/convocatorias"
import { formatDate } from "@/lib/format"
import { useDocumentMeta } from "@/lib/seo"

export function ConvocatoriasPage() {
  useDocumentMeta({
    title: "Convocatorias CAS",
    description:
      "Convocatorias de personal CAS vigentes en la Municipalidad Distrital de Los Olivos.",
  })

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Convocatorias CAS"
        description="Consulta las convocatorias de personal vigentes y presenta tu postulación."
        breadcrumbs={[
          { label: "Municipalidad" },
          { label: "Convocatorias CAS" },
        ]}
      />

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          {convocatorias.map((convocatoria) => (
            <Link
              key={convocatoria.id}
              to={`/convocatorias/${convocatoria.id}`}
              className="group flex flex-col gap-3 rounded-xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <div className="flex items-center justify-between gap-2">
                <Badge variant="secondary" className="gap-1">
                  <Briefcase className="size-3.5" /> CAS
                </Badge>
                <Badge
                  variant={convocatoria.estado === "Abierta" ? "default" : "outline"}
                >
                  {convocatoria.estado}
                </Badge>
              </div>
              <h2 className="font-heading text-lg leading-snug text-balance group-hover:text-primary">
                {convocatoria.titulo}
              </h2>
              <p className="text-sm text-muted-foreground">{convocatoria.area}</p>
              <div className="mt-auto flex flex-col gap-1.5 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Wallet className="size-4" /> {convocatoria.remuneracion}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-4" /> Cierre:{" "}
                  {formatDate(convocatoria.fechaFin)}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                Ver convocatoria <ArrowRight className="size-4" />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  )
}

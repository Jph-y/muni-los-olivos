import { Link } from "react-router"
import { ArrowRight, FileText, Landmark, Scale, Users } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { Section, SectionHeading } from "@/components/shared/section"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { institucional } from "@/data/institucional"
import { useDocumentMeta } from "@/lib/seo"
import { cn } from "@/lib/utils"

export function InstitucionalPage() {
  useDocumentMeta({
    title: "Información institucional",
    description:
      "Conoce la misión, visión, visión territorial y organización de la Municipalidad Distrital de Los Olivos.",
  })

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Información institucional"
        description="Conoce nuestra razón de ser, los objetivos de la gestión y la organización municipal."
        breadcrumbs={[
          { label: "Municipalidad" },
          { label: "Información institucional" },
        ]}
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-accent/70 px-3 py-1 text-xs font-semibold tracking-wide text-accent-foreground uppercase">
              <Landmark className="size-3.5" /> ¿Qué hacemos?
            </span>
            <h2 className="text-3xl font-semibold text-balance">
              Servicio a la comunidad olivense
            </h2>
            <p className="text-pretty text-muted-foreground">
              {institucional.queHacemos}
            </p>
            <p className="text-pretty text-muted-foreground">
              Tenemos vocación de servicio social para el bienestar y desarrollo
              del distrito, en base a una gestión transparente en conductas y
              acciones administrativas operativas para nuestra gestión y las
              futuras generaciones.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/funcionarios"
                className={cn(buttonVariants(), "gap-1.5")}
              >
                <Users className="size-4" /> Directorio de funcionarios
              </Link>
              <a
                href={institucional.organigramaUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "outline" }), "gap-1.5")}
              >
                <FileText className="size-4" /> Ver organigrama (PDF)
              </a>
            </div>
          </div>

          <div className="grid gap-4">
            <Card>
              <CardContent className="p-6">
                <span className="mb-3 flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                  <Scale className="size-5" />
                </span>
                <h3 className="mb-2 font-heading text-xl font-semibold">
                  Misión institucional
                </h3>
                <p className="text-sm text-pretty text-muted-foreground">
                  {institucional.mision}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <span className="mb-3 flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                  <Landmark className="size-5" />
                </span>
                <h3 className="mb-2 font-heading text-xl font-semibold">
                  Visión institucional
                </h3>
                <p className="text-sm text-pretty text-muted-foreground">
                  {institucional.vision}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <SectionHeading
          eyebrow="Territorio"
          title="Visión territorial"
          description="El horizonte de desarrollo que orienta la gestión del distrito."
        />
        <Card className="border-primary/20 bg-primary text-primary-foreground">
          <CardContent className="p-8">
            <p className="text-lg text-pretty">{institucional.visionTerritorial}</p>
          </CardContent>
        </Card>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Explora"
          title="Más información institucional"
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Directorio de funcionarios",
              description: "Autoridades y funcionarios de la municipalidad.",
              to: "/funcionarios",
            },
            {
              title: "Sedes municipales",
              description: "Direcciones, horarios y canales de atención.",
              to: "/sedes",
            },
            {
              title: "Transparencia",
              description: "Información pública y rendición de cuentas.",
              to: "/transparencia",
            },
            {
              title: "Normas y documentos",
              description: "Ordenanzas, decretos y resoluciones.",
              to: "/normas",
            },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group flex flex-col gap-2 rounded-xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <h3 className="font-semibold group-hover:text-primary">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              <ArrowRight className="mt-auto size-4 text-primary transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </Section>
    </div>
  )
}

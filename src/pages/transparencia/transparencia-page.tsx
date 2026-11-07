import { Link } from "react-router"
import {
  ExternalLink,
  FileSearch,
  FileText,
  Gavel,
  Landmark,
  Scale,
  ShieldCheck,
} from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { Section, SectionHeading } from "@/components/shared/section"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useDocumentMeta } from "@/lib/seo"
import { cn } from "@/lib/utils"

const transparenciaLinks = [
  {
    title: "Portal de Transparencia Estándar",
    description:
      "Accede a la información pública de la entidad en la plataforma nacional.",
    href: "https://www.transparencia.gob.pe/enlaces/pte_transparencia_enlaces.aspx?id_entidad=10064&id_tema=1&ver=D#.YOTNHbFKiUl",
    icon: Scale,
    external: true,
  },
  {
    title: "Solicitar acceso a la información",
    description:
      "Presenta una solicitud de acceso a la información pública en línea.",
    to: "/acceso-informacion",
    icon: FileSearch,
    external: false,
  },
  {
    title: "Normas y documentos legales",
    description: "Ordenanzas, decretos, acuerdos y resoluciones municipales.",
    to: "/normas",
    icon: Gavel,
    external: false,
  },
  {
    title: "Informes y publicaciones",
    description: "Formatos, formularios y publicaciones de la municipalidad.",
    to: "/informes",
    icon: FileText,
    external: false,
  },
]

export function TransparenciaPage() {
  useDocumentMeta({
    title: "Transparencia",
    description:
      "Información pública, rendición de cuentas y acceso a la información de la Municipalidad Distrital de Los Olivos.",
  })

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Portal de transparencia"
        description="Accede a la información pública y a los mecanismos de rendición de cuentas de la municipalidad."
        breadcrumbs={[
          { label: "Municipalidad" },
          { label: "Transparencia" },
        ]}
      />

      <Section>
        <div className="mb-8 flex items-start gap-4 rounded-xl border bg-primary/5 p-6">
          <ShieldCheck className="mt-1 size-6 shrink-0 text-primary" />
          <div>
            <h2 className="font-heading text-lg font-semibold">
              Gestión transparente
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              La Municipalidad de Los Olivos pone a disposición de la ciudadanía
              la información sobre el uso de los recursos públicos, la gestión
              institucional y los documentos de interés, en cumplimiento de la
              Ley de Transparencia y Acceso a la Información Pública.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {transparenciaLinks.map((link) => {
            const Icon = link.icon
            const content = (
              <Card className="h-full transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                <CardContent className="flex h-full flex-col gap-3 p-6">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="font-heading text-lg font-semibold">
                    {link.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {link.description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary">
                    {link.external ? "Ir al portal" : "Ver más"}
                    {link.external ? (
                      <ExternalLink className="size-4" />
                    ) : (
                      <Landmark className="size-4" />
                    )}
                  </span>
                </CardContent>
              </Card>
            )

            if (link.external) {
              return (
                <a
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  {content}
                </a>
              )
            }

            return (
              <Link
                key={link.title}
                to={link.to ?? "/"}
                className="focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                {content}
              </Link>
            )
          })}
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <SectionHeading
          eyebrow="Enlaces"
          title="Otras plataformas"
          description="Accesos directos a sistemas y plataformas del Estado."
        />
        <div className="flex flex-wrap gap-3">
          <a
            href="https://www.transparencia.gob.pe"
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "gap-1.5")}
          >
            Plataforma de Transparencia <ExternalLink className="size-4" />
          </a>
          <Link
            to="/mesa-de-partes"
            className={cn(buttonVariants({ variant: "outline" }), "gap-1.5")}
          >
            Mesa de partes virtual
          </Link>
          <Link
            to="/normas"
            className={cn(buttonVariants({ variant: "outline" }), "gap-1.5")}
          >
            Normas y documentos
          </Link>
        </div>
      </Section>
    </div>
  )
}

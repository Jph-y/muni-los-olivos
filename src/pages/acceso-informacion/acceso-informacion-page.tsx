import { Link } from "react-router"
import { Clock, FileSearch, Info } from "lucide-react"

import { AccesoInformacionForm } from "@/components/forms/acceso-informacion-form"
import { PageHeader } from "@/components/shared/page-header"
import { Section } from "@/components/shared/section"
import { Card, CardContent } from "@/components/ui/card"
import { useDocumentMeta } from "@/lib/seo"

export function AccesoInformacionPage() {
  useDocumentMeta({
    title: "Acceso a la información pública",
    description:
      "Solicita información pública de la Municipalidad Distrital de Los Olivos en el marco de la Ley N.° 27806.",
  })

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Acceso a la información pública"
        description="Solicita información pública de la municipalidad en el marco de la Ley de Transparencia y Acceso a la Información Pública."
        breadcrumbs={[
          { label: "Servicios" },
          { label: "Acceso a la información pública" },
        ]}
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <AccesoInformacionForm />

          <aside className="flex flex-col gap-4">
            <Card>
              <CardContent className="flex flex-col gap-3 p-6">
                <FileSearch className="size-6 text-primary" />
                <h2 className="font-heading text-lg font-semibold">
                  ¿Qué puedes solicitar?
                </h2>
                <p className="text-sm text-muted-foreground">
                  Puedes solicitar información pública en poder de la
                  municipalidad, como documentos, informes, contratos y datos de
                  gestión, salvo las excepciones previstas por ley.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col gap-3 p-6">
                <Clock className="size-6 text-primary" />
                <h2 className="font-heading text-lg font-semibold">
                  Plazo de respuesta
                </h2>
                <p className="text-sm text-muted-foreground">
                  La municipalidad debe responder tu solicitud en un plazo máximo
                  de 10 días hábiles, prorrogable por 5 días hábiles adicionales.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col gap-3 p-6">
                <Info className="size-6 text-primary" />
                <h2 className="font-heading text-lg font-semibold">
                  Más información
                </h2>
                <Link
                  to="/transparencia"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Portal de transparencia
                </Link>
                <Link
                  to="/normas"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Normas y documentos
                </Link>
                <Link
                  to="/contacto"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Contactar a la municipalidad
                </Link>
              </CardContent>
            </Card>
          </aside>
        </div>
      </Section>
    </div>
  )
}

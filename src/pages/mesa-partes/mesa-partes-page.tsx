import { Link } from "react-router"
import { AlertCircle, CheckCircle2, FileText, Upload } from "lucide-react"

import { MesaPartesForm } from "@/components/forms/mesa-partes-form"
import { PageHeader } from "@/components/shared/page-header"
import { Section } from "@/components/shared/section"
import { Card, CardContent } from "@/components/ui/card"
import { useDocumentMeta } from "@/lib/seo"

const requisitos = [
  "Documento Nacional de Identidad (DNI) vigente.",
  "Documento escaneado en formato PDF (máximo 10 MB).",
  "Correo electrónico activo para notificaciones.",
]

const recomendaciones = [
  "Verifica que el documento sea legible y esté completo.",
  "Indica el área destinataria correcta.",
  "Guarda el código de seguimiento que se genere.",
]

export function MesaPartesPage() {
  useDocumentMeta({
    title: "Mesa de partes virtual",
    description:
      "Presenta documentos y solicitudes en línea a la Municipalidad Distrital de Los Olivos.",
  })

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Mesa de partes virtual"
        description="Presenta tus documentos y solicitudes de manera virtual, sin necesidad de acercarte a la municipalidad."
        breadcrumbs={[{ label: "Servicios" }, { label: "Mesa de partes virtual" }]}
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <MesaPartesForm />

          <aside className="flex flex-col gap-4">
            <Card>
              <CardContent className="flex flex-col gap-3 p-6">
                <Upload className="size-6 text-primary" />
                <h2 className="font-heading text-lg font-semibold">
                  Antes de empezar
                </h2>
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  {requisitos.map((requisito) => (
                    <li key={requisito} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      {requisito}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col gap-3 p-6">
                <AlertCircle className="size-6 text-primary" />
                <h2 className="font-heading text-lg font-semibold">
                  Recomendaciones
                </h2>
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  {recomendaciones.map((recomendacion) => (
                    <li key={recomendacion} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      {recomendacion}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col gap-3 p-6">
                <FileText className="size-6 text-primary" />
                <h2 className="font-heading text-lg font-semibold">
                  Otros servicios
                </h2>
                <Link
                  to="/tramites"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Ver todos los trámites
                </Link>
                <Link
                  to="/libro-reclamaciones"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Libro de reclamaciones
                </Link>
                <Link
                  to="/acceso-informacion"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Acceso a la información pública
                </Link>
              </CardContent>
            </Card>
          </aside>
        </div>
      </Section>
    </div>
  )
}

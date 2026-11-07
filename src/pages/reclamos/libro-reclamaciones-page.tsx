import { Link } from "react-router"
import { Info, Scale, ShieldCheck } from "lucide-react"

import { ReclamoForm } from "@/components/forms/reclamo-form"
import { PageHeader } from "@/components/shared/page-header"
import { Section } from "@/components/shared/section"
import { Card, CardContent } from "@/components/ui/card"
import { useDocumentMeta } from "@/lib/seo"

export function LibroReclamacionesPage() {
  useDocumentMeta({
    title: "Libro de reclamaciones",
    description:
      "Registra tu reclamo o queja sobre los servicios de la Municipalidad Distrital de Los Olivos.",
  })

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Libro de reclamaciones"
        description="Registra tu reclamo o queja sobre los bienes y servicios municipales."
        breadcrumbs={[{ label: "Servicios" }, { label: "Libro de reclamaciones" }]}
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <ReclamoForm />

          <aside className="flex flex-col gap-4">
            <Card>
              <CardContent className="flex flex-col gap-3 p-6">
                <ShieldCheck className="size-6 text-primary" />
                <h2 className="font-heading text-lg font-semibold">
                  Tu reclamo es importante
                </h2>
                <p className="text-sm text-muted-foreground">
                  El Libro de Reclamaciones es un mecanismo obligatorio dispuesto
                  por el Código de Protección y Defensa del Consumidor (Ley N.°
                  29571).
                </p>
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Info className="mt-0.5 size-4 shrink-0 text-primary" />
                    Recibirás un código de seguimiento al registrar tu reclamo.
                  </li>
                  <li className="flex items-start gap-2">
                    <Info className="mt-0.5 size-4 shrink-0 text-primary" />
                    La municipalidad responderá en un plazo máximo de 15 días
                    hábiles.
                  </li>
                  <li className="flex items-start gap-2">
                    <Info className="mt-0.5 size-4 shrink-0 text-primary" />
                    No se aceptan reclamos anónimos.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col gap-3 p-6">
                <Scale className="size-6 text-primary" />
                <h2 className="font-heading text-lg font-semibold">
                  ¿Necesitas otro canal?
                </h2>
                <p className="text-sm text-muted-foreground">
                  También puedes presentar tu reclamo de forma presencial en
                  mesa de partes o consultar otros servicios.
                </p>
                <Link
                  to="/mesa-de-partes"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Ir a mesa de partes virtual
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

import { Link } from "react-router"
import { Clock, Info, ShieldCheck, UserCheck } from "lucide-react"

import { VisitaForm } from "@/components/forms/visita-form"
import { PageHeader } from "@/components/shared/page-header"
import { Section } from "@/components/shared/section"
import { Card, CardContent } from "@/components/ui/card"
import { sedes } from "@/data/sedes"
import { useDocumentMeta } from "@/lib/seo"

export function RegistroVisitasPage() {
  useDocumentMeta({
    title: "Registro de visitas",
    description:
      "Registra tu visita a funcionarios de la Municipalidad Distrital de Los Olivos.",
  })

  const sede = sedes[0]

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Registro de visitas a funcionarios"
        description="Registra tu visita a las instalaciones municipales y coordina la atención con el funcionario correspondiente."
        breadcrumbs={[{ label: "Servicios" }, { label: "Registro de visitas" }]}
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <VisitaForm />

          <aside className="flex flex-col gap-4">
            <Card>
              <CardContent className="flex flex-col gap-3 p-6">
                <UserCheck className="size-6 text-primary" />
                <h2 className="font-heading text-lg font-semibold">
                  ¿Cómo funciona?
                </h2>
                <p className="text-sm text-muted-foreground">
                  Completa el formulario con tus datos, el funcionario a visitar
                  y la fecha y hora de tu visita. El registro permite mantener un
                  control de acceso a las instalaciones municipales.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col gap-3 p-6">
                <Clock className="size-6 text-primary" />
                <h2 className="font-heading text-lg font-semibold">
                  Horario de atención
                </h2>
                <p className="text-sm text-muted-foreground">{sede.horario}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col gap-3 p-6">
                <ShieldCheck className="size-6 text-primary" />
                <h2 className="font-heading text-lg font-semibold">
                  Importante
                </h2>
                <p className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Info className="mt-0.5 size-4 shrink-0 text-primary" />
                  Presenta tu DNI al ingresar a la sede municipal.
                </p>
                <Link
                  to="/funcionarios"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Ver directorio de funcionarios
                </Link>
              </CardContent>
            </Card>
          </aside>
        </div>
      </Section>
    </div>
  )
}

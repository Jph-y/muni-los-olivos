import { Link, useParams } from "react-router"
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  CheckCircle2,
  ListChecks,
  Wallet,
} from "lucide-react"

import { CasForm } from "@/components/forms/cas-form"
import { PageHeader } from "@/components/shared/page-header"
import { Section } from "@/components/shared/section"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { convocatorias } from "@/data/convocatorias"
import { formatDate } from "@/lib/format"
import { useDocumentMeta } from "@/lib/seo"
import { cn } from "@/lib/utils"
import { NotFoundPage } from "@/pages/not-found/not-found-page"

export function ConvocatoriaDetallePage() {
  const { id } = useParams<{ id: string }>()
  const convocatoria = convocatorias.find(
    (item) => String(item.id) === id
  )

  useDocumentMeta({
    title: convocatoria ? convocatoria.titulo : "Convocatoria no encontrada",
    description: convocatoria
      ? `${convocatoria.cargo} - ${convocatoria.area}`
      : undefined,
  })

  if (!convocatoria) {
    return <NotFoundPage />
  }

  return (
    <div className="flex flex-col">
      <PageHeader
        title={convocatoria.titulo}
        description={convocatoria.area}
        breadcrumbs={[
          { label: "Convocatorias CAS", to: "/convocatorias" },
          { label: convocatoria.titulo },
        ]}
        actions={
          <Badge
            variant={convocatoria.estado === "Abierta" ? "default" : "outline"}
          >
            {convocatoria.estado}
          </Badge>
        }
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-col gap-4">
            <Card>
              <CardContent className="flex flex-col gap-4 p-6">
                <h2 className="font-heading text-lg font-semibold">
                  Datos de la convocatoria
                </h2>
                <dl className="flex flex-col gap-3 text-sm">
                  <div className="flex items-start justify-between gap-3">
                    <dt className="flex items-center gap-1.5 text-muted-foreground">
                      <Briefcase className="size-4" /> Cargo
                    </dt>
                    <dd className="text-right font-medium">
                      {convocatoria.cargo}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <dt className="flex items-center gap-1.5 text-muted-foreground">
                      <Wallet className="size-4" /> Remuneración
                    </dt>
                    <dd className="text-right font-medium">
                      {convocatoria.remuneracion}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <dt className="flex items-center gap-1.5 text-muted-foreground">
                      <Calendar className="size-4" /> Inicio
                    </dt>
                    <dd className="text-right font-medium">
                      {formatDate(convocatoria.fechaInicio)}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <dt className="flex items-center gap-1.5 text-muted-foreground">
                      <Calendar className="size-4" /> Cierre
                    </dt>
                    <dd className="text-right font-medium">
                      {formatDate(convocatoria.fechaFin)}
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col gap-3 p-6">
                <h2 className="flex items-center gap-2 font-heading text-lg font-semibold">
                  <CheckCircle2 className="size-5 text-primary" /> Requisitos
                </h2>
                <ul className="flex flex-col gap-2 text-sm">
                  {convocatoria.requisitos.map((requisito) => (
                    <li key={requisito} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{requisito}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col gap-3 p-6">
                <h2 className="flex items-center gap-2 font-heading text-lg font-semibold">
                  <ListChecks className="size-5 text-primary" /> Funciones
                </h2>
                <ul className="flex flex-col gap-2 text-sm">
                  {convocatoria.funciones.map((funcion) => (
                    <li key={funcion} className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="text-muted-foreground">{funcion}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Link
              to="/convocatorias"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "w-fit gap-1.5"
              )}
            >
              <ArrowLeft className="size-4" /> Volver a convocatorias
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <h2 className="font-heading text-2xl font-semibold">
                Postula a esta convocatoria
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Completa tus datos y adjunta tu curriculum vitae en formato PDF.
              </p>
            </div>

            {convocatoria.estado === "Abierta" ? (
              <CasForm convocatoria={convocatoria} />
            ) : (
              <Alert>
                <AlertTitle>Convocatoria cerrada</AlertTitle>
                <AlertDescription>
                  Esta convocatoria ya no recibe postulaciones. Revisa las
                  convocatorias vigentes.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </Section>
    </div>
  )
}

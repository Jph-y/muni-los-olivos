import { Link, useParams } from "react-router"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  ListOrdered,
  Wallet,
} from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { Section } from "@/components/shared/section"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { tramites } from "@/data/tramites"
import { useDocumentMeta } from "@/lib/seo"
import { cn } from "@/lib/utils"
import { NotFoundPage } from "@/pages/not-found/not-found-page"

export function TramiteDetallePage() {
  const { slug } = useParams<{ slug: string }>()
  const tramite = tramites.find((item) => item.slug === slug)

  useDocumentMeta({
    title: tramite ? tramite.titulo : "Trámite no encontrado",
    description: tramite?.resumen,
  })

  if (!tramite) {
    return <NotFoundPage />
  }

  return (
    <div className="flex flex-col">
      <PageHeader
        title={tramite.titulo}
        description={tramite.resumen}
        breadcrumbs={[
          { label: "Trámites y servicios", to: "/tramites" },
          { label: tramite.titulo },
        ]}
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="mb-4 flex items-center gap-2 font-heading text-2xl font-semibold">
                <CheckCircle2 className="size-5 text-primary" /> Requisitos
              </h2>
              <ul className="flex flex-col gap-2">
                {tramite.requisitos.map((requisito) => (
                  <li
                    key={requisito}
                    className="flex items-start gap-2.5 rounded-lg border bg-card p-3 text-sm"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{requisito}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <div>
              <h2 className="mb-4 flex items-center gap-2 font-heading text-2xl font-semibold">
                <ListOrdered className="size-5 text-primary" /> Pasos a seguir
              </h2>
              <ol className="flex flex-col gap-3">
                {tramite.pasos.map((paso, index) => (
                  <li key={paso} className="flex items-start gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      {index + 1}
                    </span>
                    <p className="pt-1 text-sm text-muted-foreground">{paso}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <aside className="flex flex-col gap-4 lg:sticky lg:top-28 lg:h-fit">
            <Card>
              <CardContent className="flex flex-col gap-4 p-6">
                <h2 className="font-heading text-lg font-semibold">
                  Datos del trámite
                </h2>
                <dl className="flex flex-col gap-3 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="flex items-center gap-1.5 text-muted-foreground">
                      <Wallet className="size-4" /> Costo
                    </dt>
                    <dd className="text-right font-medium">{tramite.costo}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="size-4" /> Plazo
                    </dt>
                    <dd className="text-right font-medium">{tramite.plazo}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="flex items-center gap-1.5 text-muted-foreground">
                      <FileText className="size-4" /> Modalidad
                    </dt>
                    <dd className="text-right font-medium">{tramite.modalidad}</dd>
                  </div>
                </dl>
                <Badge variant="secondary" className="w-fit">
                  {tramite.categoria}
                </Badge>
                <Separator />
                <div className="flex flex-col gap-2">
                  {tramite.urlExterna ? (
                    <a
                      href={tramite.urlExterna}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(buttonVariants(), "gap-1.5")}
                    >
                      Iniciar trámite <ExternalLink className="size-4" />
                    </a>
                  ) : (
                    <Link
                      to="/mesa-de-partes"
                      className={cn(buttonVariants(), "gap-1.5")}
                    >
                      Presentar en mesa de partes <ArrowRight className="size-4" />
                    </Link>
                  )}
                  <Link
                    to="/contacto"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "gap-1.5"
                    )}
                  >
                    Tengo una consulta
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Link
              to="/tramites"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "w-fit gap-1.5"
              )}
            >
              <ArrowLeft className="size-4" /> Volver a trámites
            </Link>
          </aside>
        </div>
      </Section>
    </div>
  )
}

import { Link, useParams } from "react-router"
import { ArrowLeft, Calendar, Megaphone } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { Section } from "@/components/shared/section"
import { SmartImage } from "@/components/shared/smart-image"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { campanas } from "@/data/campanas"
import { formatDate } from "@/lib/format"
import { useDocumentMeta } from "@/lib/seo"
import { cn } from "@/lib/utils"
import { NotFoundPage } from "@/pages/not-found/not-found-page"

export function CampanaDetallePage() {
  const { slug } = useParams<{ slug: string }>()
  const campana = campanas.find((item) => item.slug === slug)

  useDocumentMeta({
    title: campana ? campana.titulo : "Campaña no encontrada",
    description: campana?.descripcion,
  })

  if (!campana) {
    return <NotFoundPage />
  }

  return (
    <div className="flex flex-col">
      <PageHeader
        title={campana.titulo}
        description={campana.descripcion}
        breadcrumbs={[
          { label: "Campañas y eventos", to: "/campanas" },
          { label: campana.titulo },
        ]}
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <SmartImage
            src={campana.imagen}
            alt={campana.titulo}
            className="aspect-[16/9] w-full rounded-2xl"
          />
          <Card className="h-fit">
            <CardContent className="flex flex-col gap-4 p-6">
              <Badge variant="secondary" className="w-fit gap-1">
                <Megaphone className="size-3.5" /> Campaña municipal
              </Badge>
              <h2 className="font-heading text-xl font-semibold">
                {campana.titulo}
              </h2>
              <p className="text-sm text-pretty text-muted-foreground">
                {campana.descripcion}
              </p>
              <div className="flex flex-col gap-2 border-t pt-4 text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="size-4" /> Inicio:{" "}
                  <span className="font-medium text-foreground">
                    {formatDate(campana.fechaInicio)}
                  </span>
                </span>
                {campana.fechaFin && (
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="size-4" /> Fin:{" "}
                    <span className="font-medium text-foreground">
                      {formatDate(campana.fechaFin)}
                    </span>
                  </span>
                )}
              </div>
              <Link
                to="/contacto"
                className={cn(buttonVariants(), "w-full gap-1.5")}
              >
                Solicitar información
              </Link>
            </CardContent>
          </Card>
        </div>

        <Link
          to="/campanas"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "mt-8 w-fit gap-1.5"
          )}
        >
          <ArrowLeft className="size-4" /> Volver a campañas
        </Link>
      </Section>
    </div>
  )
}

import { Link, useParams } from "react-router"
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { Section } from "@/components/shared/section"
import { SmartImage } from "@/components/shared/smart-image"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { noticias } from "@/data/noticias"
import { formatDateTime } from "@/lib/format"
import { useDocumentMeta } from "@/lib/seo"
import { cn } from "@/lib/utils"
import { NotFoundPage } from "@/pages/not-found/not-found-page"

export function NoticiaDetallePage() {
  const { slug } = useParams<{ slug: string }>()
  const noticia = noticias.find((item) => item.slug === slug)

  useDocumentMeta({
    title: noticia ? noticia.titulo : "Noticia no encontrada",
    description: noticia?.resumen,
  })

  if (!noticia) {
    return <NotFoundPage />
  }

  const relacionadas = noticias
    .filter((item) => item.slug !== noticia.slug)
    .slice(0, 3)

  return (
    <div className="flex flex-col">
      <PageHeader
        title={noticia.titulo}
        description={noticia.resumen}
        breadcrumbs={[
          { label: "Noticias", to: "/noticias" },
          { label: noticia.titulo },
        ]}
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          <article className="flex flex-col gap-6">
            <SmartImage
              src={noticia.imagen}
              alt={noticia.titulo}
              className="aspect-[16/9] w-full rounded-2xl"
            />
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <Badge variant="secondary">{noticia.categoria}</Badge>
              <span className="flex items-center gap-1">
                <Calendar className="size-4" />
                {formatDateTime(noticia.fecha)}
              </span>
            </div>
            <div className="flex flex-col gap-4">
              {noticia.contenido.map((parrafo, index) => (
                <p
                  key={index}
                  className="text-base text-pretty text-foreground/90 first:text-lg first:font-medium"
                >
                  {parrafo}
                </p>
              ))}
            </div>
            <Link
              to="/noticias"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-fit gap-1.5"
              )}
            >
              <ArrowLeft className="size-4" /> Volver a noticias
            </Link>
          </article>

          <aside className="flex flex-col gap-4">
            <h2 className="font-heading text-xl font-semibold">
              Noticias relacionadas
            </h2>
            {relacionadas.map((item) => (
              <Link
                key={item.id}
                to={`/noticias/${item.slug}`}
                className="group">
                <Card className="transition-colors hover:border-primary/40 hover:shadow-md">
                  <CardContent className="flex gap-3 p-4">
                    <SmartImage
                      src={item.imagen}
                      alt={item.titulo}
                      className="size-20 shrink-0 rounded-lg"
                    />
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground">
                        {formatDateTime(item.fecha)}
                      </span>
                      <h3 className="line-clamp-2 text-sm font-medium group-hover:text-primary">
                        {item.titulo}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                        Leer <ArrowRight className="size-3.5" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </aside>
        </div>
      </Section>
    </div>
  )
}

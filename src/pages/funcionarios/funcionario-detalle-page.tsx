import { Link, useParams } from "react-router"
import { ArrowLeft, Building2, Mail, UserRound } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { Section } from "@/components/shared/section"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { funcionarios } from "@/data/funcionarios"
import { getInitials } from "@/lib/format"
import { useDocumentMeta } from "@/lib/seo"
import { cn } from "@/lib/utils"
import { NotFoundPage } from "@/pages/not-found/not-found-page"

export function FuncionarioDetallePage() {
  const { slug } = useParams<{ slug: string }>()
  const funcionario = funcionarios.find((item) => item.slug === slug)

  useDocumentMeta({
    title: funcionario ? funcionario.nombre : "Funcionario no encontrado",
    description: funcionario
      ? `${funcionario.cargo} de la Municipalidad Distrital de Los Olivos.`
      : undefined,
  })

  if (!funcionario) {
    return <NotFoundPage />
  }

  return (
    <div className="flex flex-col">
      <PageHeader
        title={funcionario.nombre}
        description={funcionario.cargo}
        breadcrumbs={[
          { label: "Municipalidad" },
          { label: "Directorio de funcionarios", to: "/funcionarios" },
          { label: funcionario.nombre },
        ]}
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <Card className="h-fit">
            <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
              <Avatar className="size-28">
                <AvatarFallback className="bg-primary text-2xl font-semibold text-primary-foreground">
                  {getInitials(funcionario.nombre)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-heading text-xl font-semibold">
                  {funcionario.nombre}
                </h2>
                <Badge variant="secondary" className="mt-2">
                  {funcionario.cargo}
                </Badge>
              </div>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="size-4" />
                {funcionario.area}
              </p>
              <div className="flex w-full flex-col gap-2 pt-2">
                <Link
                  to="/contacto"
                  className={cn(buttonVariants(), "w-full gap-1.5")}
                >
                  <Mail className="size-4" /> Contactar
                </Link>
                <Link
                  to="/registro-visitas"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full gap-1.5"
                  )}
                >
                  <UserRound className="size-4" /> Registrar visita
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-6">
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h3 className="mb-3 font-heading text-xl font-semibold">
                  Perfil
                </h3>
                <p className="text-pretty text-muted-foreground">
                  {funcionario.perfil ??
                    "La información del perfil profesional de esta autoridad o funcionario se encuentra en actualización. Para mayor detalle, comunícate con la municipalidad o consulta el directorio institucional."}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 sm:p-8">
                <h3 className="mb-3 font-heading text-xl font-semibold">
                  Datos institucionales
                </h3>
                <dl className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Cargo
                    </dt>
                    <dd className="mt-1 text-sm">{funcionario.cargo}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Área
                    </dt>
                    <dd className="mt-1 text-sm">{funcionario.area}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Sede
                    </dt>
                    <dd className="mt-1 text-sm">Palacio Municipal</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Central telefónica
                    </dt>
                    <dd className="mt-1 text-sm">
                      <a
                        href="tel:013214547"
                        className="text-primary hover:underline"
                      >
                        (01) 321-4547
                      </a>
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Button
              variant="ghost"
              className="w-fit gap-1.5"
              render={<Link to="/funcionarios" />}
            >
              <ArrowLeft className="size-4" /> Volver al directorio
            </Button>
          </div>
        </div>
      </Section>
    </div>
  )
}

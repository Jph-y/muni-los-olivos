import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { Section, SectionHeading } from "@/components/shared/section"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { emergencias, sedes, whatsappSerenazgo } from "@/data/sedes"
import { useDocumentMeta } from "@/lib/seo"
import { cn } from "@/lib/utils"

export function SedesPage() {
  useDocumentMeta({
    title: "Sedes y contacto",
    description:
      "Direcciones, horarios de atención, teléfonos y números de emergencia de la Municipalidad Distrital de Los Olivos.",
  })

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Sedes y contacto"
        description="Conoce nuestras sedes, horarios de atención y canales de contacto."
        breadcrumbs={[
          { label: "Municipalidad" },
          { label: "Sedes y contacto" },
        ]}
      />

      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sedes.map((sede) => (
            <Card key={sede.id} className="flex flex-col">
              <CardContent className="flex flex-1 flex-col gap-3 p-6">
                <h2 className="font-heading text-lg font-semibold">
                  {sede.nombre}
                </h2>
                <p className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="mt-0.5 size-4 shrink-0" />
                  {sede.direccion}
                </p>
                <a
                  href={`tel:${sede.telefono.replace(/[^\d]/g, "")}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                  <Phone className="size-4 shrink-0" /> {sede.telefono}
                </a>
                {sede.horario && (
                  <p className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Clock className="mt-0.5 size-4 shrink-0" />
                    {sede.horario}
                  </p>
                )}
                {sede.email && (
                  <a
                    href={`mailto:${sede.email}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                  >
                    <Mail className="size-4 shrink-0" /> {sede.email}
                  </a>
                )}
                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  <a
                    href={sede.mapaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "gap-1.5"
                    )}
                  >
                    <MapPin className="size-4" /> Ver mapa
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <SectionHeading
          eyebrow="Emergencias"
          title="Números de emergencia"
          description="Comunícate con las comisarías y servicios de seguridad del distrito."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {emergencias.map((emergencia) => (
            <Card key={emergencia.nombre}>
              <CardContent className="flex flex-col gap-1 p-5">
                <p className="text-sm text-muted-foreground">
                  {emergencia.nombre}
                </p>
                <a
                  href={`tel:${emergencia.telefono.replace(/[^\d]/g, "")}`}
                  className="font-semibold text-primary hover:underline"
                >
                  {emergencia.telefono}
                </a>
                {emergencia.telefonoAlt && (
                  <a
                    href={`tel:${emergencia.telefonoAlt.replace(/[^\d]/g, "")}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {emergencia.telefonoAlt}
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        <a
          href={whatsappSerenazgo}
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants(), "mt-6 w-fit gap-1.5")}
        >
          <MessageCircle className="size-4" /> WhatsApp Serenazgo
        </a>
      </Section>
    </div>
  )
}

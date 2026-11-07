import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react"

import { ContactForm } from "@/components/forms/contact-form"
import { PageHeader } from "@/components/shared/page-header"
import { Section } from "@/components/shared/section"
import { Card, CardContent } from "@/components/ui/card"
import { emergencias, sedes, whatsappSerenazgo } from "@/data/sedes"
import { useDocumentMeta } from "@/lib/seo"

export function ContactoPage() {
  useDocumentMeta({
    title: "Contacto",
    description:
      "Comunícate con la Municipalidad Distrital de Los Olivos. Canales de atención, teléfonos y formulario de contacto.",
  })

  const sede = sedes[0]

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Contacto"
        description="Envíanos tu consulta o comunícate por nuestros canales de atención."
        breadcrumbs={[{ label: "Contacto" }]}
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <ContactForm />

          <aside className="flex flex-col gap-4">
            <Card>
              <CardContent className="flex flex-col gap-3 p-6">
                <h2 className="font-heading text-lg font-semibold">
                  Datos de contacto
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
                <a
                  href={`mailto:${sede.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                  <Mail className="size-4 shrink-0" /> {sede.email}
                </a>
                <p className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Clock className="mt-0.5 size-4 shrink-0" />
                  {sede.horario}
                </p>
                <a
                  href={whatsappSerenazgo}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  <MessageCircle className="size-4" /> WhatsApp Serenazgo
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col gap-3 p-6">
                <h2 className="font-heading text-lg font-semibold">
                  Números de emergencia
                </h2>
                {emergencias.map((emergencia) => (
                  <div key={emergencia.nombre} className="text-sm">
                    <p className="text-muted-foreground">{emergencia.nombre}</p>
                    <a
                      href={`tel:${emergencia.telefono.replace(/[^\d]/g, "")}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {emergencia.telefono}
                    </a>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>
      </Section>
    </div>
  )
}

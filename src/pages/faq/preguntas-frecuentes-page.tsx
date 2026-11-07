import { Link } from "react-router"

import { PageHeader } from "@/components/shared/page-header"
import { Section } from "@/components/shared/section"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { buttonVariants } from "@/components/ui/button"
import { preguntasFrecuentes } from "@/data/faq"
import { useDocumentMeta } from "@/lib/seo"
import { cn } from "@/lib/utils"

export function PreguntasFrecuentesPage() {
  useDocumentMeta({
    title: "Preguntas frecuentes",
    description:
      "Respuestas a las consultas más frecuentes sobre trámites, servicios y atención municipal.",
  })

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Preguntas frecuentes"
        description="Encuentra respuestas a las consultas más comunes de los vecinos."
        breadcrumbs={[{ label: "Preguntas frecuentes" }]}
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <Accordion>
            {preguntasFrecuentes.map((item, index) => (
              <AccordionItem key={item.pregunta} value={`item-${index}`}>
                <AccordionTrigger className="text-base">
                  {item.pregunta}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{item.respuesta}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 rounded-xl border bg-secondary/40 p-6 text-center">
            <p className="text-muted-foreground">
              ¿No encontraste la respuesta que buscabas?
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Link to="/contacto" className={cn(buttonVariants(), "gap-1.5")}>
                Contáctanos
              </Link>
              <Link
                to="/tramites"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "gap-1.5"
                )}
              >
                Ver trámites
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}

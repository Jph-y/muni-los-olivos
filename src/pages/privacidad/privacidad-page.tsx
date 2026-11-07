import { PageHeader } from "@/components/shared/page-header"
import { Section } from "@/components/shared/section"
import { useDocumentMeta } from "@/lib/seo"

const secciones = [
  {
    titulo: "1. Responsable del tratamiento",
    contenido:
      "La Municipalidad Distrital de Los Olivos, con domicilio en Av. Carlos Izaguirre 813, Urb. Mercurio, Los Olivos, Lima, es la entidad responsable del tratamiento de los datos personales que se recopilan a través de este portal.",
  },
  {
    titulo: "2. Datos que recopilamos",
    contenido:
      "A través de nuestros formularios podemos solicitar datos de identificación (nombres, apellidos, DNI, correo electrónico, teléfono), información necesaria para atender trámites, reclamos, solicitudes de acceso a la información, postulaciones y registros de visitas.",
  },
  {
    titulo: "3. Finalidad del tratamiento",
    contenido:
      "Los datos personales son tratados con la finalidad de atender las solicitudes, reclamos, trámites y postulaciones presentadas, así como para mantener registro de las visitas y brindar respuesta a las consultas formuladas por la ciudadanía.",
  },
  {
    titulo: "4. Base legal",
    contenido:
      "El tratamiento se realiza en el marco de la Ley N.° 29733, Ley de Protección de Datos Personales, y su reglamento, así como de las normas de procedimiento administrativo aplicables a la entidad.",
  },
  {
    titulo: "5. Conservación de la información",
    contenido:
      "Los datos se conservarán durante el tiempo necesario para cumplir con la finalidad del tratamiento y con las obligaciones legales aplicables. Posteriormente podrán ser eliminados o anonimizados.",
  },
  {
    titulo: "6. Derechos del titular",
    contenido:
      "Puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición enviando una solicitud a través de mesa de partes virtual o presencial, dirigida a la Oficina de Atención al Ciudadano de la municipalidad.",
  },
  {
    titulo: "7. Seguridad de la información",
    contenido:
      "La municipalidad adopta medidas técnicas y organizativas razonables para proteger los datos personales frente a accesos no autorizados, pérdida, alteración o uso indebido.",
  },
  {
    titulo: "8. Contacto",
    contenido:
      "Para consultas sobre el tratamiento de tus datos personales, escríbenos a munilosolivos@munilosolivos.gob.pe o comunícate al (01) 321-4547.",
  },
]

export function PrivacidadPage() {
  useDocumentMeta({
    title: "Política de privacidad",
    description:
      "Política de privacidad y tratamiento de datos personales de la Municipalidad Distrital de Los Olivos.",
  })

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Política de privacidad"
        description="Conoce cómo tratamos y protegemos tus datos personales."
        breadcrumbs={[{ label: "Política de privacidad" }]}
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-muted-foreground">
            Última actualización: enero de 2025
          </p>
          <div className="mt-6 flex flex-col gap-8">
            {secciones.map((seccion) => (
              <section key={seccion.titulo}>
                <h2 className="font-heading text-xl font-semibold">
                  {seccion.titulo}
                </h2>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {seccion.contenido}
                </p>
              </section>
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}

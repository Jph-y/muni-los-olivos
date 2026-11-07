import { Link } from "react-router"

import { PageHeader } from "@/components/shared/page-header"
import { Section } from "@/components/shared/section"
import { useDocumentMeta } from "@/lib/seo"

const grupos = [
  {
    titulo: "Principal",
    enlaces: [
      { label: "Inicio", to: "/" },
      { label: "Trámites y servicios", to: "/tramites" },
      { label: "Noticias", to: "/noticias" },
      { label: "Campañas", to: "/campanas" },
      { label: "Preguntas frecuentes", to: "/preguntas-frecuentes" },
      { label: "Buscar", to: "/buscar" },
    ],
  },
  {
    titulo: "Municipalidad",
    enlaces: [
      { label: "Institucional", to: "/institucional" },
      { label: "Funcionarios", to: "/funcionarios" },
      { label: "Convocatorias CAS", to: "/convocatorias" },
      { label: "Transparencia", to: "/transparencia" },
      { label: "Normas y documentos legales", to: "/normas" },
      { label: "Informes y publicaciones", to: "/informes" },
      { label: "Sedes y contacto", to: "/sedes" },
    ],
  },
  {
    titulo: "Servicios en línea",
    enlaces: [
      { label: "Contacto", to: "/contacto" },
      { label: "Libro de reclamaciones", to: "/libro-reclamaciones" },
      { label: "Mesa de partes virtual", to: "/mesa-de-partes" },
      { label: "Acceso a la información pública", to: "/acceso-informacion" },
      { label: "Registro de visitas", to: "/registro-visitas" },
    ],
  },
  {
    titulo: "Información legal",
    enlaces: [
      { label: "Política de privacidad", to: "/privacidad" },
      { label: "Mapa del sitio", to: "/mapa-del-sitio" },
    ],
  },
]

export function MapaDelSitioPage() {
  useDocumentMeta({
    title: "Mapa del sitio",
    description:
      "Mapa del sitio con todas las secciones y páginas del portal municipal.",
  })

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Mapa del sitio"
        description="Navega por todas las secciones del portal municipal."
        breadcrumbs={[{ label: "Mapa del sitio" }]}
      />

      <Section>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {grupos.map((grupo) => (
            <nav key={grupo.titulo} aria-label={grupo.titulo}>
              <h2 className="font-heading text-lg font-semibold">
                {grupo.titulo}
              </h2>
              <ul className="mt-3 flex flex-col gap-2">
                {grupo.enlaces.map((enlace) => (
                  <li key={enlace.to}>
                    <Link
                      to={enlace.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {enlace.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Section>
    </div>
  )
}

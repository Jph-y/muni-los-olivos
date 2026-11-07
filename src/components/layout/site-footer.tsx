import { Link } from "react-router"
import { Clock, Mail, MapPin, Phone } from "lucide-react"

import { Logo } from "@/components/shared/logo"
import { SocialLinks } from "@/components/shared/social-links"
import { emergencias, sedes } from "@/data/sedes"

const footerColumns = [
  {
    title: "Municipalidad",
    links: [
      { label: "Información institucional", to: "/institucional" },
      { label: "Directorio de funcionarios", to: "/funcionarios" },
      { label: "Sedes", to: "/sedes" },
      { label: "Transparencia", to: "/transparencia" },
      { label: "Convocatorias CAS", to: "/convocatorias" },
    ],
  },
  {
    title: "Trámites y servicios",
    links: [
      { label: "Todos los trámites", to: "/tramites" },
      { label: "Mesa de partes virtual", to: "/mesa-de-partes" },
      { label: "Libro de reclamaciones", to: "/libro-reclamaciones" },
      { label: "Acceso a la información", to: "/acceso-informacion" },
      { label: "Registro de visitas", to: "/registro-visitas" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Noticias", to: "/noticias" },
      { label: "Normas y documentos", to: "/normas" },
      { label: "Informes y publicaciones", to: "/informes" },
      { label: "Campañas y eventos", to: "/campanas" },
      { label: "Preguntas frecuentes", to: "/preguntas-frecuentes" },
    ],
  },
]

export function SiteFooter() {
  const sedePrincipal = sedes[0]

  return (
    <footer className="mt-auto border-t bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="flex flex-col gap-4">
            <Logo className="[&_span]:text-primary-foreground" />
            <p className="max-w-sm text-sm text-primary-foreground/80">
              Trabajamos por mejorar la calidad de vida de la población
              olivense con una gestión transparente, cercana y eficiente.
            </p>
            <div className="flex flex-col gap-2 text-sm text-primary-foreground/80">
              <span className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                {sedePrincipal.direccion}
              </span>
              <a
                href={`tel:${sedePrincipal.telefono.replace(/[^\d]/g, "")}`}
                className="flex items-center gap-2 hover:text-primary-foreground"
              >
                <Phone className="size-4 shrink-0" />
                {sedePrincipal.telefono}
              </a>
              <a
                href={`mailto:${sedePrincipal.email}`}
                className="flex items-center gap-2 hover:text-primary-foreground"
              >
                <Mail className="size-4 shrink-0" />
                {sedePrincipal.email}
              </a>
              <span className="flex items-start gap-2">
                <Clock className="mt-0.5 size-4 shrink-0" />
                {sedePrincipal.horario}
              </span>
            </div>
            <SocialLinks
              className="flex items-center gap-1"
              iconClassName="size-4"
            />
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2 className="mb-3 text-sm font-semibold tracking-wide uppercase">
                {column.title}
              </h2>
              <ul className="flex flex-col gap-2 text-sm text-primary-foreground/80">
                {column.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="underline-offset-4 transition-colors hover:text-primary-foreground hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 rounded-xl bg-primary-foreground/10 p-5 sm:grid-cols-2 lg:grid-cols-4">
          {emergencias.slice(0, 4).map((emergencia) => (
            <div key={emergencia.nombre} className="text-sm">
              <p className="font-medium text-primary-foreground/70">
                {emergencia.nombre}
              </p>
              <p className="font-semibold">{emergencia.telefono}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Municipalidad Distrital de Los Olivos.
            Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/privacidad"
              className="underline-offset-4 hover:underline"
            >
              Política de privacidad
            </Link>
            <Link
              to="/mapa-sitio"
              className="underline-offset-4 hover:underline"
            >
              Mapa del sitio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

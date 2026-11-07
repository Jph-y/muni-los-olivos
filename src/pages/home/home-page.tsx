import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router"
import {
  ArrowRight,
  Building2,
  Calendar,
  ChevronRight,
  Clock,
  ExternalLink,
  FileText,
  Landmark,
  Leaf,
  MapPin,
  MessageCircle,
  Newspaper,
  Phone,
  Scale,
  Search,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Section, SectionHeading } from "@/components/shared/section"
import { SmartImage } from "@/components/shared/smart-image"
import { campanas } from "@/data/campanas"
import { funcionarios } from "@/data/funcionarios"
import { institucional } from "@/data/institucional"
import { noticias } from "@/data/noticias"
import { emergencias, enlacesInteres, sedes, whatsappSerenazgo } from "@/data/sedes"
import { tramites } from "@/data/tramites"
import { formatDate } from "@/lib/format"
import { useDocumentMeta } from "@/lib/seo"
import { cn } from "@/lib/utils"

const accesosRapidos = [
  {
    label: "Mesa de partes",
    description: "Presenta documentos en línea",
    to: "/mesa-de-partes",
    icon: FileText,
  },
  {
    label: "Libro de reclamaciones",
    description: "Registra tu reclamo o sugerencia",
    to: "/libro-reclamaciones",
    icon: MessageCircle,
  },
  {
    label: "Transparencia",
    description: "Información pública de la gestión",
    to: "/transparencia",
    icon: Scale,
  },
  {
    label: "Pagos en línea",
    description: "Tributos y servicios municipales",
    href: "https://servicios.munilosolivos.gob.pe/pagosenlinea/public/",
    icon: Wallet,
  },
]

export function HomePage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")

  useDocumentMeta({
    title: "Inicio",
    description:
      "Portal oficial de la Municipalidad Distrital de Los Olivos. Trámites, servicios, noticias, normas y canales de atención.",
  })

  const handleSearch = (event: FormEvent) => {
    event.preventDefault()
    navigate(`/buscar?q=${encodeURIComponent(query.trim())}`)
  }

  const tramitesDestacados = tramites.slice(0, 6)
  const noticiasDestacadas = noticias.slice(0, 4)
  const campanasDestacadas = campanas.slice(0, 3)

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(217,180,74,0.22),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.12),transparent_40%)]"
        />
        <div
          aria-hidden="true"
          className="absolute -right-24 -bottom-24 size-96 rounded-full border border-primary-foreground/15"
        />
        <div
          aria-hidden="true"
          className="absolute -right-10 -bottom-10 size-64 rounded-full border border-primary-foreground/10"
        />
        <div className="container relative mx-auto grid gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8 lg:py-20">
          <div className="flex flex-col gap-6">
            <Badge className="w-fit border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground">
              <Leaf className="size-3.5" /> Distrito de Los Olivos
            </Badge>
            <div className="max-w-2xl">
              <h1 className="text-4xl font-semibold text-balance sm:text-5xl lg:text-6xl">
                Un municipio más cercano, transparente y eficiente
              </h1>
              <p className="mt-4 max-w-xl text-base text-pretty text-primary-foreground/85 sm:text-lg">
                Accede a trámites, servicios, noticias y canales de atención de la
                Municipalidad Distrital de Los Olivos en un solo lugar.
              </p>
            </div>

            <form onSubmit={handleSearch} className="flex max-w-xl gap-2">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-black/40" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="¿Qué trámite o servicio buscas?"
                  aria-label="Buscar trámites y servicios"
                   className="h-11 border-transparent bg-background pl-9 text-foreground placeholder:text-black/40"
                />
              </div>
              <Button type="submit" size="lg" variant="secondary" className="h-11">
                Buscar
              </Button>
            </form>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-primary-foreground/80">
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" /> Lun a vie: 8:30 am - 6:00 pm
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4" /> Av. Carlos Izaguirre 813
              </span>
              <a
                href={whatsappSerenazgo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-primary-foreground"
              >
                <Phone className="size-4" /> WhatsApp Serenazgo
              </a>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {accesosRapidos.map((acceso) => {
              const Icon = acceso.icon
              const content = (
                <div className="group flex h-full flex-col gap-3 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-5 backdrop-blur-sm transition-colors hover:bg-primary-foreground/15">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="font-semibold">{acceso.label}</p>
                    <p className="text-sm text-primary-foreground/75">
                      {acceso.description}
                    </p>
                  </div>
                  <ArrowRight className="mt-auto size-4 transition-transform group-hover:translate-x-1" />
                </div>
              )

              if ("href" in acceso && acceso.href) {
                return (
                  <a
                    key={acceso.label}
                    href={acceso.href}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-visible:ring-3 focus-visible:ring-primary-foreground/40 focus-visible:outline-none"
                  >
                    {content}
                  </a>
                )
              }

              return (
                <Link
                  key={acceso.label}
                  to={acceso.to ?? "/"}
                  className="focus-visible:ring-3 focus-visible:ring-primary-foreground/40 focus-visible:outline-none"
                >
                  {content}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <Section className="border-b bg-background">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Trámites y servicios", value: `${tramites.length}+`, icon: FileText },
            { label: "Funcionarios y autoridades", value: `${funcionarios.length}`, icon: Users },
            { label: "Sedes municipales", value: `${sedes.length}`, icon: Building2 },
            { label: "Atención al vecino", value: "Lun a Sáb", icon: Clock },
          ].map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="flex items-center gap-4 rounded-xl border bg-card p-5 shadow-sm"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Trámites y servicios"
          title="Lo que más busca el vecino"
          description="Accede a los trámites y servicios más solicitados de la municipalidad."
          action={
            <Link
              to="/tramites"
              className={cn(buttonVariants({ variant: "outline" }), "gap-1.5")}
            >
              Ver todos <ArrowRight className="size-4" />
            </Link>
          }
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tramitesDestacados.map((tramite) => (
            <Link
              key={tramite.id}
              to={`/tramites/${tramite.slug}`}
              className="group flex flex-col gap-3 rounded-xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <div className="flex items-center justify-between gap-2">
                <Badge variant="secondary">{tramite.categoria}</Badge>
                <span className="text-xs font-medium text-muted-foreground">
                  {tramite.modalidad}
                </span>
              </div>
              <h3 className="font-heading text-lg leading-snug text-balance group-hover:text-primary">
                {tramite.titulo}
              </h3>
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {tramite.resumen}
              </p>
              <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary">
                Ver trámite <ChevronRight className="size-4" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <SectionHeading
          eyebrow="Actualidad"
          title="Noticias y novedades"
          description="Conoce las acciones y proyectos de la gestión municipal."
          action={
            <Link
              to="/noticias"
              className={cn(buttonVariants({ variant: "outline" }), "gap-1.5")}
            >
              Ver noticias <ArrowRight className="size-4" />
            </Link>
          }
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {noticiasDestacadas[0] && (
            <Link
              to={`/noticias/${noticiasDestacadas[0].slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <SmartImage
                src={noticiasDestacadas[0].imagen}
                alt={noticiasDestacadas[0].titulo}
                className="aspect-[16/9] w-full"
                imgClassName="transition-transform duration-500 group-hover:scale-105"
              />
              <div className="flex flex-col gap-2 p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="secondary">{noticiasDestacadas[0].categoria}</Badge>
                  <span>{formatDate(noticiasDestacadas[0].fecha)}</span>
                </div>
                <h3 className="font-heading text-xl leading-snug text-balance group-hover:text-primary">
                  {noticiasDestacadas[0].titulo}
                </h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {noticiasDestacadas[0].resumen}
                </p>
              </div>
            </Link>
          )}
          <div className="flex flex-col gap-4">
            {noticiasDestacadas.slice(1).map((noticia) => (
              <Link
                key={noticia.id}
                to={`/noticias/${noticia.slug}`}
                className="group flex gap-4 rounded-xl border bg-card p-4 shadow-sm transition-colors hover:border-primary/40 hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <SmartImage
                  src={noticia.imagen}
                  alt={noticia.titulo}
                  className="size-24 shrink-0 rounded-lg sm:size-28"
                />
                <div className="flex flex-col gap-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary">{noticia.categoria}</Badge>
                    <span>{formatDate(noticia.fecha)}</span>
                  </div>
                  <h3 className="font-heading text-base leading-snug text-balance group-hover:text-primary sm:text-lg">
                    {noticia.titulo}
                  </h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {noticia.resumen}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="flex flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-accent/70 px-3 py-1 text-xs font-semibold tracking-wide text-accent-foreground uppercase">
              <Landmark className="size-3.5" /> La institución
            </span>
            <h2 className="text-3xl font-semibold text-balance">
              Comprometidos con el desarrollo de Los Olivos
            </h2>
            <p className="text-pretty text-muted-foreground">
              {institucional.queHacemos}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/institucional"
                className={cn(buttonVariants(), "gap-1.5")}
              >
                Conocer la institución <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/funcionarios"
                className={cn(buttonVariants({ variant: "outline" }), "gap-1.5")}
              >
                <Users className="size-4" /> Directorio
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <Scale className="mb-3 size-6 text-primary" />
              <h3 className="mb-2 font-semibold">Misión</h3>
              <p className="line-clamp-5 text-sm text-muted-foreground">
                {institucional.mision}
              </p>
            </div>
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <Leaf className="mb-3 size-6 text-primary" />
              <h3 className="mb-2 font-semibold">Visión</h3>
              <p className="line-clamp-5 text-sm text-muted-foreground">
                {institucional.vision}
              </p>
            </div>
            <div className="rounded-2xl border bg-primary p-6 text-primary-foreground shadow-sm sm:col-span-2">
              <h3 className="mb-2 font-semibold">Visión territorial</h3>
              <p className="text-sm text-primary-foreground/85">
                {institucional.visionTerritorial}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {campanasDestacadas.length > 0 && (
        <Section className="bg-secondary/40">
          <SectionHeading
            eyebrow="Campañas y eventos"
            title="Campañas vigentes"
            description="Aprovecha los beneficios y actividades organizadas por la municipalidad."
            action={
              <Link
                to="/campanas"
                className={cn(buttonVariants({ variant: "outline" }), "gap-1.5")}
              >
                Ver campañas <ArrowRight className="size-4" />
              </Link>
            }
          />
          <div className="grid gap-4 md:grid-cols-3">
            {campanasDestacadas.map((campana) => (
              <Link
                key={campana.id}
                to={`/campanas/${campana.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <SmartImage
                  src={campana.imagen}
                  alt={campana.titulo}
                  className="aspect-[16/9] w-full"
                  imgClassName="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="flex flex-col gap-2 p-5">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="size-3.5" />
                    {formatDate(campana.fechaInicio)}
                  </span>
                  <h3 className="font-heading text-lg leading-snug text-balance group-hover:text-primary">
                    {campana.titulo}
                  </h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {campana.descripcion}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <SectionHeading
              eyebrow="Atención al vecino"
              title="Sedes y contacto"
              className="mb-0"
            />
            <div className="flex flex-col gap-3">
              {sedes.map((sede) => (
                <div
                  key={sede.id}
                  className="rounded-xl border bg-card p-5 shadow-sm"
                >
                  <h3 className="font-semibold">{sede.nombre}</h3>
                  <p className="mt-1 flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 size-4 shrink-0" />
                    {sede.direccion}
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="size-4 shrink-0" />
                    {sede.telefono}
                  </p>
                  {sede.horario && (
                    <p className="mt-1 flex items-start gap-2 text-sm text-muted-foreground">
                      <Clock className="mt-0.5 size-4 shrink-0" />
                      {sede.horario}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <Link
              to="/sedes"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-fit gap-1.5"
              )}
            >
              Ver todas las sedes <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="flex flex-col gap-5">
            <SectionHeading
              eyebrow="Emergencias"
              title="Números de emergencia"
              className="mb-0"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {emergencias.map((emergencia) => (
                <div
                  key={emergencia.nombre}
                  className="rounded-xl border bg-card p-4 shadow-sm"
                >
                  <p className="text-sm text-muted-foreground">
                    {emergencia.nombre}
                  </p>
                  <a
                    href={`tel:${emergencia.telefono.replace(/[^\d]/g, "")}`}
                    className="mt-1 block font-semibold text-primary hover:underline"
                  >
                    {emergencia.telefono}
                  </a>
                  {emergencia.telefonoAlt && (
                    <a
                      href={`tel:${emergencia.telefonoAlt.replace(/[^\d]/g, "")}`}
                      className="block text-sm text-primary hover:underline"
                    >
                      {emergencia.telefonoAlt}
                    </a>
                  )}
                </div>
              ))}
            </div>
            <a
              href={whatsappSerenazgo}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants(), "w-fit gap-1.5")}
            >
              <MessageCircle className="size-4" /> WhatsApp Serenazgo
            </a>
          </div>
        </div>
      </Section>

      <Section className="border-t bg-secondary/40">
        <SectionHeading
          eyebrow="Enlaces de interés"
          title="Plataformas y recursos"
          description="Accesos directos a servicios y plataformas de la municipalidad."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {enlacesInteres.map((grupo) => (
            <div key={grupo.categoria} className="rounded-xl border bg-card p-5 shadow-sm">
              <h3 className="mb-3 font-semibold">{grupo.categoria}</h3>
              <Separator className="mb-3" />
              <ul className="flex flex-col gap-2">
                {grupo.items.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-start gap-2 text-sm text-muted-foreground hover:text-primary"
                    >
                      <ExternalLink className="mt-0.5 size-3.5 shrink-0" />
                      <span className="underline-offset-4 group-hover:underline">
                        {item.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3 rounded-xl border bg-card p-5">
          <Newspaper className="size-5 text-primary" />
          <p className="text-sm text-muted-foreground">
            ¿Buscas todas las noticias, normas e informes de la entidad?
          </p>
          <Link to="/mapa-sitio" className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}>
            Ver mapa del sitio <ChevronRight className="size-4" />
          </Link>
        </div>
      </Section>

      <section className="bg-primary py-10 text-primary-foreground">
        <div className="container mx-auto flex flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-8 text-accent" />
            <div>
              <p className="font-heading text-lg font-semibold">
                ¿Necesitas ayuda con un trámite?
              </p>
              <p className="text-sm text-primary-foreground/80">
                Comunícate con nosotros o acércate a la sede principal.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/contacto"
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "gap-1.5"
              )}
            >
              Contacto <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/preguntas-frecuentes"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "gap-1.5 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              )}
            >
              Preguntas frecuentes
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

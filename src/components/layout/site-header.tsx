import { useEffect, useRef, useState } from "react"
import { Link, NavLink, useLocation } from "react-router"
import { ChevronDown, Menu, Moon, Search, Sun } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Logo } from "@/components/shared/logo"
import { SocialLinks } from "@/components/shared/social-links"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

export const municipioLinks = [
  { label: "Información institucional", to: "/institucional" },
  { label: "Directorio de funcionarios", to: "/funcionarios" },
  { label: "Sedes y contacto", to: "/sedes" },
  { label: "Transparencia", to: "/transparencia" },
  { label: "Convocatorias CAS", to: "/convocatorias" },
  { label: "Preguntas frecuentes", to: "/preguntas-frecuentes" },
]

export const serviciosLinks = [
  { label: "Mesa de partes virtual", to: "/mesa-de-partes" },
  { label: "Libro de reclamaciones", to: "/libro-reclamaciones" },
  { label: "Acceso a la información", to: "/acceso-informacion" },
  { label: "Registro de visitas", to: "/registro-visitas" },
  { label: "Contacto", to: "/contacto" },
]

const primaryLinks = [
  { label: "Inicio", to: "/" },
  { label: "Trámites", to: "/tramites" },
  { label: "Noticias", to: "/noticias" },
  { label: "Normas y documentos", to: "/normas" },
]

function desktopLinkClass({ isActive }: { isActive: boolean }) {
  return cn(
    "rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
    isActive
      ? "bg-secondary text-primary"
      : "text-foreground/80 hover:bg-secondary/70 hover:text-foreground"
  )
}

function NavDropdown({
  label,
  items,
}: {
  label: string
  items: { label: string; to: string }[]
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const location = useLocation()

  useEffect(() => {
    if (detailsRef.current) {
      detailsRef.current.open = false
    }
  }, [location.pathname])

  return (
    <details ref={detailsRef} className="group relative">
      <summary className="flex cursor-pointer list-none items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors outline-none select-none hover:bg-secondary/70 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden">
        {label}
        <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
      </summary>
      <div className="absolute top-full left-0 z-50 mt-2 w-64 rounded-xl border bg-popover p-2 shadow-lg">
        <ul className="flex flex-col">
          {items.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                onClick={() => {
                  if (detailsRef.current) detailsRef.current.open = false
                }}
                className="block rounded-md px-3 py-2 text-sm text-popover-foreground transition-colors hover:bg-secondary hover:text-primary"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </details>
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  )
}

function MobileNav({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const close = () => onOpenChange(false)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[88%] overflow-y-auto p-0 sm:max-w-sm">
        <SheetHeader className="border-b p-4">
          <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
          <Logo compact />
        </SheetHeader>
        <nav className="flex flex-col gap-1 p-4" aria-label="Navegación móvil">
          {primaryLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={close}
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-secondary text-primary"
                    : "text-foreground hover:bg-secondary/70"
                )
              }
              end={item.to === "/"}
            >
              {item.label}
            </NavLink>
          ))}

          <Accordion className="mt-2">
            <AccordionItem value="municipio">
              <AccordionTrigger>Municipalidad</AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col gap-1 pl-2">
                  {municipioLinks.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={close}
                        className="block rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-primary"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="servicios">
              <AccordionTrigger>Servicios</AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col gap-1 pl-2">
                  {serviciosLinks.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={close}
                        className="block rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-primary"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Link
            to="/buscar"
            onClick={close}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "mt-4 justify-start"
            )}
          >
            <Search /> Buscar en el portal
          </Link>
        </nav>
        <div className="border-t p-4">
          <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Síguenos
          </p>
          <SocialLinks className="flex gap-1" />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="hidden border-b border-primary-foreground/10 bg-primary text-primary-foreground md:block">
        <div className="container mx-auto flex h-9 items-center justify-between px-4 text-xs sm:px-6 lg:px-8">
          <p className="font-medium">
            Portal oficial de la Municipalidad Distrital de Los Olivos
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/transparencia"
              className="underline-offset-4 hover:underline"
            >
              Transparencia
            </Link>
            <Link
              to="/mesa-de-partes"
              className="underline-offset-4 hover:underline"
            >
              Mesa de partes
            </Link>
            <Link
              to="/libro-reclamaciones"
              className="underline-offset-4 hover:underline"
            >
              Libro de reclamaciones
            </Link>
            <SocialLinks
              className="flex items-center gap-0.5"
              iconClassName="size-3.5"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Logo />

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Navegación principal"
        >
          {primaryLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={desktopLinkClass}
            >
              {item.label}
            </NavLink>
          ))}
          <NavDropdown label="Municipalidad" items={municipioLinks} />
          <NavDropdown label="Servicios" items={serviciosLinks} />
          <NavLink to="/contacto" className={desktopLinkClass}>
            Contacto
          </NavLink>
        </nav>

        <div className="flex items-center gap-1">
          <Link
            to="/buscar"
            aria-label="Buscar en el portal"
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
          >
            <Search />
          </Link>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Abrir menú de navegación"
            onClick={() => setMobileOpen(true)}
          >
            <Menu />
          </Button>
        </div>
      </div>

      <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} />
    </header>
  )
}

import { Outlet } from "react-router"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { ScrollToTop } from "@/components/shared/scroll-to-top"
import { Toaster } from "@/components/ui/sonner"

export function SiteLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg"
      >
        Saltar al contenido principal
      </a>
      <ScrollToTop />
      <SiteHeader />
      <main id="contenido-principal" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <Toaster position="top-right" richColors closeButton />
    </div>
  )
}

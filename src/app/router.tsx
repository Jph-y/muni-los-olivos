import { createBrowserRouter } from "react-router"

import { SiteLayout } from "@/components/layout/site-layout"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SiteLayout />,
    children: [
      {
        index: true,
        lazy: async () => {
          const { HomePage } = await import("@/pages/home/home-page")
          return { Component: HomePage }
        },
      },
      {
        path: "institucional",
        lazy: async () => {
          const { InstitucionalPage } = await import(
            "@/pages/institucional/institucional-page"
          )
          return { Component: InstitucionalPage }
        },
      },
      {
        path: "funcionarios",
        lazy: async () => {
          const { FuncionariosPage } = await import(
            "@/pages/funcionarios/funcionarios-page"
          )
          return { Component: FuncionariosPage }
        },
      },
      {
        path: "funcionarios/:slug",
        lazy: async () => {
          const { FuncionarioDetallePage } = await import(
            "@/pages/funcionarios/funcionario-detalle-page"
          )
          return { Component: FuncionarioDetallePage }
        },
      },
      {
        path: "tramites",
        lazy: async () => {
          const { TramitesPage } = await import(
            "@/pages/tramites/tramites-page"
          )
          return { Component: TramitesPage }
        },
      },
      {
        path: "tramites/:slug",
        lazy: async () => {
          const { TramiteDetallePage } = await import(
            "@/pages/tramites/tramite-detalle-page"
          )
          return { Component: TramiteDetallePage }
        },
      },
      {
        path: "noticias",
        lazy: async () => {
          const { NoticiasPage } = await import(
            "@/pages/noticias/noticias-page"
          )
          return { Component: NoticiasPage }
        },
      },
      {
        path: "noticias/:slug",
        lazy: async () => {
          const { NoticiaDetallePage } = await import(
            "@/pages/noticias/noticia-detalle-page"
          )
          return { Component: NoticiaDetallePage }
        },
      },
      {
        path: "campanas",
        lazy: async () => {
          const { CampanasPage } = await import(
            "@/pages/campanas/campanas-page"
          )
          return { Component: CampanasPage }
        },
      },
      {
        path: "campanas/:slug",
        lazy: async () => {
          const { CampanaDetallePage } = await import(
            "@/pages/campanas/campana-detalle-page"
          )
          return { Component: CampanaDetallePage }
        },
      },
      {
        path: "normas",
        lazy: async () => {
          const { NormasPage } = await import("@/pages/normas/normas-page")
          return { Component: NormasPage }
        },
      },
      {
        path: "informes",
        lazy: async () => {
          const { InformesPage } = await import(
            "@/pages/informes/informes-page"
          )
          return { Component: InformesPage }
        },
      },
      {
        path: "transparencia",
        lazy: async () => {
          const { TransparenciaPage } = await import(
            "@/pages/transparencia/transparencia-page"
          )
          return { Component: TransparenciaPage }
        },
      },
      {
        path: "sedes",
        lazy: async () => {
          const { SedesPage } = await import("@/pages/sedes/sedes-page")
          return { Component: SedesPage }
        },
      },
      {
        path: "contacto",
        lazy: async () => {
          const { ContactoPage } = await import(
            "@/pages/contacto/contacto-page"
          )
          return { Component: ContactoPage }
        },
      },
      {
        path: "libro-reclamaciones",
        lazy: async () => {
          const { LibroReclamacionesPage } = await import(
            "@/pages/reclamos/libro-reclamaciones-page"
          )
          return { Component: LibroReclamacionesPage }
        },
      },
      {
        path: "mesa-de-partes",
        lazy: async () => {
          const { MesaPartesPage } = await import(
            "@/pages/mesa-partes/mesa-partes-page"
          )
          return { Component: MesaPartesPage }
        },
      },
      {
        path: "acceso-informacion",
        lazy: async () => {
          const { AccesoInformacionPage } = await import(
            "@/pages/acceso-informacion/acceso-informacion-page"
          )
          return { Component: AccesoInformacionPage }
        },
      },
      {
        path: "registro-visitas",
        lazy: async () => {
          const { RegistroVisitasPage } = await import(
            "@/pages/registro-visitas/registro-visitas-page"
          )
          return { Component: RegistroVisitasPage }
        },
      },
      {
        path: "convocatorias",
        lazy: async () => {
          const { ConvocatoriasPage } = await import(
            "@/pages/convocatorias/convocatorias-page"
          )
          return { Component: ConvocatoriasPage }
        },
      },
      {
        path: "convocatorias/:id",
        lazy: async () => {
          const { ConvocatoriaDetallePage } = await import(
            "@/pages/convocatorias/convocatoria-detalle-page"
          )
          return { Component: ConvocatoriaDetallePage }
        },
      },
      {
        path: "preguntas-frecuentes",
        lazy: async () => {
          const { PreguntasFrecuentesPage } = await import(
            "@/pages/faq/preguntas-frecuentes-page"
          )
          return { Component: PreguntasFrecuentesPage }
        },
      },
      {
        path: "buscar",
        lazy: async () => {
          const { BuscarPage } = await import("@/pages/buscar/buscar-page")
          return { Component: BuscarPage }
        },
      },
      {
        path: "privacidad",
        lazy: async () => {
          const { PrivacidadPage } = await import(
            "@/pages/privacidad/privacidad-page"
          )
          return { Component: PrivacidadPage }
        },
      },
      {
        path: "mapa-sitio",
        lazy: async () => {
          const { MapaDelSitioPage } = await import(
            "@/pages/mapa-sitio/mapa-del-sitio-page"
          )
          return { Component: MapaDelSitioPage }
        },
      },
      {
        path: "*",
        lazy: async () => {
          const { NotFoundPage } = await import(
            "@/pages/not-found/not-found-page"
          )
          return { Component: NotFoundPage }
        },
      },
    ],
  },
])

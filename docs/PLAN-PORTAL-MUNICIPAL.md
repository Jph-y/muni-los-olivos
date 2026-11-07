# Plan del Portal Municipal de Los Olivos

> Documento de planificación del portal web de la **Municipalidad Distrital de Los Olivos (MDLO)**.
> Referencia de contenido: <https://www.gob.pe/munilosolivos>
> Objetivo: portal público con mejor diseño, datos basados en la web oficial y preparado para un backend futuro.

---

## 1. Estado actual del proyecto

- **React 19 + Vite 8 + TypeScript 6 + Tailwind CSS v4**
- **react-router 8.5.1** ya instalado (no hace falta `react-router-dom`)
- **shadcn/ui estilo `base-nova`** (usa `@base-ui/react`, no Radix)
- Componentes existentes: `button`, `theme-provider`, `lib/utils.ts` (`cn`)
- `index.html` aún genérico (`lang="en"`, título `vite-app`) → se actualizará a español
- Alias `@/*` configurado en `vite.config.ts` y `tsconfig.app.json`

---

## 2. Dependencias que faltan instalar

```bash
npm i react-hook-form zod @hookform/resolvers sonner embla-carousel-react date-fns
# opcional para tipografía distintiva de titulares:
npm i @fontsource-variable/newsreader
```

| Dependencia | Uso |
|---|---|
| `react-hook-form` | Manejo y estado de los formularios |
| `zod` | Esquemas de validación compartidos |
| `@hookform/resolvers` | Integración de Zod con React Hook Form |
| `sonner` | Toasts de éxito/error al enviar formularios |
| `embla-carousel-react` | Carrusel de noticias y campañas |
| `date-fns` | Formateo de fechas en noticias, normas y campañas |
| `@fontsource-variable/newsreader` *(opcional)* | Titulares serif institucionales |

**No instalar (por ahora):**

- `axios` → se usará `fetch` nativo.
- `next-themes` → Sonner se adapta al `ThemeProvider` existente.
- Redux/Zustand → no hay estado global complejo.
- `@tanstack/react-query` → se puede diferir hasta que exista backend real.
- `react-helmet` → basta un hook `useDocumentMeta`.

### Componentes shadcn a agregar

```bash
npx shadcn@latest add input textarea select checkbox radio-group label field sonner \
  card badge separator breadcrumb tabs accordion dialog sheet dropdown-menu \
  navigation-menu avatar skeleton alert alert-dialog tooltip popover table \
  pagination empty item scroll-area carousel spinner
```

> **Nota técnica:** evitar `@shadcn/form` porque su metadata arrastra `radix-ui`; con el estilo
> `base-nova` es preferible usar `field` + `react-hook-form` directamente. El wrapper de `sonner`
> importa `next-themes`, por lo que se adaptará al `useTheme` existente.

---

## 3. Arquitectura propuesta

```text
src/
├── app/
│   ├── router.tsx              # createBrowserRouter + páginas lazy
│   └── layout/                 # SiteHeader, SiteFooter, TopBar, MobileNav
├── pages/
│   ├── home/                   # Inicio
│   ├── institucional/          # La Municipalidad
│   ├── funcionarios/           # Directorio + detalle
│   ├── tramites/               # Listado + detalle
│   ├── noticias/               # Listado + detalle
│   ├── campanas/               # Listado + detalle
│   ├── normas/                 # Normas y documentos
│   ├── informes/               # Informes y publicaciones
│   ├── transparencia/          # Portal de transparencia
│   ├── sedes/                  # Sedes y contacto
│   ├── contacto/               # Formulario
│   ├── reclamos/               # Formulario
│   ├── mesa-partes/            # Formulario
│   ├── acceso-informacion/     # Formulario
│   ├── registro-visitas/       # Formulario
│   ├── convocatorias/          # Listado + postulación
│   ├── faq/                    # Preguntas frecuentes
│   ├── buscar/                 # Búsqueda global
│   ├── legal/                  # Privacidad y mapa del sitio
│   └── not-found/              # 404
├── components/
│   ├── ui/                     # shadcn
│   └── shared/                 # PageHeader, Breadcrumbs, SectionTitle, InfoCard, EmptyState
├── data/                       # Datos mock reales extraídos de gob.pe
│   ├── institucional.ts
│   ├── tramites.ts
│   ├── noticias.ts
│   ├── campanas.ts
│   ├── normas.ts
│   ├── funcionarios.ts
│   ├── sedes.ts
│   ├── convocatorias.ts
│   └── emergencias.ts
├── types/                      # Tipos por dominio
├── lib/
│   ├── validations/            # Schemas Zod
│   ├── api/client.ts           # Capa API mock preparada para backend
│   └── seo.ts                  # useDocumentMeta
├── hooks/
└── index.css                   # Tokens verde olivo + dorado
```

### Capa API preparada para backend real

`src/lib/api/client.ts`:

```ts
const USE_MOCK = true
const API_URL = import.meta.env.VITE_API_URL ?? ""

export async function submit<T>(endpoint: string, payload: T) {
  if (USE_MOCK) {
    console.group(`[MOCK] POST ${endpoint}`)
    console.log(JSON.stringify(payload, null, 2))
    console.groupEnd()
    await new Promise((resolve) => setTimeout(resolve, 900))
    return { ok: true, data: payload }
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Error ${response.status} al enviar ${endpoint}`)
  }

  return { ok: true, data: await response.json() }
}
```

Cada formulario llama a un servicio (`submitContacto`, `submitReclamo`, `submitMesaPartes`,
`submitAccesoInformacion`, `submitVisita`, `submitCAS`) que:

1. Valida con Zod antes de enviar.
2. Muestra `toast.loading` durante el envío.
3. Registra el payload en consola (`[MOCK] POST /...`).
4. Muestra `toast.success` o `toast.error`.
5. Limpia el formulario con `reset()` al terminar.

Para conectar el backend basta con cambiar `USE_MOCK` a `false` y definir `VITE_API_URL`.

---

## 4. Páginas: 26 rutas (21 base + 5 de detalle)

### Base (21)

| # | Ruta | Página |
|---|---|---|
| 1 | `/` | Inicio |
| 2 | `/institucional` | La Municipalidad (misión, visión, visión territorial, organigrama) |
| 3 | `/funcionarios` | Directorio de funcionarios (buscador) |
| 4 | `/tramites` | Trámites y servicios (filtros) |
| 5 | `/noticias` | Noticias |
| 6 | `/campanas` | Campañas y eventos |
| 7 | `/normas` | Normas y documentos legales (filtro por tipo) |
| 8 | `/informes` | Informes y publicaciones |
| 9 | `/transparencia` | Portal de transparencia |
| 10 | `/sedes` | Sedes, horarios, mapas y emergencias |
| 11 | `/contacto` | **Formulario** de contacto |
| 12 | `/libro-reclamaciones` | **Formulario** Libro de reclamaciones |
| 13 | `/mesa-de-partes` | **Formulario** Mesa de partes virtual |
| 14 | `/acceso-informacion` | **Formulario** Acceso a la información pública |
| 15 | `/registro-visitas` | **Formulario** Registro de visitas |
| 16 | `/convocatorias` | Convocatorias CAS |
| 17 | `/preguntas-frecuentes` | Preguntas frecuentes |
| 18 | `/buscar` | Búsqueda global |
| 19 | `/privacidad` | Política de privacidad |
| 20 | `/mapa-sitio` | Mapa del sitio |
| 21 | `/404` | Página no encontrada |

### Detalle dinámico (5)

| # | Ruta | Página |
|---|---|---|
| 22 | `/tramites/:slug` | Detalle de trámite |
| 23 | `/noticias/:slug` | Detalle de noticia |
| 24 | `/campanas/:slug` | Detalle de campaña |
| 25 | `/funcionarios/:id` | Perfil de funcionario |
| 26 | `/convocatorias/:id` | Detalle de convocatoria + postulación (formulario) |

---

## 5. Formularios y validaciones (6)

Todos comparten:

- `zodResolver` y errores por campo con `field`.
- Estado `isSubmitting` y botón deshabilitado.
- `toast.loading` → `toast.success` / `toast.error`.
- `console.log` del payload que se enviaría al backend.
- `reset()` al finalizar.

| Formulario | Campos principales | Validaciones |
|---|---|---|
| **Contacto** | nombre, email, teléfono, motivo, mensaje, aceptar política | nombre 3–80, email válido, teléfono `9XXXXXXXX`, mensaje 20–1000, checkbox `true` |
| **Libro de reclamaciones** | tipo/nº documento, nombres, domicilio, email, teléfono, bien/servicio, detalle, pedido, aceptar | DNI 8 dígitos / CE, email, teléfono, detalle ≥ 30, checkbox |
| **Mesa de partes** | tipo/nº doc, nombres, email, teléfono, asunto, tipo documento, folios, área destino, descripción, adjunto PDF, declaración jurada | asunto ≥ 5, folios > 0, descripción ≥ 20, PDF ≤ 10 MB, checkbox |
| **Acceso a información** | nombres, tipo/nº doc, email, teléfono, información solicitada, forma de entrega, aceptar | documento válido, email, teléfono, solicitud ≥ 30, checkbox |
| **Registro de visitas** | nombre, tipo/nº doc, email, teléfono, institución, funcionario, motivo, fecha, hora, aceptar | fecha ≥ hoy, motivo ≥ 10, funcionario obligatorio, checkbox |
| **Postulación CAS** | nombres, tipo/nº doc, email, teléfono, puesto, CV PDF, declaración jurada | documento/email/teléfono, puesto obligatorio, PDF ≤ 10 MB, checkbox |

### Reglas transversales sugeridas

- **DNI:** exactamente 8 dígitos numéricos.
- **CE / Pasaporte:** alfanumérico de 9 a 12 caracteres.
- **Teléfono Perú:** 9 dígitos iniciando en `9` (móvil) o formato fijo `(01) XXXXXXX`.
- **Email:** validación estándar de Zod.
- **Archivos:** solo PDF, máximo 10 MB, validado antes de enviar.
- **Fechas:** no anteriores al día actual en registro de visitas.
- **Términos/declaraciones:** `z.literal(true)` obligatorio.

---

## 6. Dirección visual (verde olivo + dorado)

- **Paleta:**
  - Primario olivo: `oklch(0.45 0.09 125)` aprox.
  - Acento dorado/ámbar: `oklch(0.75 0.14 85)` aprox.
  - Fondos marfil cálido y texto verde muy oscuro.
- **Modo oscuro:** opcional, con **claro por defecto**.
- **Tipografía:** Inter Variable para cuerpo + titulares serif (Newsreader) para dar carácter institucional.
- **Inicio:**
  - Hero con buscador de trámites y 4 accesos rápidos (Mesa de partes, Reclamos, Transparencia, Pagos).
  - Noticias destacadas, trámites más vistos, campañas, sedes y números de emergencia.
- **Header:**
  - Barra superior de utilidades.
  - Mega-menú: Trámites, Normas, Noticias, Institucional, Contacto.
  - Buscador y menú móvil en `sheet`.
- **Footer:** enlaces internos, plataformas web, contacto, redes sociales y aviso legal.
- **Accesibilidad:** skip-link, landmarks, foco visible, `aria-*` y contraste AA.

---

## 7. Orden de implementación

1. Instalar dependencias y componentes shadcn; definir tokens de diseño y actualizar `index.html` a español.
2. Crear layout (header/footer), router con lazy loading, scroll-to-top y breadcrumbs.
3. Definir tipos y datos mock reales extraídos de gob.pe.
4. Construir Inicio e institucional/funcionarios.
5. Construir listados y detalles (trámites, noticias, campañas, normas, informes, convocatorias).
6. Implementar capa API mock, schemas Zod y los 6 formularios con toast y log.
7. Construir sedes/contacto/transparencia/FAQ/búsqueda/legales/404.
8. Pulir responsive, modo oscuro, SEO (`useDocumentMeta`), accesibilidad y ejecutar `npm run lint && npm run typecheck && npm run build`.

---

## 8. Notas y riesgos

- Las imágenes de noticias y campañas están en el CDN de gob.pe: conviene **descargarlas a `public/images`** para evitar hotlinking.
- El sitio oficial indica que está "migrando"; se usará el contenido como snapshot y los datos mock tipados facilitarán su reemplazo.
- Al no existir backend, los archivos solo se validan en el cliente (tipo y tamaño) y se registra su nombre en consola.
- Evitar el componente `form` de shadcn en este proyecto para no incorporar `radix-ui` innecesariamente.
- Adaptar el wrapper de `sonner` al `ThemeProvider` existente en lugar de instalar `next-themes`.

---

## 9. Criterios de aceptación

- [ ] El portal compila con `npm run build` y pasa `npm run lint` y `npm run typecheck`.
- [ ] Las 26 rutas están navegables y son responsive.
- [ ] Los 6 formularios validan datos y muestran toast + payload en consola al enviar.
- [ ] La capa API permite activar el backend cambiando una sola constante.
- [ ] El diseño usa la paleta verde olivo + dorado y mantiene buen contraste.
- [ ] `index.html` está en español con título y metadatos del municipio.

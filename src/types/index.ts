export interface Institucional {
  queHacemos: string
  mision: string
  vision: string
  visionTerritorial: string
  organigramaUrl: string
}

export interface Tramite {
  id: number
  slug: string
  titulo: string
  resumen: string
  categoria: string
  costo: string
  plazo: string
  modalidad: "Virtual" | "Presencial" | "Mixta"
  requisitos: string[]
  pasos: string[]
  urlExterna?: string
}

export interface Noticia {
  id: number
  slug: string
  titulo: string
  resumen: string
  contenido: string[]
  categoria: string
  fecha: string
  imagen: string
}

export interface Campana {
  id: number
  slug: string
  titulo: string
  descripcion: string
  fechaInicio: string
  fechaFin?: string
  imagen: string
}

export type TipoNorma =
  | "Acuerdo de Concejo"
  | "Decreto de Alcaldía"
  | "Ordenanza"
  | "Ordenanza Municipal"
  | "Resolución de Alcaldía"
  | "Resolución de Gerencia Municipal"

export interface Norma {
  id: number
  titulo: string
  tipo: TipoNorma
  fecha: string
  resumen: string
  url?: string
}

export interface Informe {
  id: number
  titulo: string
  tipo: "Formato" | "Formulario"
  fecha: string
  descripcion: string
  url?: string
}

export interface Funcionario {
  id: number
  slug: string
  nombre: string
  cargo: string
  area: string
  perfil?: string
}

export interface Sede {
  id: number
  nombre: string
  direccion: string
  telefono: string
  horario?: string
  email?: string
  mapaUrl: string
}

export interface Emergencia {
  nombre: string
  telefono: string
  telefonoAlt?: string
}

export interface Convocatoria {
  id: number
  titulo: string
  area: string
  cargo: string
  remuneracion: string
  fechaInicio: string
  fechaFin: string
  estado: "Abierta" | "Cerrada"
  requisitos: string[]
  funciones: string[]
}

export type DocumentType = "DNI" | "CE" | "Pasaporte"

export interface ContactoPayload {
  nombre: string
  email: string
  telefono: string
  motivo: string
  mensaje: string
  aceptar: boolean
}

export interface ReclamoPayload {
  tipoDocumento: DocumentType
  numeroDocumento: string
  nombres: string
  domicilio: string
  email: string
  telefono: string
  bienServicio: string
  detalle: string
  pedido: string
  aceptar: boolean
}

export interface MesaPartesPayload {
  tipoDocumento: DocumentType
  numeroDocumento: string
  nombres: string
  email: string
  telefono: string
  asunto: string
  tipoDocumentoPresentado: string
  folios: number
  areaDestino: string
  descripcion: string
  archivo?: string
  declaracion: boolean
}

export interface AccesoInformacionPayload {
  nombres: string
  tipoDocumento: DocumentType
  numeroDocumento: string
  email: string
  telefono: string
  domicilio?: string
  informacionSolicitada: string
  formaEntrega: "Virtual" | "Presencial"
  aceptar: boolean
}

export interface VisitaPayload {
  nombre: string
  tipoDocumento: DocumentType
  numeroDocumento: string
  email: string
  telefono: string
  institucion?: string
  funcionario: string
  motivo: string
  fecha: string
  hora: string
  aceptar: boolean
}

export interface CasPayload {
  nombres: string
  tipoDocumento: DocumentType
  numeroDocumento: string
  email: string
  telefono: string
  puesto: string
  cv?: string
  declaracion: boolean
}

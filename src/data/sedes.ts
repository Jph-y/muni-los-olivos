import type { Emergencia, Sede } from "@/types"

export const sedes: Sede[] = [
  {
    id: 1,
    nombre: "Palacio Municipal",
    direccion:
      "Av. Carlos Izaguirre 813, Urb. Mercurio - Los Olivos - Lima - Lima - Perú",
    telefono: "(01) 321-4547",
    horario: "Lunes a viernes: 8:30 am a 6:00 pm · Sábado: 8:00 am a 1:00 pm",
    email: "munilosolivos@munilosolivos.gob.pe",
    mapaUrl: "https://maps.google.com/maps?daddr=-11.991723,-77.071118&ll=",
  },
  {
    id: 2,
    nombre: "Edificio Cielo",
    direccion:
      "Av. Universitaria 2202, Los Olivos 15302 - Los Olivos - Lima - Lima - Perú",
    telefono: "(01) 321-4547",
    mapaUrl: "https://maps.google.com/maps?daddr=-12.000386,-77.083491&ll=",
  },
  {
    id: 3,
    nombre: "Palacio de la Juventud",
    direccion:
      "Av. Universitaria, Cercado de Lima 15302 - Los Olivos - Lima - Lima - Perú",
    telefono: "(01) 321-4547",
    mapaUrl: "https://maps.google.com/maps?daddr=-12.003183,-77.082576&ll=",
  },
]

export const emergencias: Emergencia[] = [
  { nombre: "Comisaría de Laure Caller Ibérico", telefono: "(01) 528-7274" },
  { nombre: "Comisaría de Sol de Oro", telefono: "(01) 540-1190" },
  { nombre: "Comisaría de Pro", telefono: "(01) 533-3327" },
  {
    nombre: "Seguridad Ciudadana",
    telefono: "(01) 510-4230",
    telefonoAlt: "(01) 510-4233",
  },
  {
    nombre: "Central Telefónica de Cámaras",
    telefono: "(01) 510-4222",
    telefonoAlt: "(01) 510-4224",
  },
]

export const whatsappSerenazgo = "https://wa.me/937016501"

export const enlacesInteres = [
  {
    categoria: "Enlaces internos",
    items: [
      {
        label: "Convocatoria de Personal",
        href: "https://munilosolivos.gob.pe/muni1/index.php/servicios/convocatoria-cas",
      },
      {
        label: "Sistema de Control Interno (SCI)",
        href: "https://www.munilosolivos.gob.pe/sisce/",
      },
      {
        label: "Presupuesto Participativo",
        href: "https://www.munilosolivos.gob.pe/muni1/index.php?option=com_content&view=article&id=21",
      },
      {
        label: "Codisec",
        href: "https://munilosolivos.gob.pe/muni1/index.php?option=com_content&view=article&id=93",
      },
      {
        label: "Bienes para Baja RAEE",
        href: "http://portal.munilosolivos.gob.pe/muni1/index.php?option=com_content&view=article&id=1592",
      },
    ],
  },
  {
    categoria: "Atención al administrado",
    items: [
      {
        label: "Solicitud de Acceso a la Información Pública",
        href: "https://www.munilosolivos.gob.pe/inicio/images/stories/descargar/solicitud_de_acceso_a_la_informacio_publica.pdf",
      },
      {
        label: "Registro de Visitas a Funcionarios",
        href: "https://visitas.munilosolivos.gob.pe/",
      },
    ],
  },
  {
    categoria: "Plataformas web",
    items: [
      {
        label: "Mesa de Partes Virtual",
        href: "https://mesadepartes.munilosolivos.gob.pe/",
      },
      {
        label: "Plataforma web Tributos Municipales",
        href: "https://servicios.munilosolivos.gob.pe/pagosenlinea/public/",
      },
      {
        label: "Plataforma Web de Talleres Virtuales",
        href: "https://palacioenlinea.munilosolivos.gob.pe/public/auth/login",
      },
    ],
  },
]

import type { Convocatoria } from "@/types"

export const convocatorias: Convocatoria[] = [
  {
    id: 1,
    titulo: "CAS N.° 001-2025 - Analista de Sistemas",
    area: "Oficina General de Tecnología de la Información y Comunicaciones",
    cargo: "Analista de Sistemas",
    remuneracion: "S/ 3,500.00",
    fechaInicio: "2025-02-10",
    fechaFin: "2025-02-24",
    estado: "Abierta",
    requisitos: [
      "Título profesional en Ingeniería de Sistemas, Computación o afines.",
      "Experiencia mínima de 2 años en desarrollo de software.",
      "Conocimientos en bases de datos y soporte técnico.",
    ],
    funciones: [
      "Brindar soporte técnico a las áreas municipales.",
      "Administrar los sistemas de información institucionales.",
      "Diseñar reportes y automatizar procesos internos.",
    ],
  },
  {
    id: 2,
    titulo: "CAS N.° 002-2025 - Asistente Administrativo",
    area: "Gerencia Municipal",
    cargo: "Asistente Administrativo",
    remuneracion: "S/ 2,300.00",
    fechaInicio: "2025-02-12",
    fechaFin: "2025-02-26",
    estado: "Abierta",
    requisitos: [
      "Estudios técnicos o universitarios en Administración o afines.",
      "Experiencia mínima de 1 año en funciones administrativas.",
      "Manejo de herramientas de oficina.",
    ],
    funciones: [
      "Apoyar en la gestión documentaria de la gerencia.",
      "Atender consultas de los administrados.",
      "Elaborar reportes y cuadros de seguimiento.",
    ],
  },
  {
    id: 3,
    titulo: "CAS N.° 003-2025 - Sereno Municipal",
    area: "Gerencia de Seguridad Ciudadana",
    cargo: "Sereno Municipal",
    remuneracion: "S/ 1,900.00",
    fechaInicio: "2025-02-15",
    fechaFin: "2025-03-01",
    estado: "Abierta",
    requisitos: [
      "Secundaria completa.",
      "Libreta de servicio militar (deseable).",
      "Disponibilidad para turnos rotativos.",
    ],
    funciones: [
      "Realizar patrullaje preventivo en el distrito.",
      "Atender emergencias ciudadanas.",
      "Coordinar con la central de cámaras de seguridad.",
    ],
  },
]

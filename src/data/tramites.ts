import type { Tramite } from "@/types"

export const tramites: Tramite[] = [
  {
    id: 14082,
    slug: "mesa-de-partes",
    titulo: "Acceder a la mesa de partes de Los Olivos",
    resumen:
      "Si necesitas enviar documentos para realizar tus trámites, puedes hacerlo a través de la mesa de partes virtual de la municipalidad.",
    categoria: "Atención al ciudadano",
    costo: "Gratuito",
    plazo: "Hasta 24 horas hábiles",
    modalidad: "Virtual",
    requisitos: [
      "Documento Nacional de Identidad (DNI) vigente.",
      "Documento escaneado en formato PDF (máximo 10 MB).",
      "Correo electrónico activo para notificaciones.",
    ],
    pasos: [
      "Ingresa a la mesa de partes virtual con tu DNI.",
      "Selecciona el tipo de documento y el área destinataria.",
      "Adjunta el documento en formato PDF.",
      "Registra tu solicitud y guarda el número de expediente.",
    ],
    urlExterna: "https://mesadepartes.munilosolivos.gob.pe/",
  },
  {
    id: 14031,
    slug: "tramitar-divorcio",
    titulo: "Tramitar divorcio en la Municipalidad Distrital de Los Olivos",
    resumen:
      "Si deseas disolver tu vínculo matrimonial, puedes hacerlo a través del procedimiento de divorcio municipal cuando ambas partes están de acuerdo.",
    categoria: "Registro civil",
    costo: "Según tarifario vigente",
    plazo: "Hasta 30 días hábiles",
    modalidad: "Presencial",
    requisitos: [
      "Copia certificada del acta de matrimonio.",
      "DNI vigente de ambos cónyuges.",
      "Solicitud de divorcio firmada por ambas partes.",
      "Certificado de domicilio.",
      "Pago de derechos según tarifario.",
    ],
    pasos: [
      "Presenta la solicitud en mesa de partes.",
      "La municipalidad verifica la documentación.",
      "Se programa la audiencia de conciliación.",
      "Se emite la resolución de divorcio.",
    ],
  },
  {
    id: 14045,
    slug: "separacion-convencional",
    titulo: "Solicitar separación convencional",
    resumen:
      "Es la primera etapa para conseguir tu divorcio rápido municipal. Para iniciarlo, ambos cónyuges deben estar de acuerdo.",
    categoria: "Registro civil",
    costo: "Según tarifario vigente",
    plazo: "Hasta 15 días hábiles",
    modalidad: "Presencial",
    requisitos: [
      "Acta de matrimonio certificada.",
      "DNI de ambos cónyuges.",
      "Solicitud firmada por ambas partes.",
      "Pago de derechos.",
    ],
    pasos: [
      "Presenta la solicitud conjunta.",
      "Se realiza la audiencia de separación convencional.",
      "Recibe la constancia de separación.",
    ],
  },
  {
    id: 14046,
    slug: "divorcio-ulterior",
    titulo: "Solicitar divorcio ulterior",
    resumen:
      "Esta es la última etapa para conseguir tu divorcio rápido municipal y disolver definitivamente el vínculo matrimonial.",
    categoria: "Registro civil",
    costo: "Según tarifario vigente",
    plazo: "Hasta 15 días hábiles",
    modalidad: "Presencial",
    requisitos: [
      "Constancia de separación convencional.",
      "Acta de matrimonio certificada.",
      "DNI vigente de ambos cónyuges.",
      "Pago de derechos.",
    ],
    pasos: [
      "Presenta la solicitud de divorcio ulterior.",
      "La municipalidad verifica los antecedentes.",
      "Se emite la resolución de divorcio.",
    ],
  },
  {
    id: 14025,
    slug: "contraer-matrimonio-civil",
    titulo: "Contraer matrimonio civil",
    resumen:
      "Si eres mayor de edad y deseas casarte por matrimonio civil con tu pareja, debes solicitarlo a la municipalidad de tu distrito.",
    categoria: "Registro civil",
    costo: "Según tarifario vigente",
    plazo: "Hasta 10 días hábiles",
    modalidad: "Presencial",
    requisitos: [
      "DNI vigente de ambos contrayentes.",
      "Certificado de nacimiento de cada contrayente.",
      "Certificado domiciliario.",
      "Declaración jurada de estado civil.",
      "Pago de derechos.",
    ],
    pasos: [
      "Presenta la solicitud de matrimonio civil.",
      "La municipalidad publica el aviso de matrimonio.",
      "Se confirma la fecha y hora de la ceremonia.",
      "Se celebra el matrimonio y se firma el acta.",
    ],
  },
  {
    id: 21198,
    slug: "licencia-funcionamiento-riesgo-bajo-medio",
    titulo: "Obtener licencia de funcionamiento para negocios de riesgo bajo o medio",
    resumen:
      "Si la municipalidad clasificó tu negocio como de riesgo bajo o medio, puedes obtener tu licencia de funcionamiento.",
    categoria: "Licencias y permisos",
    costo: "Según tarifario vigente",
    plazo: "Hasta 15 días hábiles",
    modalidad: "Mixta",
    requisitos: [
      "Solicitud de licencia de funcionamiento.",
      "DNI del titular o representante legal.",
      "Vigencia de poder si es persona jurídica.",
      "Declaración jurada de condiciones de seguridad.",
      "Croquis del establecimiento.",
      "Pago de derechos.",
    ],
    pasos: [
      "Presenta la solicitud con los requisitos.",
      "La municipalidad verifica la zonificación.",
      "Se realiza la inspección cuando corresponde.",
      "Recibe la licencia de funcionamiento.",
    ],
  },
  {
    id: 21199,
    slug: "licencia-funcionamiento-riesgo-alto",
    titulo: "Obtener licencia de funcionamiento para negocios de riesgo alto o muy alto",
    resumen:
      "Si tu negocio fue clasificado con riesgo alto o muy alto, requiere una Inspección Técnica de Seguridad en Edificaciones (ITSE).",
    categoria: "Licencias y permisos",
    costo: "Según tarifario vigente",
    plazo: "Hasta 30 días hábiles",
    modalidad: "Mixta",
    requisitos: [
      "Solicitud de licencia de funcionamiento.",
      "DNI del titular o representante legal.",
      "Vigencia de poder si es persona jurídica.",
      "Certificado de ITSE vigente.",
      "Declaración jurada de condiciones de seguridad.",
      "Croquis del establecimiento.",
    ],
    pasos: [
      "Solicita la Inspección Técnica de Seguridad en Edificaciones.",
      "Presenta la solicitud de licencia con el certificado ITSE.",
      "La municipalidad evalúa el expediente.",
      "Recibe la licencia de funcionamiento.",
    ],
  },
  {
    id: 9665,
    slug: "beneficios-tributarios-cti",
    titulo: "Acceder a beneficios tributarios en ciencia, tecnología e innovación (CTI)",
    resumen:
      "Es un beneficio tributario que permite otorgar una deducción adicional en la Declaración Anual de Impuesto a la Renta por inversiones en CTI.",
    categoria: "Tributos",
    costo: "Gratuito",
    plazo: "Según convocatoria",
    modalidad: "Virtual",
    requisitos: [
      "Proyecto de investigación, desarrollo o innovación elegible.",
      "Documentación técnica del proyecto.",
      "Registro en la plataforma de CONCYTEC.",
    ],
    pasos: [
      "Verifica los requisitos en la plataforma de CONCYTEC.",
      "Registra tu proyecto en el sistema.",
      "Presenta la solicitud de calificación.",
      "Recibe la aprobación del beneficio.",
    ],
    urlExterna:
      "https://beneficiostributarios.concytec.gob.pe/sistemaBeneficiosTributarios/Login.xhtml",
  },
  {
    id: 7946,
    slug: "servicios-online-seguridad",
    titulo: "Acceder a servicios online de seguridad en Los Olivos",
    resumen:
      "Si eres vecino del distrito de Los Olivos, puedes descargar la aplicación de seguridad ciudadana y reportar incidentes.",
    categoria: "Seguridad ciudadana",
    costo: "Gratuito",
    plazo: "Inmediato",
    modalidad: "Virtual",
    requisitos: [
      "Teléfono móvil con conexión a internet.",
      "Datos personales registrados en la aplicación.",
    ],
    pasos: [
      "Descarga la aplicación oficial de seguridad ciudadana.",
      "Registra tus datos y dirección.",
      "Reporta incidentes en tiempo real.",
    ],
  },
]

export const categoriasTramites = [
  "Todas",
  ...Array.from(new Set(tramites.map((tramite) => tramite.categoria))),
]

import { z } from "zod"

const docTypeEnum = z.enum(["DNI", "CE", "Pasaporte"])
const phoneRegex = /^9\d{8}$/
const dniRegex = /^\d{8}$/
const otherDocRegex = /^[A-Za-z0-9]{9,12}$/

const accepted = (message: string) =>
  z.boolean().refine((value) => value === true, { message })

function validateDocumento(
  tipo: "DNI" | "CE" | "Pasaporte",
  numero: string
): string | null {
  if (tipo === "DNI" && !dniRegex.test(numero)) {
    return "El DNI debe tener exactamente 8 dígitos."
  }
  if (tipo !== "DNI" && !otherDocRegex.test(numero)) {
    return "El número de documento debe tener entre 9 y 12 caracteres alfanuméricos."
  }
  return null
}

export const contactoSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(3, "Ingresa tu nombre completo (mínimo 3 caracteres).")
    .max(80, "El nombre no debe superar los 80 caracteres."),
  email: z.string().trim().email("Ingresa un correo electrónico válido."),
  telefono: z
    .string()
    .trim()
    .regex(phoneRegex, "Ingresa un celular de 9 dígitos que empiece con 9."),
  motivo: z.string().min(1, "Selecciona un motivo de contacto."),
  mensaje: z
    .string()
    .trim()
    .min(20, "El mensaje debe tener al menos 20 caracteres.")
    .max(1000, "El mensaje no debe superar los 1000 caracteres."),
  aceptar: accepted("Debes aceptar la política de privacidad."),
})

export const reclamoSchema = z
  .object({
    tipoDocumento: docTypeEnum,
    numeroDocumento: z.string().trim().min(1, "Ingresa tu número de documento."),
    nombres: z
      .string()
      .trim()
      .min(3, "Ingresa tus nombres y apellidos completos.")
      .max(120, "El nombre no debe superar los 120 caracteres."),
    domicilio: z
      .string()
      .trim()
      .min(5, "Ingresa tu domicilio completo.")
      .max(150, "El domicilio no debe superar los 150 caracteres."),
    email: z.string().trim().email("Ingresa un correo electrónico válido."),
    telefono: z
      .string()
      .trim()
      .regex(phoneRegex, "Ingresa un celular de 9 dígitos que empiece con 9."),
    bienServicio: z
      .string()
      .trim()
      .min(3, "Describe el bien o servicio materia del reclamo."),
    detalle: z
      .string()
      .trim()
      .min(30, "El detalle del reclamo debe tener al menos 30 caracteres.")
      .max(1500, "El detalle no debe superar los 1500 caracteres."),
    pedido: z
      .string()
      .trim()
      .min(5, "Indica el pedido o solución que esperas.")
      .max(500, "El pedido no debe superar los 500 caracteres."),
    aceptar: accepted("Debes aceptar las condiciones del libro de reclamaciones."),
  })
  .superRefine((data, ctx) => {
    const error = validateDocumento(data.tipoDocumento, data.numeroDocumento)
    if (error) {
      ctx.addIssue({
        code: "custom",
        path: ["numeroDocumento"],
        message: error,
      })
    }
  })

export const mesaPartesSchema = z
  .object({
    tipoDocumento: docTypeEnum,
    numeroDocumento: z.string().trim().min(1, "Ingresa tu número de documento."),
    nombres: z
      .string()
      .trim()
      .min(3, "Ingresa tus nombres y apellidos completos.")
      .max(120, "El nombre no debe superar los 120 caracteres."),
    email: z.string().trim().email("Ingresa un correo electrónico válido."),
    telefono: z
      .string()
      .trim()
      .regex(phoneRegex, "Ingresa un celular de 9 dígitos que empiece con 9."),
    asunto: z
      .string()
      .trim()
      .min(5, "El asunto debe tener al menos 5 caracteres.")
      .max(150, "El asunto no debe superar los 150 caracteres."),
    tipoDocumentoPresentado: z
      .string()
      .min(1, "Selecciona el tipo de documento a presentar."),
    folios: z
      .number({ error: "Ingresa el número de folios." })
      .int("El número de folios debe ser entero.")
      .min(1, "El número de folios debe ser mayor a cero."),
    areaDestino: z.string().min(1, "Selecciona el área destinataria."),
    descripcion: z
      .string()
      .trim()
      .min(20, "La descripción debe tener al menos 20 caracteres.")
      .max(1000, "La descripción no debe superar los 1000 caracteres."),
    archivo: z.string().min(1, "Adjunta tu documento en formato PDF."),
    declaracion: accepted("Debes aceptar la declaración jurada."),
  })
  .superRefine((data, ctx) => {
    const error = validateDocumento(data.tipoDocumento, data.numeroDocumento)
    if (error) {
      ctx.addIssue({
        code: "custom",
        path: ["numeroDocumento"],
        message: error,
      })
    }
  })

export const accesoInformacionSchema = z
  .object({
    nombres: z
      .string()
      .trim()
      .min(3, "Ingresa tus nombres y apellidos completos.")
      .max(120, "El nombre no debe superar los 120 caracteres."),
    tipoDocumento: docTypeEnum,
    numeroDocumento: z.string().trim().min(1, "Ingresa tu número de documento."),
    email: z.string().trim().email("Ingresa un correo electrónico válido."),
    telefono: z
      .string()
      .trim()
      .regex(phoneRegex, "Ingresa un celular de 9 dígitos que empiece con 9."),
    domicilio: z.string().trim().max(150).optional(),
    informacionSolicitada: z
      .string()
      .trim()
      .min(30, "Detalla la información solicitada (mínimo 30 caracteres).")
      .max(1500, "La solicitud no debe superar los 1500 caracteres."),
    formaEntrega: z.enum(["Virtual", "Presencial"], {
      message: "Selecciona la forma de entrega.",
    }),
    aceptar: accepted("Debes aceptar la declaración de veracidad."),
  })
  .superRefine((data, ctx) => {
    const error = validateDocumento(data.tipoDocumento, data.numeroDocumento)
    if (error) {
      ctx.addIssue({
        code: "custom",
        path: ["numeroDocumento"],
        message: error,
      })
    }
  })

export const visitaSchema = z
  .object({
    nombre: z
      .string()
      .trim()
      .min(3, "Ingresa el nombre del visitante.")
      .max(120, "El nombre no debe superar los 120 caracteres."),
    tipoDocumento: docTypeEnum,
    numeroDocumento: z.string().trim().min(1, "Ingresa tu número de documento."),
    email: z.string().trim().email("Ingresa un correo electrónico válido."),
    telefono: z
      .string()
      .trim()
      .regex(phoneRegex, "Ingresa un celular de 9 dígitos que empiece con 9."),
    institucion: z.string().trim().max(120).optional(),
    funcionario: z.string().min(1, "Selecciona al funcionario a visitar."),
    motivo: z
      .string()
      .trim()
      .min(10, "El motivo debe tener al menos 10 caracteres.")
      .max(500, "El motivo no debe superar los 500 caracteres."),
    fecha: z
      .string()
      .min(1, "Selecciona la fecha de la visita.")
      .refine(
        (value) => {
          const selected = new Date(`${value}T00:00:00`)
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          return !Number.isNaN(selected.getTime()) && selected >= today
        },
        { message: "Selecciona una fecha válida desde hoy." }
      ),
    hora: z.string().min(1, "Selecciona la hora de la visita."),
    aceptar: accepted("Debes aceptar las condiciones de la visita."),
  })
  .superRefine((data, ctx) => {
    const error = validateDocumento(data.tipoDocumento, data.numeroDocumento)
    if (error) {
      ctx.addIssue({
        code: "custom",
        path: ["numeroDocumento"],
        message: error,
      })
    }
  })

export const casSchema = z
  .object({
    nombres: z
      .string()
      .trim()
      .min(3, "Ingresa tus nombres y apellidos completos.")
      .max(120, "El nombre no debe superar los 120 caracteres."),
    tipoDocumento: docTypeEnum,
    numeroDocumento: z.string().trim().min(1, "Ingresa tu número de documento."),
    email: z.string().trim().email("Ingresa un correo electrónico válido."),
    telefono: z
      .string()
      .trim()
      .regex(phoneRegex, "Ingresa un celular de 9 dígitos que empiece con 9."),
    puesto: z.string().min(1, "Selecciona el puesto al que postulas."),
    cv: z.string().min(1, "Adjunta tu CV en formato PDF."),
    declaracion: accepted("Debes aceptar la declaración jurada."),
  })
  .superRefine((data, ctx) => {
    const error = validateDocumento(data.tipoDocumento, data.numeroDocumento)
    if (error) {
      ctx.addIssue({
        code: "custom",
        path: ["numeroDocumento"],
        message: error,
      })
    }
  })

export type ContactoFormValues = z.infer<typeof contactoSchema>
export type ReclamoFormValues = z.infer<typeof reclamoSchema>
export type MesaPartesFormValues = z.infer<typeof mesaPartesSchema>
export type AccesoInformacionFormValues = z.infer<typeof accesoInformacionSchema>
export type VisitaFormValues = z.infer<typeof visitaSchema>
export type CasFormValues = z.infer<typeof casSchema>

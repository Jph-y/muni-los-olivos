import { format } from "date-fns"
import { es } from "date-fns/locale"

export function formatDate(value: string | Date) {
  const date = typeof value === "string" ? new Date(value) : value
  if (Number.isNaN(date.getTime())) {
    return "Fecha no disponible"
  }
  return format(date, "d 'de' MMMM 'de' yyyy", { locale: es })
}

export function formatDateTime(value: string | Date) {
  const date = typeof value === "string" ? new Date(value) : value
  if (Number.isNaN(date.getTime())) {
    return "Fecha no disponible"
  }
  return format(date, "d 'de' MMMM 'de' yyyy, h:mm a", { locale: es })
}

export function formatShortDate(value: string | Date) {
  const date = typeof value === "string" ? new Date(value) : value
  if (Number.isNaN(date.getTime())) {
    return ""
  }
  return format(date, "dd/MM/yyyy", { locale: es })
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

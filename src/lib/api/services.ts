import { submit, type SubmitResponse } from "@/lib/api/client"
import type {
  AccesoInformacionPayload,
  CasPayload,
  ContactoPayload,
  MesaPartesPayload,
  ReclamoPayload,
  VisitaPayload,
} from "@/types"

export function submitContacto(payload: ContactoPayload) {
  return submit<ContactoPayload>("/contacto", payload)
}

export function submitReclamo(payload: ReclamoPayload) {
  return submit<ReclamoPayload>("/libro-reclamaciones", payload)
}

export function submitMesaPartes(payload: MesaPartesPayload) {
  return submit<MesaPartesPayload>("/mesa-de-partes", payload)
}

export function submitAccesoInformacion(payload: AccesoInformacionPayload) {
  return submit<AccesoInformacionPayload>("/acceso-informacion", payload)
}

export function submitVisita(payload: VisitaPayload) {
  return submit<VisitaPayload>("/registro-visitas", payload)
}

export function submitCAS(
  convocatoriaId: number,
  payload: CasPayload
): Promise<SubmitResponse<CasPayload>> {
  return submit<CasPayload>(
    `/convocatorias/${convocatoriaId}/postulacion`,
    payload
  )
}

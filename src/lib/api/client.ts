const API_URL = import.meta.env.VITE_API_URL ?? ""
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false"

export interface SubmitResponse<T> {
  ok: true
  message: string
  ticket: string
  data: T
}

function createTicket() {
  const now = new Date()
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
    now.getDate()
  ).padStart(2, "0")}`
  const random = Math.floor(100000 + Math.random() * 900000)
  return `MDLO-${stamp}-${random}`
}

function logMockPayload<T>(endpoint: string, payload: T) {
  console.group(`[MOCK] POST ${endpoint}`)
  console.log("Payload que se enviaría al backend:")
  console.log(JSON.stringify(payload, null, 2))
  console.groupEnd()
}

export async function submit<T>(
  endpoint: string,
  payload: T
): Promise<SubmitResponse<T>> {
  if (USE_MOCK) {
    logMockPayload(endpoint, payload)
    await new Promise((resolve) => setTimeout(resolve, 900))
    return {
      ok: true,
      message: "Solicitud registrada correctamente (modo simulación).",
      ticket: createTicket(),
      data: payload,
    }
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Error ${response.status} al enviar la solicitud.`)
  }

  const data = (await response.json()) as T

  return {
    ok: true,
    message: "Solicitud registrada correctamente.",
    ticket: createTicket(),
    data,
  }
}

export const apiConfig = {
  useMock: USE_MOCK,
  apiUrl: API_URL || "(no configurada)",
}

import { toast } from "sonner"

import type { SubmitResponse } from "@/lib/api/client"

export async function submitWithToast<T>(
  promise: Promise<SubmitResponse<T>>
): Promise<SubmitResponse<T> | undefined> {
  try {
    return await toast
      .promise(promise, {
        loading: "Enviando solicitud...",
        success: (response) =>
          `Solicitud registrada. Código: ${response.ticket}`,
        error: (error) =>
          error instanceof Error
            ? error.message
            : "No se pudo registrar la solicitud. Intenta nuevamente.",
      })
      .unwrap()
  } catch {
    return undefined
  }
}

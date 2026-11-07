import { useId, useRef } from "react"
import { FileText, Upload, X } from "lucide-react"

import { FormField } from "@/components/forms/form-field"
import { Button } from "@/components/ui/button"

interface FileFieldProps {
  label: string
  accept?: string
  maxSizeMb?: number
  error?: string
  filename?: string
  required?: boolean
  onFileSelected: (file: File | null) => void
  onError: (message: string) => void
}

const MAX_DEFAULT = 10

export function FileField({
  label,
  accept = "application/pdf",
  maxSizeMb = MAX_DEFAULT,
  error,
  filename,
  required,
  onFileSelected,
  onError,
}: FileFieldProps) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null

    if (!file) {
      onFileSelected(null)
      return
    }

    if (accept === "application/pdf" && file.type !== "application/pdf") {
      onError("El archivo debe estar en formato PDF.")
      event.target.value = ""
      return
    }

    if (file.size > maxSizeMb * 1024 * 1024) {
      onError(`El archivo no debe superar los ${maxSizeMb} MB.`)
      event.target.value = ""
      return
    }

    onFileSelected(file)
  }

  const clear = () => {
    if (inputRef.current) inputRef.current.value = ""
    onFileSelected(null)
  }

  return (
    <FormField label={label} htmlFor={inputId} error={error} required={required}>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={handleChange}
      />
      {filename ? (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-input bg-secondary/40 px-3 py-2 text-sm">
          <span className="flex min-w-0 items-center gap-2">
            <FileText className="size-4 shrink-0 text-primary" />
            <span className="truncate">{filename}</span>
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Quitar archivo"
            onClick={clear}
          >
            <X />
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          className="h-10 justify-start gap-2"
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="size-4" />
          Seleccionar archivo PDF
        </Button>
      )}
      <p className="text-xs text-muted-foreground">
        Formato PDF, máximo {maxSizeMb} MB.
      </p>
    </FormField>
  )
}

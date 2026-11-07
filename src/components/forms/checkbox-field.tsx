import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form"
import { Info } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import { FieldError } from "@/components/ui/field"

interface CheckboxFieldProps<T extends FieldValues> {
  control: Control<T>
  name: FieldPath<T>
  label: string
  error?: string
  tooltip?: string
}

export function CheckboxField<T extends FieldValues>({
  control,
  name,
  label,
  error,
}: CheckboxFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-col gap-1.5">
          <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
            <Checkbox
              checked={Boolean(field.value)}
              onCheckedChange={(checked) => field.onChange(checked)}
              aria-invalid={Boolean(error)}
              className="mt-0.5"
            />
            <span>{label}</span>
          </label>
          {error && <FieldError>{error}</FieldError>}
        </div>
      )}
    />
  )
}

export function ConsentNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-2 rounded-lg bg-secondary/60 p-3 text-xs text-muted-foreground">
      <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}

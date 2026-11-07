import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form"

import { FormField } from "@/components/forms/form-field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Option {
  value: string
  label: string
}

interface SelectFieldProps<T extends FieldValues> {
  control: Control<T>
  name: FieldPath<T>
  label: string
  placeholder?: string
  options: Option[]
  error?: string
  description?: string
  required?: boolean
}

export function SelectField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Selecciona una opción",
  options,
  error,
  description,
  required,
}: SelectFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormField
          label={label}
          error={error}
          description={description}
          required={required}
        >
          <Select
            value={field.value ?? ""}
            onValueChange={(value) => field.onChange(value)}
          >
            <SelectTrigger
              className="h-10 w-full"
              aria-invalid={Boolean(error)}
              onBlur={field.onBlur}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      )}
    />
  )
}

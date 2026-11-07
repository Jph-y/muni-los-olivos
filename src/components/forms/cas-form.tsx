import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Send } from "lucide-react"

import { FormField } from "@/components/forms/form-field"
import { SelectField } from "@/components/forms/select-field"
import { CheckboxField, ConsentNote } from "@/components/forms/checkbox-field"
import { FileField } from "@/components/forms/file-field"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import type { Convocatoria } from "@/types"
import { submitCAS } from "@/lib/api/services"
import { submitWithToast } from "@/lib/toast"
import { casSchema, type CasFormValues } from "@/lib/validations/schemas"

const documentos = [
  { value: "DNI", label: "DNI" },
  { value: "CE", label: "Carné de extranjería" },
  { value: "Pasaporte", label: "Pasaporte" },
]

export function CasForm({ convocatoria }: { convocatoria: Convocatoria }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CasFormValues>({
    resolver: zodResolver(casSchema),
    defaultValues: {
      nombres: "",
      tipoDocumento: "DNI",
      numeroDocumento: "",
      email: "",
      telefono: "",
      puesto: convocatoria.titulo,
      cv: "",
      declaracion: false,
    },
  })

  useEffect(() => {
    setValue("puesto", convocatoria.titulo)
  }, [convocatoria.titulo, setValue])

  const cv = watch("cv")

  const onSubmit = handleSubmit(async (values) => {
    const result = await submitWithToast(submitCAS(convocatoria.id, values))
    if (result) {
      reset({ ...values, nombres: "", numeroDocumento: "", email: "", telefono: "", cv: "", declaracion: false })
    }
  })

  return (
    <Card>
      <CardContent className="p-6 sm:p-8">
        <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              label="Nombres y apellidos"
              htmlFor="nombres"
              error={errors.nombres?.message}
              required
            >
              <Input
                id="nombres"
                autoComplete="name"
                aria-invalid={Boolean(errors.nombres)}
                {...register("nombres")}
              />
            </FormField>
            <SelectField
              control={control}
              name="tipoDocumento"
              label="Tipo de documento"
              options={documentos}
              error={errors.tipoDocumento?.message}
              required
            />
            <FormField
              label="Número de documento"
              htmlFor="numeroDocumento"
              error={errors.numeroDocumento?.message}
              required
            >
              <Input
                id="numeroDocumento"
                inputMode="numeric"
                placeholder="12345678"
                aria-invalid={Boolean(errors.numeroDocumento)}
                {...register("numeroDocumento")}
              />
            </FormField>
            <FormField
              label="Correo electrónico"
              htmlFor="email"
              error={errors.email?.message}
              required
            >
              <Input
                id="email"
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                {...register("email")}
              />
            </FormField>
            <FormField
              label="Teléfono celular"
              htmlFor="telefono"
              error={errors.telefono?.message}
              required
            >
              <Input
                id="telefono"
                type="tel"
                inputMode="numeric"
                placeholder="987654321"
                maxLength={9}
                aria-invalid={Boolean(errors.telefono)}
                {...register("telefono")}
              />
            </FormField>
            <FormField
              label="Puesto postulado"
              htmlFor="puesto"
              error={errors.puesto?.message}
              required
            >
              <Input
                id="puesto"
                readOnly
                className="bg-secondary/50"
                aria-invalid={Boolean(errors.puesto)}
                {...register("puesto")}
              />
            </FormField>
          </div>

          <FileField
            label="Curriculum vitae (PDF)"
            filename={cv || undefined}
            error={errors.cv?.message}
            required
            onFileSelected={(file) => {
              setValue("cv", file?.name ?? "", { shouldValidate: true })
              clearErrors("cv")
            }}
            onError={(message) => setError("cv", { type: "manual", message })}
          />

          <CheckboxField
            control={control}
            name="declaracion"
            label="Declaro que cumplo con los requisitos del puesto y que la información presentada es veraz."
            error={errors.declaracion?.message}
          />

          <ConsentNote>
            En modo demostración, el nombre del archivo y los datos de
            postulación se muestran en la consola del navegador. En producción se
            enviarán al backend del proceso CAS.
          </ConsentNote>

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? <Spinner /> : <Send />}
              {isSubmitting ? "Enviando..." : "Enviar postulación"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Send } from "lucide-react"

import { FormField } from "@/components/forms/form-field"
import { SelectField } from "@/components/forms/select-field"
import { CheckboxField, ConsentNote } from "@/components/forms/checkbox-field"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { funcionarios } from "@/data/funcionarios"
import { submitVisita } from "@/lib/api/services"
import { submitWithToast } from "@/lib/toast"
import { visitaSchema, type VisitaFormValues } from "@/lib/validations/schemas"

const documentos = [
  { value: "DNI", label: "DNI" },
  { value: "CE", label: "Carné de extranjería" },
  { value: "Pasaporte", label: "Pasaporte" },
]

const funcionarioOptions = [
  { value: "cualquiera", label: "No especifica / atención general" },
  ...funcionarios.map((funcionario) => ({
    value: funcionario.slug,
    label: `${funcionario.nombre} — ${funcionario.area}`,
  })),
]

const horas = Array.from({ length: 10 }, (_, index) => {
  const hour = 8 + index
  return {
    value: `${String(hour).padStart(2, "0")}:00`,
    label: `${String(hour).padStart(2, "0")}:00 hrs`,
  }
})

function todayISO() {
  const now = new Date()
  const offset = now.getTimezoneOffset()
  return new Date(now.getTime() - offset * 60 * 1000)
    .toISOString()
    .split("T")[0]
}

export function VisitaForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<VisitaFormValues>({
    resolver: zodResolver(visitaSchema),
    defaultValues: {
      nombre: "",
      tipoDocumento: "DNI",
      numeroDocumento: "",
      email: "",
      telefono: "",
      institucion: "",
      funcionario: "",
      motivo: "",
      fecha: "",
      hora: "",
      aceptar: false,
    },
  })

  const onSubmit = handleSubmit(async (values) => {
    const result = await submitWithToast(submitVisita(values))
    if (result) {
      reset()
    }
  })

  return (
    <Card>
      <CardContent className="p-6 sm:p-8">
        <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              label="Nombre del visitante"
              htmlFor="nombre"
              error={errors.nombre?.message}
              required
            >
              <Input
                id="nombre"
                autoComplete="name"
                aria-invalid={Boolean(errors.nombre)}
                {...register("nombre")}
              />
            </FormField>
            <FormField
              label="Institución o empresa (opcional)"
              htmlFor="institucion"
              error={errors.institucion?.message}
            >
              <Input
                id="institucion"
                autoComplete="organization"
                aria-invalid={Boolean(errors.institucion)}
                {...register("institucion")}
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
          </div>

          <SelectField
            control={control}
            name="funcionario"
            label="Funcionario a visitar"
            options={funcionarioOptions}
            error={errors.funcionario?.message}
            required
          />

          <FormField
            label="Motivo de la visita"
            htmlFor="motivo"
            error={errors.motivo?.message}
            required
          >
            <Textarea
              id="motivo"
              rows={3}
              aria-invalid={Boolean(errors.motivo)}
              {...register("motivo")}
            />
          </FormField>

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              label="Fecha de la visita"
              htmlFor="fecha"
              error={errors.fecha?.message}
              required
            >
              <Input
                id="fecha"
                type="date"
                min={todayISO()}
                aria-invalid={Boolean(errors.fecha)}
                {...register("fecha")}
              />
            </FormField>
            <SelectField
              control={control}
              name="hora"
              label="Hora de la visita"
              options={horas}
              error={errors.hora?.message}
              required
            />
          </div>

          <CheckboxField
            control={control}
            name="aceptar"
            label="Acepto las condiciones de acceso a las instalaciones municipales y el registro de mi visita."
            error={errors.aceptar?.message}
          />

          <ConsentNote>
            El registro de visitas permite mantener un control de acceso a las
            instalaciones municipales. En modo demostración, los datos se
            muestran en la consola del navegador.
          </ConsentNote>

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? <Spinner /> : <Send />}
              {isSubmitting ? "Registrando..." : "Registrar visita"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

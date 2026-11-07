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
import { submitAccesoInformacion } from "@/lib/api/services"
import { submitWithToast } from "@/lib/toast"
import {
  accesoInformacionSchema,
  type AccesoInformacionFormValues,
} from "@/lib/validations/schemas"

const documentos = [
  { value: "DNI", label: "DNI" },
  { value: "CE", label: "Carné de extranjería" },
  { value: "Pasaporte", label: "Pasaporte" },
]

const formasEntrega = [
  { value: "Virtual", label: "Virtual (correo electrónico)" },
  { value: "Presencial", label: "Presencial (mesa de partes)" },
]

export function AccesoInformacionForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AccesoInformacionFormValues>({
    resolver: zodResolver(accesoInformacionSchema),
    defaultValues: {
      nombres: "",
      tipoDocumento: "DNI",
      numeroDocumento: "",
      email: "",
      telefono: "",
      domicilio: "",
      informacionSolicitada: "",
      formaEntrega: "Virtual",
      aceptar: false,
    },
  })

  const onSubmit = handleSubmit(async (values) => {
    const result = await submitWithToast(submitAccesoInformacion(values))
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
              label="Domicilio (opcional)"
              htmlFor="domicilio"
              error={errors.domicilio?.message}
            >
              <Input
                id="domicilio"
                autoComplete="street-address"
                aria-invalid={Boolean(errors.domicilio)}
                {...register("domicilio")}
              />
            </FormField>
          </div>

          <FormField
            label="Información solicitada"
            htmlFor="informacionSolicitada"
            error={errors.informacionSolicitada?.message}
            description="Describe de forma clara y precisa la información que requieres."
            required
          >
            <Textarea
              id="informacionSolicitada"
              rows={6}
              aria-invalid={Boolean(errors.informacionSolicitada)}
              {...register("informacionSolicitada")}
            />
          </FormField>

          <SelectField
            control={control}
            name="formaEntrega"
            label="Forma de entrega"
            options={formasEntrega}
            error={errors.formaEntrega?.message}
            required
          />

          <CheckboxField
            control={control}
            name="aceptar"
            label="Declaro que la información brindada es veraz y acepto las condiciones de la Ley de Transparencia y Acceso a la Información Pública."
            error={errors.aceptar?.message}
          />

          <ConsentNote>
            En modo demostración, los datos se muestran en la consola del
            navegador y no se envían a ningún servidor.
          </ConsentNote>

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? <Spinner /> : <Send />}
              {isSubmitting ? "Enviando..." : "Presentar solicitud"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

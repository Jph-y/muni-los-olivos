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
import { submitReclamo } from "@/lib/api/services"
import { submitWithToast } from "@/lib/toast"
import { reclamoSchema, type ReclamoFormValues } from "@/lib/validations/schemas"

const documentos = [
  { value: "DNI", label: "DNI" },
  { value: "CE", label: "Carné de extranjería" },
  { value: "Pasaporte", label: "Pasaporte" },
]

export function ReclamoForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReclamoFormValues>({
    resolver: zodResolver(reclamoSchema),
    defaultValues: {
      tipoDocumento: "DNI",
      numeroDocumento: "",
      nombres: "",
      domicilio: "",
      email: "",
      telefono: "",
      bienServicio: "",
      detalle: "",
      pedido: "",
      aceptar: false,
    },
  })

  const onSubmit = handleSubmit(async (values) => {
    const result = await submitWithToast(submitReclamo(values))
    if (result) {
      reset()
    }
  })

  return (
    <Card>
      <CardContent className="p-6 sm:p-8">
        <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
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
              label="Domicilio"
              htmlFor="domicilio"
              error={errors.domicilio?.message}
              required
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
            label="Bien o servicio materia del reclamo"
            htmlFor="bienServicio"
            error={errors.bienServicio?.message}
            required
          >
            <Input
              id="bienServicio"
              placeholder="Ej. Licencia de funcionamiento, limpieza pública..."
              aria-invalid={Boolean(errors.bienServicio)}
              {...register("bienServicio")}
            />
          </FormField>

          <FormField
            label="Detalle del reclamo"
            htmlFor="detalle"
            error={errors.detalle?.message}
            description="Describe lo ocurrido con el mayor detalle posible."
            required
          >
            <Textarea
              id="detalle"
              rows={5}
              aria-invalid={Boolean(errors.detalle)}
              {...register("detalle")}
            />
          </FormField>

          <FormField
            label="Pedido o solución esperada"
            htmlFor="pedido"
            error={errors.pedido?.message}
            required
          >
            <Textarea
              id="pedido"
              rows={3}
              aria-invalid={Boolean(errors.pedido)}
              {...register("pedido")}
            />
          </FormField>

          <CheckboxField
            control={control}
            name="aceptar"
            label="Declaro que la información brindada es veraz y acepto las condiciones del Libro de Reclamaciones."
            error={errors.aceptar?.message}
          />

          <ConsentNote>
            El Libro de Reclamaciones es un registro público. En modo
            demostración, los datos se muestran en la consola del navegador y no
            se envían a ningún servidor.
          </ConsentNote>

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? <Spinner /> : <Send />}
              {isSubmitting ? "Registrando..." : "Registrar reclamo"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

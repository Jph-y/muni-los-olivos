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
import { submitContacto } from "@/lib/api/services"
import { submitWithToast } from "@/lib/toast"
import { contactoSchema, type ContactoFormValues } from "@/lib/validations/schemas"

const motivos = [
  { value: "consulta", label: "Consulta general" },
  { value: "tramite", label: "Trámite o servicio" },
  { value: "reclamo", label: "Reclamo o sugerencia" },
  { value: "seguridad", label: "Reporte de seguridad ciudadana" },
  { value: "otro", label: "Otro" },
]

export function ContactForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactoFormValues>({
    resolver: zodResolver(contactoSchema),
    defaultValues: {
      nombre: "",
      email: "",
      telefono: "",
      motivo: "",
      mensaje: "",
      aceptar: false,
    },
  })

  const onSubmit = handleSubmit(async (values) => {
    const result = await submitWithToast(submitContacto(values))
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
              htmlFor="nombre"
              error={errors.nombre?.message}
              required
            >
              <Input
                id="nombre"
                autoComplete="name"
                placeholder="Ej. María López"
                aria-invalid={Boolean(errors.nombre)}
                {...register("nombre")}
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
                placeholder="correo@ejemplo.com"
                aria-invalid={Boolean(errors.email)}
                {...register("email")}
              />
            </FormField>
            <FormField
              label="Teléfono celular"
              htmlFor="telefono"
              error={errors.telefono?.message}
              description="9 dígitos, debe iniciar con 9."
              required
            >
              <Input
                id="telefono"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="987654321"
                maxLength={9}
                aria-invalid={Boolean(errors.telefono)}
                {...register("telefono")}
              />
            </FormField>
            <SelectField
              control={control}
              name="motivo"
              label="Motivo de contacto"
              options={motivos}
              error={errors.motivo?.message}
              required
            />
          </div>

          <FormField
            label="Mensaje"
            htmlFor="mensaje"
            error={errors.mensaje?.message}
            description="Mínimo 20 caracteres. No incluyas datos sensibles."
            required
          >
            <Textarea
              id="mensaje"
              rows={5}
              placeholder="Escribe tu consulta o mensaje..."
              aria-invalid={Boolean(errors.mensaje)}
              {...register("mensaje")}
            />
          </FormField>

          <CheckboxField
            control={control}
            name="aceptar"
            label="Acepto la política de privacidad y el tratamiento de mis datos personales."
            error={errors.aceptar?.message}
          />

          <ConsentNote>
            Los datos consignados serán utilizados únicamente para atender tu
            solicitud. En modo demostración, la información se muestra en la
            consola del navegador y no se envía a ningún servidor.
          </ConsentNote>

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? <Spinner /> : <Send />}
              {isSubmitting ? "Enviando..." : "Enviar mensaje"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

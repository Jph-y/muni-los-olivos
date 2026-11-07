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
import { Textarea } from "@/components/ui/textarea"
import { submitMesaPartes } from "@/lib/api/services"
import { submitWithToast } from "@/lib/toast"
import {
  mesaPartesSchema,
  type MesaPartesFormValues,
} from "@/lib/validations/schemas"

const documentos = [
  { value: "DNI", label: "DNI" },
  { value: "CE", label: "Carné de extranjería" },
  { value: "Pasaporte", label: "Pasaporte" },
]

const tiposPresentados = [
  { value: "solicitud", label: "Solicitud" },
  { value: "carta", label: "Carta" },
  { value: "recurso", label: "Recurso de apelación" },
  { value: "denuncia", label: "Denuncia" },
  { value: "informe", label: "Informe" },
  { value: "otro", label: "Otro" },
]

const areas = [
  { value: "alcaldia", label: "Alcaldía" },
  { value: "gerencia-municipal", label: "Gerencia Municipal" },
  { value: "seguridad-ciudadana", label: "Gerencia de Seguridad Ciudadana" },
  {
    value: "administracion-tributaria",
    label: "Gerencia de Administración Tributaria y Rentas",
  },
  {
    value: "limpieza-publica",
    label: "Subgerencia de Limpieza Pública y Medio Ambiente",
  },
  {
    value: "planeamiento-presupuesto",
    label: "Oficina General de Planeamiento y Presupuesto",
  },
  {
    value: "tecnologia-informacion",
    label: "Oficina General de Tecnología de la Información y Comunicaciones",
  },
]

export function MesaPartesForm() {
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
  } = useForm<MesaPartesFormValues>({
    resolver: zodResolver(mesaPartesSchema),
    defaultValues: {
      tipoDocumento: "DNI",
      numeroDocumento: "",
      nombres: "",
      email: "",
      telefono: "",
      asunto: "",
      tipoDocumentoPresentado: "solicitud",
      folios: 1,
      areaDestino: "",
      descripcion: "",
      archivo: "",
      declaracion: false,
    },
  })

  const archivo = watch("archivo")

  const onSubmit = handleSubmit(async (values) => {
    const result = await submitWithToast(submitMesaPartes(values))
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
              label="Asunto"
              htmlFor="asunto"
              error={errors.asunto?.message}
              required
            >
              <Input
                id="asunto"
                aria-invalid={Boolean(errors.asunto)}
                {...register("asunto")}
              />
            </FormField>
            <SelectField
              control={control}
              name="tipoDocumentoPresentado"
              label="Tipo de documento a presentar"
              options={tiposPresentados}
              error={errors.tipoDocumentoPresentado?.message}
              required
            />
            <FormField
              label="Número de folios"
              htmlFor="folios"
              error={errors.folios?.message}
              required
            >
              <Input
                id="folios"
                type="number"
                min={1}
                inputMode="numeric"
                aria-invalid={Boolean(errors.folios)}
                {...register("folios", { valueAsNumber: true })}
              />
            </FormField>
          </div>

          <SelectField
            control={control}
            name="areaDestino"
            label="Área destinataria"
            options={areas}
            error={errors.areaDestino?.message}
            required
          />

          <FormField
            label="Descripción del documento"
            htmlFor="descripcion"
            error={errors.descripcion?.message}
            required
          >
            <Textarea
              id="descripcion"
              rows={4}
              aria-invalid={Boolean(errors.descripcion)}
              {...register("descripcion")}
            />
          </FormField>

          <FileField
            label="Documento adjunto"
            filename={archivo || undefined}
            error={errors.archivo?.message}
            required
            onFileSelected={(file) => {
              setValue("archivo", file?.name ?? "", { shouldValidate: true })
              clearErrors("archivo")
            }}
            onError={(message) =>
              setError("archivo", { type: "manual", message })
            }
          />

          <CheckboxField
            control={control}
            name="declaracion"
            label="Declaro bajo juramento que la información y documentación presentada es auténtica."
            error={errors.declaracion?.message}
          />

          <ConsentNote>
            En modo demostración, el nombre del archivo y los datos del
            formulario se muestran en la consola del navegador. En producción se
            enviará el archivo al backend para su registro.
          </ConsentNote>

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? <Spinner /> : <Send />}
              {isSubmitting ? "Enviando..." : "Presentar documento"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

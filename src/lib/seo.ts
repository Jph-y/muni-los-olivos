import { useEffect } from "react"

interface DocumentMeta {
  title: string
  description?: string
}

const BASE_TITLE = "Municipalidad Distrital de Los Olivos"

export function useDocumentMeta({ title, description }: DocumentMeta) {
  useEffect(() => {
    document.title = title ? `${title} | ${BASE_TITLE}` : BASE_TITLE

    if (description) {
      let meta = document.querySelector<HTMLMetaElement>(
        'meta[name="description"]'
      )
      if (!meta) {
        meta = document.createElement("meta")
        meta.name = "description"
        document.head.appendChild(meta)
      }
      meta.content = description
    }
  }, [title, description])
}

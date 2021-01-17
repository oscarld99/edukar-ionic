export interface Examen {
  codigo: string
  fecha_activacion: string
  fecha_cierre: string
  id: number
  nombre: string
  observaciones: string
  preguntas: Pregunta[]
  puntaje_maximo: number
  tiempo: number
  tipo: string
  estado?: String
}

export interface Pregunta {
  ayuda: string
  descripcion: string
  imagen: boolean
  multiple: boolean
  indice: number
  valor: string
  tipo_valor: string
  numero_respuestas: number
  tipo: string
  opciones: Opcion[]
}

export interface Opcion {
  correcto?: boolean
  valor: number
  descripcion: string
}

export interface Notificacion {
  tipo: number
  title: string
  mensaje?: string
}

export interface Resultado {
  id: number
  personas_id: number
  cuestionarios_id: number
  atributos: any
  observaciones: string
  resultado: number
}

export interface Notas {
  id: number
  personas_id: number
  titulo_cuestionario: string
  atributos: any
  resultado: number
  observaciones: string
  cuestionarios_id: number
}

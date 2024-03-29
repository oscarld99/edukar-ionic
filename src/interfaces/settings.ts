export interface AppPage {
  url: string
  mdIcon: string
  title: string
  index: number
  Component: React.FC
}

export interface ComponentsProps {
  classStyle?: string
  children?: React.ReactNode
  [x: string]: any
}

export interface responseValidate {
  response: boolean
  mensaje: string
  respuestas?: responsePregunta[]
}

export interface responsePregunta {
  indice: number
  pregunta: string
  respuestas: number | number[]
}

export interface User {
  id: number
  nombres: string
  apellidos: string
  identificacion: string
  correo: string
  entidad_id?: number
  grupos_id?: string
  telefono: string
}

export interface Signin {
  user: User
  token: string
}

export interface Data {
  mensaje: string
  fechaProceso: string
  data: Data
}

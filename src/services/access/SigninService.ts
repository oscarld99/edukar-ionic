import http from '../../lib/http/http'
import { ResponseWS } from '../../interfaces/httpInterfaces'
import { Signin } from '../../interfaces/AccessInterfaces'

export default async (user: { usuario: string, clave: string }): Promise<Signin | string> => {
  try {
    const result = await http.post<ResponseWS<Signin>>('signin', user)
    return result.data.data
  } catch (error) {
    return error.error.data.mensajeError
  }
}

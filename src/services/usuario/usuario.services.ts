import http from '../../lib/http/http'
import { ResponseWS } from '../../interfaces/httpInterfaces'
import { User } from '../../interfaces/AccessInterfaces'

export default async (infoUsario: User): Promise<User | string> => {
  try {
    const result = await http.put<ResponseWS<User>>('admin/usuario', infoUsario)
    return result.data.data
  } catch (error) {
    return error.error.data.mensajeError
  }
}

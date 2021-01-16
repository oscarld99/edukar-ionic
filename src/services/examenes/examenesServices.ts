import http from '../../lib/http/http'
import { ResponseWS } from '../../interfaces/httpInterfaces'
import { Examen } from '../../interfaces/examenes'

export default async (): Promise<Examen[] | string> => {
  try {
    const result = await http.get<ResponseWS<Examen[]>>('admin/exams')
    return result.data.data
  } catch (error) {
    return error.error.data.mensajeError
  }
}

import http from '../../lib/http/http'
import { ResponseWS } from '../../interfaces/httpInterfaces'
import { Notas } from '../../interfaces/examenes'

export default async (personaId: number): Promise<Notas[] | string> => {
  try {
    const result = await http.get<ResponseWS<Notas[]>>(`/admin/exams/qualify?personaId=${personaId}`)
    return result.data.data
  } catch (error) {
    return error.error.data.mensajeError
  }
}

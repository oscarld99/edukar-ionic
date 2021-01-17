import http from '../../lib/http/http'
import { ResponseWS } from '../../interfaces/httpInterfaces'
import { Resultado } from '../../interfaces/examenes'

export default async (personaId: number, cuestionarioId: number, respuestas: any, atributos: any): Promise<Resultado | string> => {
  try {
    const result = await http.post<ResponseWS<Resultado>>('/admin/exams/qualify', { personaId, cuestionarioId, respuestas, atributos })
    return result.data.data
  } catch (error) {
    return error.error.data.mensajeError
  }
}

import { Examen } from '../../interfaces/examenes'
import { responsePregunta, responseValidate } from '../../interfaces/settings'

export const validarQuiz = (quiz: Examen, respondidas: any): responseValidate => {
  const res: responseValidate = {
    response: true,
    mensaje: ''
  }
  const respuestas: responsePregunta[] | any = []
  quiz.preguntas.map((pregunta, key) => {
    respuestas[key] = {}
    respuestas[key].pregunta = pregunta.descripcion
    respuestas[key].indice = pregunta.indice
    if (pregunta.multiple) {
      respuestas[key].respuestas = respondidas[pregunta.indice]
    } else {
      if (!respondidas[pregunta.indice]) {
        res.response = false
        res.mensaje = `DEBE COMPLETAR LA PREGUNTA ${pregunta.indice + 1}`
      } else {
        respuestas[key].respuestas = respondidas[pregunta.indice]
      }
    }
  })
  res.respuestas = respuestas
  return res
}

export const validarClases = (opcion: any, respondidas: any): string => {
  let clases = 'opcion'
  try {
    if (opcion.multiple) {
      const respondidass: any = respondidas
      if (respondidass[opcion.indice].includes(opcion.valor)) {
        clases += ' opcion_selected'
      }
    } else {
      if (respondidas[opcion.indice] === opcion.valor) {
        clases += ' opcion_selected'
      }
    }
  } catch (error) { }
  return clases
}

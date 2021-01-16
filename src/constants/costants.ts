import { Examen } from '../interfaces/examenes'

export const ESTADO_EXAMENES = {
  activo: 'A',
  pendiente: 'P',
  inactivo: 'I'
}

export const FORMATOS_FECHAS = {
  fecha_servidor: 'YYYY-MM-DD',
  hora_servidor: 'HH:mm:ss',
  fecha_hora_servidor: 'YYYY-MM-DD HH:mm:ss',
  fecha_vista: 'DD/MM/YYYY',
  hora_vista: 'hh:mm A',
  fecha_hora_vista: 'DD/MM/YYYY hh:mm A'
}

export const LOCAL_STORAGE_STATES = {
  token: 'token',
  usuario: 'user',
  examen_activo: 'active-exam'
}

export const STATE_GLOBAL = {
  changeNetworkStatus: 'changeNetworkStatus'
}


export const DEFAULT_EXAM: Examen = {
  nombre: 'Examen de biologia',
  tiempo: 15,
  tipo: 'EXAMEN',
  puntaje_maximo: 5,
  codigo: '515GFH87',
  fecha_activacion: '2021-01-15T19:21',
  fecha_cierre: '2021-01-15T21:21',
  observaciones: 'TIENES 15 MINUTOS PARA TERMINAR ESTE EXAMEN, ESTE EXAMEN ES INDIVIDUAL Y ANTE CUALQUIER INDICIO DE COPIA ESTE SERA ANULADO',
  preguntas: []
}

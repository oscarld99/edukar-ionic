const formatDuration = (minutes: number): string => {
  const hourToMinutes = (hour: number): number => Math.round(hour * 60)

  let durationString = ''
  const MINUTES_FOR_HOUR: number = 60
  const durationInHours: number = minutes / MINUTES_FOR_HOUR
  if (durationInHours < 1) {
    durationString = `${(hourToMinutes(durationInHours))} minuto(s)`
  } else {
    durationString = `${Math.trunc(durationInHours)} hora(s) y ${(hourToMinutes(durationInHours - Math.trunc(durationInHours)))} minuto(s)`
  }
  return durationString
}

const formatClosureDate = (dateString: string, status: number): string => {
  /*
  if (status === STATE_TASK_CODES.closed) {
     return `Cerró el ${dateString}`
   }
   return `Cierra el ${dateString}`
   */
  return ''
}

const formatLocalDateTime = (dateTimeString: string | Date): string => {
  if (dateTimeString instanceof Date) {
    dateTimeString = dateTimeString.toISOString()
  }
  return dateTimeString.slice(0, 16)
}

const segundosAHora = (time: number): string => {
  let horas = 0
  let minutos = 0
  while (time >= 3600) {
    horas++
    time -= 3600
  }

  while (time >= 60) {
    minutos++
    time -= 60
  }
  return `${format00(horas)}:${format00(minutos)}:${format00(time)}`
}

const format00 = (numero: number): string => {
  return `${(numero <= 9) ? '0' : ''}${numero}`
}

export {
  formatDuration,
  formatClosureDate,
  formatLocalDateTime,
  segundosAHora
}

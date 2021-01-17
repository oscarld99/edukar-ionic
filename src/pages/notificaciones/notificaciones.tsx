import React from 'react'
import NotificacionComponent from '../../components/notificacion/notificacion'
import { Notificacion } from '../../interfaces/examenes'
import './notificacion.css'
const Notificaciones: React.FC = () => {
  const notifiaciones: Notificacion[] = [{
    tipo: 0,
    title: 'PEDRO FRANCISCO',
    mensaje: 'No se les olvide que mañana a las 6:00 pm estara disponible la evaluaicon de ingles.'
  }, {
    tipo: 1,
    title: 'Nueva evaluacion!',
    mensaje: 'La evaluacion de matematicas, ya esta disponible'
  }, {
    tipo: 2,
    title: 'Examen calificado',
    mensaje: 'La evaluacion de lectura critica ya fue calificada.'
  }, {
    tipo: 3,
    title: 'Apresurate!',
    mensaje: 'Faltan 15 minutos, apra que avabe el plazo de realizar la evaluacion de frances.'
  }]

  return (
    <div className="container-notificaciones">
      {
        notifiaciones.map((notificacion) => {
          return (
            <NotificacionComponent {...notificacion} />
          )
        })
      }
    </div>
  )
}

export default Notificaciones

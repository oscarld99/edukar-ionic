import { IonAvatar, IonItem, IonLabel } from '@ionic/react'
import React from 'react'
import { Notificacion } from '../../interfaces/examenes'
import Alarma from '../../assets/notificaciones/0.png'
import Examen from '../../assets/notificaciones/1.png'
import Nota from '../../assets/notificaciones/2.png'
import Tiempo from '../../assets/notificaciones/3.png'
import { NOTIFICACIONES_TIPOS } from '../../constants/costants'
import { useHistory } from 'react-router'

const NotificacionComponent: React.FC<Notificacion> = (notificacion: Notificacion) => {
  const history = useHistory()

  const obtenerImagen = (): string => {
    switch (notificacion.tipo) {
      case NOTIFICACIONES_TIPOS.mensaje_profesor:
        return Alarma
      case NOTIFICACIONES_TIPOS.examen_recibido:
        return Examen
      case NOTIFICACIONES_TIPOS.calificacion_examen:
        return Nota
      case NOTIFICACIONES_TIPOS.alerta_examen:
        return Tiempo
      default:
        return Alarma
    }
  }

  const notificacionCLick = (): void => {
    switch (notificacion.tipo) {
      case NOTIFICACIONES_TIPOS.examen_recibido:
      case NOTIFICACIONES_TIPOS.alerta_examen:
        history.push('evaluaciones')
        break
      case NOTIFICACIONES_TIPOS.calificacion_examen:
        history.push('resultados')
        break
      default:

        break
    }
  }

  return (
    <div className="notificacion" onClick={() => notificacionCLick()}>
      <IonItem button={notificacion.tipo !== NOTIFICACIONES_TIPOS.mensaje_profesor} className="item-notificacion" >
        <IonAvatar slot="start">
          <img src={obtenerImagen()} />
        </IonAvatar>
        <div className="notification-card">
          <div className="notification-title">
            <IonLabel className="ion-text-wrap">{notificacion.title}</IonLabel>
          </div>
          <div className="notification-body">
            <IonLabel className="ion-text-wrap">{notificacion.mensaje}</IonLabel>
          </div>
        </div>

      </IonItem>
    </div>
  )
}

export default NotificacionComponent

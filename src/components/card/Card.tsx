import { IonButton, IonModal, IonToast } from '@ionic/react'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ESTADO_EXAMENES, LOCAL_STORAGE_STATES } from '../../constants/costants'
import { Examen } from '../../interfaces/examenes'
import StorageJobs from '../../jobs/Storage'
import { formatDuration } from '../../utils/funciuones/funciones'
import './Card.css'

const Card: React.FC<Examen> = (examen: Examen) => {
  const { nombre, codigo, fecha_cierre: fechaCierre, tiempo, preguntas, estado } = examen
  const storageJobs = StorageJobs.getInstance()
  const history = useHistory()
  const [showToast, setShowToast] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [textToast, setTextToast] = useState('')
  const optionExamns = (): void => {
    if (estado === ESTADO_EXAMENES.activo) {
      setShowModal(true)
    } else if (estado === ESTADO_EXAMENES.pendiente) {
      setTextToast('LA EVALUACION ESTA PENDIENTE DE ACTIVACION')
      setShowToast(true)
      // aca deberiamos consultar la info del examen y leugo si cambiar de vista
    } else {
      setTextToast('LA EVALUACION ESTA INACTIVA')
      setShowToast(true)
    }
  }

  const iniciarExamen = async (): Promise<void> => {
    setShowModal(false)
    await storageJobs.setObject(LOCAL_STORAGE_STATES.examen_activo, examen)
    history.push('/exam')
  }

  return (
    <div className="card" onClick={() => optionExamns()}>
      <IonModal isOpen={showModal} cssClass='my-custom-class'>
        <p>This is modal content</p>
        <IonButton onClick={async () => await iniciarExamen()}>Close Modal</IonButton>
        <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
      </IonModal>
      <h2 className="card__title">{nombre}</h2>
      <div className="card__details">
        <div className="card__item">
          <span className="card__label">codigo:</span>
          <span className="card__info">{codigo}</span>
        </div>
        <div className="card__item">
          <span className="card__label">tiempo:</span>
          <span className="card__info">{formatDuration(tiempo)}</span>
        </div>
        <div className="card__item">
          <span className="card__label">fecha cierre:</span>
          <span className="card__info">{new Date(fechaCierre).toLocaleString()}</span>
        </div>
        <div className="card__item">
          <span className="card__label">preguntas:</span>
          <span className="card__info">{preguntas.length}</span>
        </div>
        <div className="card__item">
          <span className="card__label">estado:</span>
          <span className="card__info">{estado}</span>
        </div>
      </div>
      <IonToast
        isOpen={showToast}
        message={textToast}
        duration={5000}
        color={'dark'}
        onDidDismiss={() => setShowToast(false)}
        buttons={[
          {
            side: 'end',
            icon: 'close',
            handler: () => {
              setShowToast(false)
            }
          }
        ]}
      />
    </div>
  )
}

export default Card

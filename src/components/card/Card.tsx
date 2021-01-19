import { IonButton, IonButtons, IonIcon, IonModal, IonTitle, IonToast, IonToolbar } from '@ionic/react'
import { arrowForward, arrowUndo, arrowUp, close, helpCircle, personCircle } from 'ionicons/icons'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ESTADO_EXAMENES, LOCAL_STORAGE_STATES } from '../../constants/costants'
import { Examen } from '../../interfaces/examenes'
import StorageJobs from '../../jobs/Storage'
import { formatDuration } from '../../utils/funciuones/funciones'
import './Card.css'

const Card: React.FC<Examen> = (examen: Examen) => {
  const { nombre, codigo, fecha_cierre: fechaCierre, tiempo, preguntas, estado, observaciones } = examen
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
    <div >
      <IonModal isOpen={showModal} cssClass='my-custom-class'>
        <IonToolbar>
          <IonButtons slot="secondary">
            <IonButton fill="solid" color="danger" onClick={() => setShowModal(false)}>
              <IonIcon slot="start" icon={close} />
        Atras
            </IonButton>
          </IonButtons>
          <IonTitle>{`${codigo || 'SAJH67'} - ${nombre}`}</IonTitle>
          <IonButtons slot="primary" onClick={async () => await iniciarExamen()}>
            <IonButton fill="solid" color="secondary">
              Iniciar
              <IonIcon slot="end" icon={arrowForward} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <div className="body-modal">
          <div className="row">
            <h5 className="modal-label">Codigo:</h5>
            <h5 className="modal-data">{codigo || 'SAJH67'}</h5>
          </div>
          <div className="row">
            <h5 className="modal-label">Nombre:</h5>
            <h5 className="modal-data">{nombre}</h5>
          </div>
          <div className="row">
            <h5 className="modal-label">Observaciones:</h5>
            <h5 className="modal-data">{observaciones}</h5>
          </div>
          <div className="row">
            <h5 className="modal-label">Codigo:</h5>
            <h5 className="modal-data">{codigo || 'SAJH67'}</h5>
          </div>
        </div>
      </IonModal>
      <div className="card" onClick={() => optionExamns()}>
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
    </div >
  )
}

export default Card

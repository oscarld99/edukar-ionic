import { IonButton, IonButtons, IonIcon, IonModal, IonTitle, IonToast, IonToolbar } from '@ionic/react'
import { arrowForward, close } from 'ionicons/icons'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ESTADO_EXAMENES, LOCAL_STORAGE_STATES } from '../../constants/costants'
import { Examen } from '../../interfaces/examenes'
import StorageJobs from '../../jobs/Storage'
import { formatDuration } from '../../utils/funciuones/funciones'
import './cardExamenes.css'

const CardExamenes: React.FC<Examen> = (examen: Examen) => {
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
      <IonModal isOpen={showModal} cssClass='my-custom-class' >
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
          <div className="modal-info-exam border-info">
            <div className="modal-info-exam border-info">
              <div className="row">
                <h5 className="modal-label">Codigo:</h5>
                <h5 className="modal-data border-bottom" >{codigo || 'SAJH67'}</h5>
              </div>
              <div className="row">
                <h5 className="modal-label">Nombre:</h5>
                <h5 className="modal-data border-bottom">{nombre}</h5>
              </div>
            </div>
          </div>
          <h5 className="modal-label">Observaciones:</h5>
          <div className="modal-info-exam border-info">
            <h5 className="modal-data">{observaciones}</h5>
          </div>
          <div className="row">
            <h5 className="modal-label">tiempo:</h5>
            <div className="modal-info-exam border-info">
              <h5 className="modal-data">{formatDuration(tiempo)}</h5>
            </div>
          </div>
          <div className="row">
            <h5 className="modal-label">preguntas:</h5>
            <div className="modal-info-exam border-info">
              <h5 className="modal-data">{preguntas.length}</h5>
            </div>
          </div>
        </div>
      </IonModal>
      <div className="card" onClick={() => optionExamns()}>
        <div className="flex__container-1">
          <div className="container__title-1">
            <b className="title-1">{nombre}</b><hr className="hr-title" />
          </div>
          <div className="container-info">
            <span className="info">CODIGO:</span><span className="info-user">{codigo}</span><hr className="hr-info" /><br /><br />
            <span className="info">TIEMPO:</span><span className="info-user">{formatDuration(tiempo)}</span><hr className="hr-info" /><br /><br />
            <span className="info">FECHA CIERRE:</span><span className="info-user">{new Date(fechaCierre).toLocaleString()}</span><hr className="hr-info" /><br /><br />
            <span className="info">PREGUNTAS:</span><span className="info-user">{preguntas.length}</span><hr className="hr-info" /><br /><br />
            <span className="info">ESTADO:</span><span className="info-user">{estado}</span>
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

export default CardExamenes

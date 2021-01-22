import React, { useState } from 'react'
import {
  IonIcon,
  IonContent,
  IonPage,
  IonToast
} from '@ionic/react'
import { Plugins } from '@capacitor/core'
import { person, lockClosed } from 'ionicons/icons'
import { useHistory } from 'react-router-dom'

import Logologin from '../../assets/images/logoAppLogin.png'
import Usuario from '../../assets/images/usuario.png'
import './login.css'
import SigninService from '../../services/access/SigninService'
import StorageJobs from '../../jobs/Storage'
import { LOCAL_STORAGE_STATES } from '../../constants/costants'
import Loader from '../../components/loader/Loader'
const { App } = Plugins

let counter = 1
const Login: React.FC = (props: any) => {
  const storageJobs = StorageJobs.getInstance()
  const [loader, setLoader] = useState(false)
  document.addEventListener('ionBackButton', () => {
    if (counter === 2) {
      counter = 1
      App.exitApp()
    } else {
      counter = 2
      setTimeout(() => {
        counter = 1
      }, 1000)
    }
  })
  const [usuario, setUsuario] = useState('ESTUDIANTE1')
  const [clave, setClave] = useState('123456')
  const [showToast, setShowToast] = useState(false)
  const [messageToast, setMessageToast] = useState('')

  const history = useHistory()

  const iniciar = async (): Promise<void> => {
    setLoader(true)
    const result = await SigninService({ usuario, clave })
    if (typeof result !== 'string') {
      await storageJobs.setObject(LOCAL_STORAGE_STATES.usuario, result.user)
      await storageJobs.setItem(LOCAL_STORAGE_STATES.token, result.token)
      history.go(0)
      setLoader(false)
    } else {
      const message = result
      setMessageToast(message)
      setShowToast(true)
      setLoader(false)
    }
  }

  const validateForm = (): boolean => {
    let disabled = false
    if (usuario.trim() === '' || usuario.length < 3) {
      disabled = true
    } else if (clave.trim() === '' || clave.length < 6) {
      disabled = true
    }
    return disabled
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <Loader classStyle={loader ? 'loader--show loader--transparent' : ''} >
          INICIANDO SESSION
        </Loader>
        <div className="root-login">
          <div className="img-logo">
            <img src={Logologin} alt="logo-edukar" />
          </div>
          <div className="img-user-login">
            <img src={Usuario} alt="user-edukar" />
          </div>
          <div className="form-loguin">
            <div className="input-group">
              <i><IonIcon slot="start" ios={person} md={person} /></i>
              <input
                className="input-loguin"
                type="text"
                placeholder="Usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value.toLowerCase())}
              />
            </div>
            <div className="input-group">
              <i><IonIcon slot="start" ios={lockClosed} md={lockClosed} /></i>
              <input
                className="input-loguin"
                type="password"
                placeholder="Contraseña"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
              />
            </div>
            <div className="option-form-loguin">
              <div className="olvido-clave">
                <h6>Olvidé contraseña</h6>
              </div>
            </div>
          </div>
          <div className="pnl-btn">
            <button className="btn-ingresar" disabled={validateForm()} onClick={async () => await iniciar()}>
              INGRESAR
            </button>

          </div>
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message={messageToast}
            duration={3000}
            color='danger'
          />
          <IonToast
            isOpen={counter === 2}
            message="Dar otra vez atras para salir."
            duration={200}
          />
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Login

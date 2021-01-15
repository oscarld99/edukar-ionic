import React, { useState, useRef } from 'react'
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
const { App } = Plugins

const Login: React.FC = (props: any) => {
  const storageJobs = StorageJobs.getInstance()

  const [counter, setCounter] = useState(0)
  document.addEventListener('ionBackButton', () => {
    if (props.location.pathname === '/login') {
      if (counter) {
        App.exitApp()
      } else {
        setTimeout(() => {
          setCounter(0)
        }, 5000)
        setCounter(1)
      }
    }
  })
  const inputRef: any = useRef()
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [messageToast, setMessageToast] = useState('')

  const history = useHistory()

  const iniciar = async (): Promise<void> => {
    const result = await SigninService({ usuario, clave })
    if (typeof result !== 'string') {
      await storageJobs.setObject('user', result.user)
      await storageJobs.setItem('token', result.token)
      history.push('/page/evaluaciones')
    } else {
      const message = result
      setMessageToast(message)
      setShowToast(true)
    }
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="root-login">
          <div className="img-logo">
            <img src={Logologin} alt="logo-edukar" />
          </div>
          <div className="img-user">
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
                onChange={(e) => setUsuario(e.target.value)}
              />
            </div>
            <div className="input-group">
              <i><IonIcon slot="start" ios={lockClosed} md={lockClosed} /></i>
              <input
                className="input-loguin"
                type="password"
                placeholder="Contraseña"
                ref={inputRef}
                value={clave}
                onChange={(e) => setClave(e.target.value)}
              />
            </div>
            <div className="option-form-loguin">
              <div className="recordarme">
                <input type="checkbox" id="checkbox-recordarme" />
                <label htmlFor="checkbox-recordarme">RECORDARME</label>
              </div>
              <div className="olvido-clave">
                <h6>Olvidé contraseña</h6>
              </div>
            </div>
          </div>
          <div className="pnl-btn">
            <button className="btn-ingresar" onClick={() => iniciar()}>
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
            isOpen={counter === 1}
            message="Dar otra vez atras para salir."
            duration={200}
          />
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Login

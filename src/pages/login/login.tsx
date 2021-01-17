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

const Login: React.FC = (props: any) => {
  const storageJobs = StorageJobs.getInstance()
  const [loader, setLoader] = useState(false)
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
  const [usuario, setUsuario] = useState('ncortina')
  const [clave, setClave] = useState('110120')
  const [showToast, setShowToast] = useState(false)
  const [messageToast, setMessageToast] = useState('')
  const [btnSignin, setBtnSignin] = useState(false)

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
            <button className="btn-ingresar" disabled={btnSignin} onClick={async () => await iniciar()}>
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

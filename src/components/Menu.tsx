import {
  IonAlert,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle
} from '@ionic/react'
import { globeOutline, lockClosed } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { appPages } from '../pages/routes'
import './Menu.css'
import StorageJobs from '../jobs/Storage'
import { getObjectStorage } from '../utils/storage/AsyncStorage'
import { User } from '../interfaces/AccessInterfaces'
import { LOCAL_STORAGE_STATES } from '../constants/costants'
import Userimg from '../assets/images/profile.svg'
const Menu: React.FC = () => {
  const history = useHistory()
  const storageJobs = StorageJobs.getInstance()
  const location = useLocation()
  const [disabled, setDisabled] = useState(false)
  const [usuario, setUsuario] = useState<User>()

  const [showAlertNetwork, setShowAlertNetwork] = useState(false)

  useEffect(() => {
    if (location.pathname === '/login') {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
    obtenerDataUsuario()
  }, [location.pathname])

  const obtenerDataUsuario = async (): Promise<void> => {
    setUsuario(await getObjectStorage<User>(LOCAL_STORAGE_STATES.usuario))
  }

  const cerrarSession = async (): Promise<void> => {
    await storageJobs.clear()
    history.go(0)
  }

  const sitiOficial = (): void => {
    window.open('https://demo-edukar.netlify.app/', '_system')
  }

  return (
    <IonMenu contentId="main" type="overlay" disabled={disabled} >
      <IonContent className="menu">
        <IonAlert
          isOpen={showAlertNetwork}
          onDidDismiss={() => setShowAlertNetwork(false)}
          cssClass='my-custom-class'
          header={''}
          subHeader={'Conétate a una red'}
          message={'Para usar Edukar, activa los datos móviles o conéctate a una red Wi-Fi.'}
          buttons={['OK']}
        />

        <IonList id="inbox-list">
          <div className="img-user">
            <img src={Userimg} alt="user-edukar" />
          </div>
          <div className="text-user">
            <h5 > {usuario ? (usuario.nombres + ' ' + usuario.apellidos) : ''}</h5>
          </div>
          {appPages.map((appPage, index) => {
            if (appPage.title === '') {
              return null
            } else {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                    <IonIcon slot="start" md={appPage.mdIcon} />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              )
            }
          })}
          <IonMenuToggle key={7} autoHide={false} onClick={() => sitiOficial()}>
            <IonItem routerDirection="none" lines="none" detail={false}>
              <IonIcon slot="start" md={globeOutline} />
              <IonLabel>Sitio oficial</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle key={7} autoHide={false} onClick={async () => await cerrarSession()}>
            <IonItem routerDirection="none" lines="none" detail={false}>
              <IonIcon slot="start" md={lockClosed} />
              <IonLabel>Cerrar Sesion</IonLabel>
            </IonItem>
          </IonMenuToggle>

        </IonList>
      </IonContent>
    </IonMenu>
  )
}

export default Menu

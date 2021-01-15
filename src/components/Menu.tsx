import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle
} from '@ionic/react'
import { lockClosed } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { appPages } from '../pages/routes'
import Usuario from '../assets/images/usuario.png'
import './Menu.css'


const Menu: React.FC = () => {
  const location = useLocation()
  const [disabled, setDisabled] = useState(false)
  useEffect(function () {
    if (location.pathname === "/login") {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  })
  
  const sitiOficial = () =>{
    console.log("goto the apgina")
  }

  return (
    <IonMenu contentId="main" type="overlay" disabled={disabled}>
      <IonContent>
        <IonList id="inbox-list">
          <div className="img-user">
            <img src={Usuario} alt="user-edukar" />
          </div>
          <IonListHeader className="text-user">OSCAR DAVID LORA DE SALES</IonListHeader>
          {appPages.map((appPage, index) => {
            if (appPage.title === "") {
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
          <IonMenuToggle key={7} autoHide={false}>
            <IonItem routerLink={"/login"} routerDirection="none" lines="none" detail={false}>
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

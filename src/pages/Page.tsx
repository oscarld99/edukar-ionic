import { IonContent, IonMenuButton, IonPage } from '@ionic/react'
import React from 'react'
import { useParams } from 'react-router'
import { appPages } from './routes'
import LogoHeader from '../assets/images/logo.png'
import './Page.css'

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>()
  return (
    <IonPage>
      <IonContent fullscreen>
        {
          name
            ? <main className="main">
              <div className="menuButton">
                <IonMenuButton />
              </div>
              <div className="headerPage">
                <img src={LogoHeader} alt="logo-edukar" />
                <h5 className="page-name">{name}</h5>
              </div>
              <div className="contenedor-children">
                {
                  appPages.map(({ Component, title, index }) => {
                    if (title.toLowerCase().trim() === name.toLowerCase().trim()) {
                      return (<Component key={index} />)
                    } else {
                      return null
                    }
                  })
                }
              </div>

            </main>

            : <div>MODULO NO ENCONTRADO</div>
        }

      </IonContent>
    </IonPage>
  )
}

export default Page

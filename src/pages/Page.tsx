import { IonContent, IonMenuButton, IonPage } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import { appPages } from './routes'
import LogoHeader from '../assets/images/logo.png'
import './Page.css';

const Page: React.FC = (props) => {

  const { name } = useParams<{ name: string; }>();
  return (
    <IonPage>
      <IonContent fullscreen>
        <main className="main">
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
                  return (<Component key={index} />);
                } else {
                  return null
                }
              })
            }
          </div>


        </main>
      </IonContent>
    </IonPage>
  );
};

export default Page;

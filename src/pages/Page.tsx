import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import {
  Switch,
  Route,
} from "react-router-dom";
import { appPages } from './routes'
import Examenes from './examenes/examenes'
import './Page.css';

const Page: React.FC = (props) => {

  const { name } = useParams<{ name: string; }>();
  console.log(props)
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <main className="main">
          {
            appPages.map(({ Component, title }) => {
              if (title.toLowerCase().trim() === name.toLowerCase().trim()) {
                return (<Component />);
              }
            })
          }
       
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Page;

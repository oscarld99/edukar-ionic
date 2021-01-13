import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import { appPages } from './routes'
import './Page.css';

const Page: React.FC = (props) => {

  let { name } = useParams<{ name: string; }>()
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
                return (<Component />)
              } else {
                return false
              }
            })
          }
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Page;

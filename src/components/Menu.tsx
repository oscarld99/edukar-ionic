import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { appPages } from '../pages/routes'
import './Menu.css';


const Menu: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const logOut = () => {
    history.push("/login");
  }

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Devitech</IonListHeader>
          <IonNote>info@devitech.com.co</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
        <IonList id="inbox-list">
          <IonButton className="btn-loguot" shape="round" onClick={()=>logOut()}>CERRAR SESION</IonButton>
        </IonList>

      </IonContent>
    </IonMenu>
  );
};

export default Menu;

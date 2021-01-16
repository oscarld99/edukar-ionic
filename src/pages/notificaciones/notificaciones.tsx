import { IonAvatar, IonItem, IonLabel } from '@ionic/react'
import React from 'react'
import './notificacion.css'
const Notificaciones: React.FC = () => {

  return (
    <div className="container-notificaciones">
      <IonItem button className="item-notificacion" >
        <IonAvatar slot="start">
          <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
        </IonAvatar>
        <IonLabel className="ion-text-wrap">Item Avatar</IonLabel>
      </IonItem>
      <IonItem button className="item-notificacion" >
        <IonAvatar slot="start">
          <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
        </IonAvatar>
        <IonLabel className="ion-text-wrap">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </IonLabel>
      </IonItem>
    </div>
  )
}

export default Notificaciones

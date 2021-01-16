import { IonAlert } from '@ionic/react'
import React, { useState } from 'react'

interface ContainerProps {
  showAlert: boolean
}

const Alert: React.FC<ContainerProps> = ({ showAlert }) => {
  const [showAlertNetwork, setShowAlertNetwork] = useState(showAlert)

  return (
    <IonAlert
      isOpen={showAlertNetwork}
      onDidDismiss={() => setShowAlertNetwork(false)}
      cssClass='my-custom-class'
      header={''}
      subHeader={'Conétate a una red'}
      message={'Para usar Edukar, activa los datos móviles o conéctate a una red Wi-Fi.'}
      buttons={['OK']}
    />
  )
}

export default Alert

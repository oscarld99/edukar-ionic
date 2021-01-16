import { IonSlide, IonSlides } from '@ionic/react'
import React from 'react'
import Paso1 from '../../assets/tutoriales/paso1.png'
import Paso2 from '../../assets/tutoriales/paso2.png'
import Paso3 from '../../assets/tutoriales/paso3.png'
import './home.css'
const Home: React.FC = () => {
  const slideOpts = {
    initialSlide: 0,
    speed: 400
  }

  return (
    <div className="container-slides">
      <IonSlides options={slideOpts}>
        <IonSlide>
          <div className="container-image-slide">
            <img src={Paso1} />
          </div>
        </IonSlide>
        <IonSlide>
          <div className="container-image-slide">
            <img src={Paso2} />
          </div>
        </IonSlide>
        <IonSlide>
          <div className="container-image-slide">
            <img src={Paso3} />
          </div>
        </IonSlide>
      </IonSlides>
    </div>
  )
}

export default Home

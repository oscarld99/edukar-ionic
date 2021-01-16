import { IonSlide, IonSlides } from '@ionic/react'
import React, { } from 'react'
import './home.css'
const Home: React.FC = () => {
  const slideOpts = {
    initialSlide: 1,
    speed: 400
  }

  return (
    <div className="container-slides">
      <IonSlides pager={true} options={slideOpts}>
        <IonSlide>
          <h1>Slide 1</h1>
        </IonSlide>
        <IonSlide>
          <h1>Slide 2</h1>
        </IonSlide>
        <IonSlide>
          <h1>Slide 3</h1>
        </IonSlide>
      </IonSlides>
    </div>
  )
}

export default Home

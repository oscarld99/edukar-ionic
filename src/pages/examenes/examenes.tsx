import { IonIcon } from '@ionic/react'
import { search } from 'ionicons/icons'
import React, { useState } from 'react'
import Card from '../../components/card/Card'
import './examenes.css'
const Examenes: React.FC = () => {
  const [buscador, setBuscador] = useState('')
  const info: any = {
    titulo: 'EVALUACION de matematicas',
    codigo: 'EDX5480',
    tiempo: '20 Min',
    cierre: '01/01/2020 11:59a.m',
    numeroPreguntas: 25,
    estado: 'PENDIENTE'
  }
  return (
    <div>

      <div className="buscador">
        <div className="input-group">
          <i><IonIcon slot="start" md={search} /></i>
          <input
            className="input-loguin br-principal"
            type="text"
            placeholder="Codigo"
            value={buscador}
            onChange={(e) => setBuscador(e.target.value)}
          />

        </div>
      </div>
      <div className="contenedor-examenes">
        <Card {...info} ></Card>
        <Card {...info}></Card>
        <Card {...info}></Card>
        <Card {...info}></Card>
      </div>
    </div>
  )
}

export default Examenes

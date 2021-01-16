import { IonIcon } from '@ionic/react'
import { search } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import Card from '../../components/card/Card'
import { Examen } from '../../interfaces/examenes'
import examenesServices from '../../services/examenes/examenesServices'
import './examenes.css'
const Examenes: React.FC = () => {
  const [buscador, setBuscador] = useState('')
  const [examenes, setExamenes] = useState<Examen[]>([])

  useEffect(() => {
    buscarDatos()
  }, [])
  const buscarDatos = async (): Promise<void> => {
    const result = await examenesServices()
    if (typeof result !== 'string') {
      setExamenes(result)
    } else {
      // TODO: ERRORES
    }
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
        {
          examenes.map((examen) => (
            <Card {...examen} key={examen.id}></Card>
          ))
        }
        {/*
        <IonToast
          isOpen={examenes.length === 0}
          message={'No tiene evaluaciones asignados.'}
          duration={10000}
        />
        */}
      </div>
    </div>

  )
}

export default Examenes

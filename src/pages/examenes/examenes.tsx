import { IonIcon } from '@ionic/react'
import { search } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import Card from '../../components/card/Card'
import CardExamenes from '../../components/cardExamenes/cardExamenes'
import Loader from '../../components/loader/Loader'
import { Examen } from '../../interfaces/examenes'
import examenesServices from '../../services/examenes/examenesServices'
import '../../assets/styles/normalize.css'
import './examenes.css'
const Examenes: React.FC = () => {
  const [buscador, setBuscador] = useState('')
  const [loader, setLoader] = useState(true)
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
    setLoader(false)
  }

  return (
    <div>
      <Loader classStyle={loader ? 'loader--show loader--transparent' : ''} >Consultando evaluaciones</Loader>
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
            <CardExamenes {...examen} key={examen.id}></CardExamenes>
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

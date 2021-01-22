import React, { useEffect, useState } from 'react'
import Acordion from '../../components/accordion/acordion'
import Loader from '../../components/loader/Loader'
import { Notas } from '../../interfaces/examenes'
import resultadosServices from '../../services/examenes/resultadosServices'
import { obtenerIdEstudiante } from '../../utils/funciuones/funciones'
import './notas.css'

const NotasComponent: React.FC = () => {
  const [loader, setLoader] = useState(true)
  const [notas, setNotas] = useState<Notas[]>([])

  useEffect(() => {
    buscarDatos()
  }, [])

  const buscarDatos = async (): Promise<void> => {
    const id = await obtenerIdEstudiante()
    const result = await resultadosServices(id)
    if (typeof result !== 'string') {
      setNotas(result)
    } else {
      // TODO: ERRORES
    }
    setLoader(false)
  }

  return (
    <div className="main-notas">
      <Loader classStyle={loader ? 'loader--show loader--transparent' : ''} >Consultando resultados</Loader>
      <div className="info-notas">
        {
          notas.map((nota) => {
            return (
              <Acordion {...nota} key={nota.id} />
            )
          })
        }
        <div className="totalizador-notas">
          <h5>{notas.length} Resultados</h5>
        </div>
      </div>
    </div>
  )
}

export default NotasComponent

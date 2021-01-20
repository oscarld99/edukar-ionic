import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/react'
import { newspaper } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import Loader from '../../components/loader/Loader'
import { Notas } from '../../interfaces/examenes'
import resultadosServices from '../../services/examenes/resultadosServices'
import './notas.css'

const NotasComponent: React.FC = () => {
  const [modoInfo, setModoInfo] = useState(false)
  const [loader, setLoader] = useState(true)
  const [notas, setNotas] = useState<Notas[]>([])
  const [detalles, setDetalles] = useState<any>({})

  useEffect(() => {
    buscarDatos()
  }, [])

  const buscarDatos = async (): Promise<void> => {
    const result = await resultadosServices(19)
    if (typeof result !== 'string') {
      setNotas(result)
    } else {
      // TODO: ERRORES
    }
    setLoader(false)
  }

  const showInformation = (data: any): void => {
    setModoInfo(true)
    setDetalles(data)
  }

  const hideInformation = (): void => {
    setModoInfo(false)
  }

  return (
    <div className="main-notas">
      <Loader classStyle={loader ? 'loader--show loader--transparent' : ''} >Consultando resultados</Loader>
      {
        modoInfo
          ? <div className="container-notas">
            <div className="header-notas">
              <h5>{detalles.titulo_cuestionario}</h5>
            </div>
            <div className="nota-notas">
              <h6>NOTA </h6>
              <h5>{detalles.resultado}</h5>
            </div>
            <div className="obervaciones-notas">
              <h5>OBSERVACIONES</h5>
              <h6>{detalles.observaciones}</h6>
            </div>
            <div className="regresar-notas">
              <button className="btn-ingresar" onClick={() => hideInformation()}>
                ATRAS
              </button>
            </div>

          </div>
          : <div className="info-notas">
            <IonList className={notas.length > 0 ? 'list-notas' : ''}>
              {
                notas.map((nota) => {
                  return (
                    <IonItem button onClick={() => showInformation(nota)}>
                      <IonIcon slot="start" md={newspaper} color="#0984e3" />
                      <IonLabel>
                        <h3>
                          {nota.titulo_cuestionario}
                        </h3>
                      </IonLabel>
                    </IonItem>
                  )
                })
              }

            </IonList>
            <div className="totalizador-notas">
              <h5>{notas.length} Resultados</h5>
            </div>
          </div>
      }

    </div>
  )
}

export default NotasComponent

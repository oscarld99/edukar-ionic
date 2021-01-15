import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/react'
import { newspaper } from 'ionicons/icons'
import React, { useState } from 'react'
import './notas.css'

const Notas: React.FC = () => {
  const [modoInfo, setModoInfo] = useState(false)
  const [detalles, setDetalles] = useState({
    title: '',
    estado: '',
    nota: 0,
    observaciones: ''
  })
  const showInformation = (data: any): void => {
    setModoInfo(true)
    setDetalles(data)
  }

  const hideInformation = (): void => {
    setModoInfo(false)
    setDetalles({
      title: '',
      estado: '',
      nota: 0,
      observaciones: ''
    })
  }
  const notas: any = [{
    title: 'EVALUACION DE MATEMATICAS',
    estado: 'REVISADO',
    nota: 5.0,
    observaciones: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.  and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  }, {
    title: 'EVALUACION DE ESPAÑOL',
    estado: 'REVISADO',
    nota: 5.0,
    observaciones: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.  and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  }, {
    title: 'EVALUACION DE INGLES',
    estado: 'REVISADO',
    nota: 5.0,
    observaciones: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.  and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  }, {
    title: 'EVALUACION DE CIENCIA',
    estado: 'REVISADO',
    nota: 5.0,
    observaciones: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.  and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  }, {
    title: 'EVALUACION DE LA VIDA',
    estado: 'REVISADO',
    nota: 5.0,
    observaciones: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.  and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  }]

  return (
    <div className="main-notas">
      {
        modoInfo
          ? <div className="container-notas">
            <div className="header-notas">
              <h5>{detalles.title}</h5>
            </div>
            <div className="nota-notas">
              <h6>NOTA </h6>
              <h5>{detalles.nota}</h5>
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
            <IonList className="list-notas">
              {
                notas.map((nota: any) => {
                  return (
                    <IonItem button onClick={() => showInformation(nota)}>
                      <IonIcon slot="start" md={newspaper} color="#0984e3" />
                      <IonLabel>
                        <h3>
                          {nota.title}
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

export default Notas

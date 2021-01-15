import React, { useState } from 'react'
import { IonContent, IonPage } from '@ionic/react'
import exam1 from '../../test/task1'
import './make-examn.css'
import { imgExamenes, serverMultimedia } from '../../constants/configuration'

const Exam: React.FC = () => {
  const [nose, setNose] = useState({
    quiz: exam1,
    paginadorPreguntas: 0,
    respondidas: []
  })

  const validarClases = (opcion: any): string => {
    const { respondidas } = nose
    let clases = 'opcion'
    try {
      if (opcion.multiple) {
        const respondidass: any = respondidas
        if (respondidass[opcion.indice].includes(opcion.valor)) {
          clases += ' opcion_selected'
        }
      } else {
        if (respondidas[opcion.indice] === opcion.valor) {
          clases += ' opcion_selected'
        }
      }
    } catch (error) { }
    return clases
  }

  const handleNext = (): void => {
    const newNose = { ...nose }
    newNose.paginadorPreguntas = nose.paginadorPreguntas + 1
    setNose(newNose)
  }

  const handleBack = (): void => {
    const newNose = { ...nose }
    newNose.paginadorPreguntas = nose.paginadorPreguntas - 1
    setNose(newNose)
  }

  const handleChange = (opcion: any) => (event: any) => {
    const { respondidas } = nose
    const auxiliar: any = respondidas
    auxiliar[opcion.indice] = event.target.value

    const newNose = { ...nose }
    newNose.respondidas = auxiliar
    setNose(newNose)
  }

  const handleSeleccionar = (opcion: any): void => {
    const { respondidas } = nose
    const auxiliar: any = respondidas
    if (opcion.multiple) {
      if (!auxiliar[opcion.indice]) {
        auxiliar[opcion.indice] = []
        auxiliar[opcion.indice].push(opcion.valor)
      } else {
        if (auxiliar[opcion.indice].includes(opcion.valor)) {
          auxiliar[opcion.indice].splice(auxiliar[opcion.indice].indexOf(opcion.valor), 1)
        } else {
          if (auxiliar[opcion.indice].length < opcion.numero_respuestas) {
            auxiliar[opcion.indice].push(opcion.valor)
          }
        }
      }
    } else {
      if (auxiliar[opcion.indice] === opcion.valor) {
        auxiliar[opcion.indice] = null
      } else {
        auxiliar[opcion.indice] = opcion.valor
      }
    }

    const newNose = { ...nose }
    newNose.respondidas = auxiliar
    setNose(newNose)
  }

  const { quiz, paginadorPreguntas, respondidas } = nose
  const pregunta = quiz.preguntas[paginadorPreguntas]
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="form">
          <section className="header">
            <div className="title-exam">
              <h3 >{quiz.nombre}</h3>
            </div>
            <div className="title-exam-preguntas">
              <h3 >{quiz.preguntas.length + ' preguntas ' + quiz.tiempo}</h3>
            </div>
            <div className="title-exam-tiempo">
              <h3 >{'Tiempo transcurrido: 00:18:58'}</h3>
            </div>
          </section>
          <hr className="separador" />
          <section className="info-exam">
            <h5 className="observaciones-exam">{quiz.observaciones}</h5>
          </section>
          <section className="preguntas-exam">
            <div className="container-body" >
              <div className="container-pregunta" >
                <div className="pregunta">
                  <div className="indice-pregunta">
                    <h6>{(paginadorPreguntas + 1)}</h6>
                  </div>
                  <div className="descripcion-pregunta">
                    <h6>{pregunta.descripcion}</h6>
                  </div>
                  {
                    pregunta.imagen
                      ? <div className="descripcion-imagen-pregunta">
                        <img src={`${serverMultimedia}${imgExamenes}${quiz.id}/${pregunta.indice}.png`} alt={"imagen-pregunta"} />
                      </div>
                      : null

                  }


                </div>
                <div className="opciones">
                  {
                    pregunta.tipo === 'ABIERTA'
                      ? <textarea
                        className="text-respuesta" value={respondidas[paginadorPreguntas] || ''}
                        // rows="3"
                        onChange={handleChange(pregunta)} />
                      : pregunta.opciones.map((opcion: any) => {
                        opcion.multiple = pregunta.multiple
                        opcion.indice = pregunta.indice
                        opcion.numero_respuestas = pregunta.numero_respuestas
                        return (
                          <div className={validarClases(opcion)} onClick={() => handleSeleccionar(opcion)}>
                            <h6>{opcion.descripcion}</h6>
                          </div>
                        )
                      })
                  }
                </div>
              </div>
              <div className="paginador">
                {
                  paginadorPreguntas !== 0 && <button className="btn-paginador btn-atras"
                    onClick={() => handleBack()}>
                    ATRAS
                  </button>
                }
                {
                  paginadorPreguntas === (quiz.preguntas.length - 1)
                    ? <button className="btn-paginador btn-siguiente"
                      onClick={() => console.log(respondidas)}>
                      TERMINAR
                    </button>
                    : <button className="btn-paginador btn-siguiente"
                      onClick={() => handleNext()}>
                      SIGUIENTE
                    </button>
                }
              </div>
            </div>
          </section>
        </div>

      </IonContent>
    </IonPage>
  )
}

export default Exam

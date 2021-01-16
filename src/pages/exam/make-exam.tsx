import React, { useEffect, useState } from 'react'
import { IonContent, IonPage, IonToast } from '@ionic/react'
import './make-examn.css'
import { imgExamenes, serverMultimedia } from '../../constants/configuration'
import StorageJobs from '../../jobs/Storage'
import { DEFAULT_EXAM, LOCAL_STORAGE_STATES } from '../../constants/costants'
import { Examen } from '../../interfaces/examenes'
import { responseValidate } from '../../interfaces/settings'
import Loader from '../../components/loader/Loader'

const Exam: React.FC = () => {
  const storageJobs = StorageJobs.getInstance()
  const [state, setState] = useState({
    quiz: DEFAULT_EXAM,
    paginadorPreguntas: 0,
    respondidas: []
  })
  const [loader, setLoader] = useState(true)
  const [toast, setToast] = useState(true)
  const [mensajeToast, setMensajeToast] = useState('')
  useEffect(() => {
    obtenerExamenes()
  }, [])
  const obtenerExamenes = async (): Promise<void> => {
    const dataExamenes = await storageJobs.getObject<Examen>(LOCAL_STORAGE_STATES.examen_activo)
    if (dataExamenes !== null) {
      setState({
        quiz: dataExamenes,
        paginadorPreguntas: 0,
        respondidas: []
      })
      setLoader(false)
    } else {
      console.log('se toteo')
    }
  }

  const { paginadorPreguntas, respondidas } = state
  const quiz: Examen = state.quiz
  const pregunta = quiz.preguntas[paginadorPreguntas] || {}
  const validarClases = (opcion: any): string => {
    const { respondidas } = state
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
    const newstate = { ...state }
    newstate.paginadorPreguntas = state.paginadorPreguntas + 1
    setState(newstate)
  }

  const handleBack = (): void => {
    const newstate = { ...state }
    newstate.paginadorPreguntas = state.paginadorPreguntas - 1
    setState(newstate)
  }

  const handleTerminar = (): void => {
    const res = validarQuiz()
    console.log(res)
    if (res.response) {
      setMensajeToast('EXAMEN COMPLETADO EXITOSAMENTE')
    } else {
      setMensajeToast(res.mensaje)
    }
    setToast(true)
  }

  const validarQuiz = (): responseValidate => {
    const res = {
      response: true,
      mensaje: ''
    }
    quiz.preguntas.map((pregunta) => {
      if (pregunta.multiple) {

      } else {
        if (!respondidas[pregunta.indice]) {
          res.response = false
          res.mensaje = `DEBE COMPLETAR LA PREGUNTA ${pregunta.indice + 1}`
        }
      }
    })
    return res
  }

  const handleChange = (opcion: any) => (event: any) => {
    const { respondidas } = state
    const auxiliar: any = respondidas
    auxiliar[opcion.indice] = event.target.value

    const newstate = { ...state }
    newstate.respondidas = auxiliar
    setState(newstate)
  }

  const handleSeleccionar = (opcion: any): void => {
    const { respondidas } = state
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

    const newstate = { ...state }
    newstate.respondidas = auxiliar
    setState(newstate)
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        {
          loader
            ? <Loader classStyle="loader--show"></Loader>
            : <div className="form">
              <section className="header">
                <div className="title-exam">
                  <h3 >{quiz.nombre}</h3>
                </div>
                <div className="title-exam-preguntas">
                  <h3 >{`${quiz.preguntas.length} preguntas ${quiz.tiempo}`}</h3>
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
                            <img src={`${serverMultimedia}${imgExamenes}${quiz.id ?? 0}/${pregunta.indice}.png`} alt={'imagen-pregunta'} />
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
                        ATRAS</button>
                    }
                    {
                      paginadorPreguntas === (quiz.preguntas.length - 1)
                        ? <button className="btn-paginador btn-siguiente"
                          onClick={() => handleTerminar()}>
                          TERMINAR</button>
                        : <button className="btn-paginador btn-siguiente"
                          onClick={() => handleNext()}>
                          SIGUIENTE </button>
                    }
                  </div>
                  <IonToast
                    isOpen={toast}
                    message={mensajeToast}
                    duration={5000}
                  />
                </div>
              </section>
            </div>

        }

      </IonContent>
    </IonPage>
  )
}

export default Exam

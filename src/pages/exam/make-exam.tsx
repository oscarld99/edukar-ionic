import React, { useEffect, useState } from 'react'
import { IonContent, IonPage, IonToast } from '@ionic/react'
import './make-examn.css'
import { imgExamenes, serverMultimedia } from '../../constants/configuration'
import StorageJobs from '../../jobs/Storage'
import { DEFAULT_EXAM, LOCAL_STORAGE_STATES } from '../../constants/costants'
import { Examen } from '../../interfaces/examenes'
import { obtenerIdEstudiante, segundosAHora } from '../../utils/funciuones/funciones'
import Loader from '../../components/loader/Loader'
import { useHistory } from 'react-router'
import resolverExamen from '../../services/examenes/resolverExamen'
import { validarClases, validarQuiz } from './make-exam.validate'
import Imglogo from '../../assets/images/logo.png'
let time = 60
const Exam: React.FC = () => {
  const storageJobs = StorageJobs.getInstance()
  const history = useHistory()

  const [state, setState] = useState({
    quiz: DEFAULT_EXAM,
    paginadorPreguntas: 0,
    respondidas: []
  })
  const [loaderPost, setLoaderPost] = useState(false)
  const [loader, setLoader] = useState(true)
  const [toast, setToast] = useState(false)
  const [mensajeToast, setMensajeToast] = useState('')
  useEffect(() => {
    obtenerExamenes()
    /*
    decrementarTime()
    */
    time = time * quiz.tiempo
    return () => {
      time = 60
      setState({
        quiz: DEFAULT_EXAM,
        paginadorPreguntas: 0,
        respondidas: []
      })
    }
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
      history.push('/page/evaluaciones')
    }
  }

  const { paginadorPreguntas, respondidas } = state
  const quiz: Examen = state.quiz
  const pregunta = quiz.preguntas[paginadorPreguntas] || {}
  // pruebas time

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

  const handleTerminar = async (): Promise<void> => {
    setLoaderPost(true)
    const res = validarQuiz(quiz, respondidas)
    if (res.response) {
      const id = await obtenerIdEstudiante()
      const result = await resolverExamen(id, quiz.id, res.respuestas, {})
      if (typeof result !== 'string') {
        setMensajeToast('EXAMEN COMPLETADO EXITOSAMENTE')
        await storageJobs.removeItem(LOCAL_STORAGE_STATES.examen_activo)
        history.push('/page/evaluaciones')
      } else {
        const message = result
        setMensajeToast(message)
      }
    } else {
      setMensajeToast(res.mensaje)
    }
    setLoaderPost(true)
    setLoader(false)
    setToast(true)
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
            ? <Loader classStyle='loader--show loader--transparent'> </Loader>
            : <div className="form">
              <Loader classStyle={loaderPost ? 'loader--show loader--transparent' : ''}> </Loader>
              <div className="banner-header">
                <img src={Imglogo} alt='logo-edukar' />
                <h3>EVALUACIONES</h3>
              </div>
              <section className="header">
                <div className="title-exam">
                  <h3 >{quiz.nombre}</h3>
                </div>
                <div className="title-exam-preguntas">
                  <h3 >{`${paginadorPreguntas + 1} de ${quiz.preguntas.length} preguntas`}</h3>
                </div>
                <div className="title-exam-tiempo">
                  <h3 >{`Tiempo restante: ${segundosAHora(time)}`}</h3>
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
                      <div className="descripcion-pregunta">
                        <h6>{pregunta.ayuda}</h6>
                      </div>
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
                              <div className={validarClases(opcion, respondidas)} onClick={() => handleSeleccionar(opcion)}>
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
                          onClick={async () => await handleTerminar()}>
                          TERMINAR</button>
                        : <button className="btn-paginador btn-siguiente"
                          onClick={() => handleNext()}>
                          SIGUIENTE </button>
                    }
                  </div>
                  <IonToast
                    isOpen={toast}
                    onDidDismiss={() => setToast(false)}
                    message={mensajeToast}
                    duration={3000}
                    color={'dark'}
                  />
                </div>
              </section>
            </div>

        }

      </IonContent>
    </IonPage >
  )
}

export default Exam

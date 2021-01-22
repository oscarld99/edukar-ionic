import { IonIcon, IonToast } from '@ionic/react'
import { person, mail, call, card } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import Loader from '../../components/loader/Loader'
import { LOCAL_STORAGE_STATES } from '../../constants/costants'
import { User } from '../../interfaces/AccessInterfaces'
import PerfilService from '../../services/usuario/usuario.services'
import { getObjectStorage, setObjectStorage } from '../../utils/storage/AsyncStorage'
import Userimg from '../../assets/images/profile.svg'
import './perfil.css'

const Perfil: React.FC = () => {
  const [id, setId] = useState(0)
  const [nombres, setnombres] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [identificacion, setIdentificacion] = useState('')
  const [correo, setCorreo] = useState('')
  const [telefono, setTelefono] = useState('')
  // otra
  const [loader, setLoader] = useState(false)
  const [modeUpdate, setModeUpdate] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [messageToast, setMessageToast] = useState('')
  // obtener data usuario
  useEffect(() => {
    obtenerData()
  }, [])

  const obtenerData = async (): Promise<void> => {
    const dataUsuario = await getObjectStorage<User>(LOCAL_STORAGE_STATES.usuario)
    if (dataUsuario !== null) {
      setId(dataUsuario.id)
      setnombres(dataUsuario.nombres)
      setApellidos(dataUsuario.apellidos)
      setIdentificacion(dataUsuario.identificacion)
      setCorreo(dataUsuario.correo)
      setTelefono(dataUsuario.telefono)
    }
  }

  const actualizarDatos = async (): Promise<void> => {
    setModeUpdate(true)
  }

  const actualizarData = async (): Promise<void> => {
    setLoader(true)
    const result = await PerfilService({
      id,
      nombres,
      apellidos,
      identificacion,
      correo,
      telefono
    })
    console.log(result)
    if (typeof result !== 'string') {
      await setObjectStorage(LOCAL_STORAGE_STATES.usuario, result)
      setModeUpdate(false)
    } else {
      const message = result
      setMessageToast(message)
      setShowToast(true)
    }
    setLoader(false)
  }

  return (
    <div className="main-perfil">
      <Loader classStyle={loader ? 'loader--show loader--transparent' : ''} />
      <div className="img-user">
        <img src={Userimg} alt="user-edukar" />
      </div>
      <div className="info-user">
        <div className="input-group">
          <i><IonIcon slot="start" md={card} /></i>
          <input
            className="input-loguin"
            disabled={!modeUpdate}
            type="text"
            placeholder="Identificacion"
            value={identificacion}
            onChange={(e) => setIdentificacion(e.target.value)}
          />
        </div>
        <div className="input-group">
          <i><IonIcon slot="start" md={person} /></i>
          <input
            className="input-loguin"
            disabled={!modeUpdate}
            type="text"
            placeholder="nombress"
            value={nombres}
            onChange={(e) => setnombres(e.target.value)}
          />
        </div>
        <div className="input-group">
          <i><IonIcon slot="start" md={person} /></i>
          <input
            className="input-loguin"
            disabled={!modeUpdate}
            type="text"
            placeholder="Apellidos"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
          />
        </div>
        <div className="input-group">
          <i><IonIcon slot="start" md={call} /></i>
          <input
            className="input-loguin"
            disabled={!modeUpdate}
            type="text"
            placeholder="Telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
        <div className="input-group">
          <i><IonIcon slot="start" md={mail} /></i>
          <input
            className="input-loguin"
            disabled={!modeUpdate}
            type="text"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>
      </div>
      <div className="actualizar-user">
        {
          modeUpdate
            ? [
              <button className="btn-perfil btn-cancelar" onClick={() => setModeUpdate(false)}>CANCELAR</button>,
              <button className="btn-perfil btn-guardar" onClick={async () => await actualizarData()}>GUARDAR</button>
            ]
            : <button className="btn-perfil btn-actualizar" onClick={async () => await actualizarDatos()}>ACTUALIZAR</button>
        }

      </div>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={messageToast}
        duration={3000}
        color='danger'
      />
    </div>
  )
}

export default Perfil

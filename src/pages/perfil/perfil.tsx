import { IonIcon, IonToast } from '@ionic/react'
import { person, mail, call, card } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import Usuario from '../../assets/images/usuario.png'
import Loader from '../../components/loader/Loader'
import { LOCAL_STORAGE_STATES } from '../../constants/costants'
import { User } from '../../interfaces/AccessInterfaces'
import StorageJobs from '../../jobs/Storage'
import PerfilService from '../../services/usuario/usuario.services'
import './perfil.css'

const Perfil: React.FC = () => {
  const storageJobs = StorageJobs.getInstance()
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
  })

  const obtenerData = async (): Promise<void> => {
    const dataUsuario = await storageJobs.getObject<User>(LOCAL_STORAGE_STATES.usuario)
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
    setLoader(true)
    const result = await PerfilService({
      id,
      nombres,
      apellidos,
      identificacion,
      correo,
      telefono
    })
    if (typeof result !== 'string') {
      await storageJobs.setObject(LOCAL_STORAGE_STATES.usuario, result)
    } else {
      const message = result
      setMessageToast(message)
      setShowToast(true)
    }
    setModeUpdate(false)
    setLoader(false)
  }

  return (
    <div className="main-perfil">
      <Loader classStyle={loader ? 'loader--show loader--transparent' : ''} />
      <div className="img-user">
        <img src={Usuario} alt="user-edukar" />
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
              <button className="btn-perfil btn-guardar" onClick={() => setModeUpdate(false)}>GUARDAR</button>
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

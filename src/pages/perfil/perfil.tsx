import { IonIcon } from '@ionic/react'
import { person, mail, call, card } from 'ionicons/icons'
import React, { useState } from 'react'
import Usuario from '../../assets/images/usuario.png'
import './perfil.css'

const Perfil: React.FC = () => {
  const [nombre, setNombre] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [identificacion, setIdentificacion] = useState('')
  const [correo, setCorreo] = useState('')
  const [telefono, setTelefono] = useState('')
  const [modeUpdate, setModeUpdate] = useState(false)

  return (
    <div className="main-perfil">
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
            placeholder="Nombres"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
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
            : <button className="btn-perfil btn-actualizar" onClick={() => setModeUpdate(true)}>ACTUALIZAR</button>
        }

      </div>
    </div>
  )
}

export default Perfil

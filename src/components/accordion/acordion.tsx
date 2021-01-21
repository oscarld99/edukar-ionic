import React, { useState } from 'react'
import { Notas } from '../../interfaces/examenes'
import './acordion.css'

const Acordion: React.FC<Notas> = (nota: Notas) => {
  const [open, setOpen] = useState(false)


  return (
    <div className="container-acordion" onClick={() => setOpen(!open)}>
      <button className="accordion">{nota.titulo_cuestionario}</button>
      <div className={open ? 'panel' : 'panel hide'}>
        <div className="container-notas">
          <h5 className="nt">NOTA</h5>
          <h5 className="number">{nota.resultado}</h5>
        </div>
        <hr />
        <div className="container-observaciones">
          <p>{nota.observaciones}</p>
        </div>
      </div>
    </div >
  )
}

export default Acordion

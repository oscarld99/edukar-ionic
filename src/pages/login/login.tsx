import React,{useState,useRef} from 'react';
import { useParams } from 'react-router';
import {
    IonIcon
} from '@ionic/react';
import Logologin from '../../assets/images/logoAppLogin.png'
import Usuario from '../../assets/images/usuario.png'
import { person, lockClosed } from 'ionicons/icons';
import './login.css'

const Login: React.FC = () => {

    const { name } = useParams<{ name: string; }>();
    const inputRef:any = useRef();
    return (
        <div className="root-login">
            <div className="img-logo">
                <img src={Logologin} alt="logo-edukar" />
            </div>
            <div className="img-user">
                <img src={Usuario} alt="user-edukar" />
            </div>
            <div className="form-loguin">
                <div className="input-group">
                    <i><IonIcon slot="start" ios={person} md={person} /></i>
                    <input className="input-loguin" type="text" placeholder="Usuario" />
                </div>
                <div className="input-group">
                    <i><IonIcon slot="start" ios={lockClosed} md={lockClosed} /></i>
                    <input className="input-loguin" type="text" placeholder="Contraseña" ref={inputRef}/>
                </div>
                <div className="option-form-loguin">
                    <div className="recordarme">
                        <input type="checkbox"  id="checkbox-recordarme" />
                        <label htmlFor="checkbox-recordarme">REDORDARME</label>
                    </div>
                    <div className="olvido-clave">
                        <h6>Olvidé contraseña</h6>
                    </div>
                </div>
            </div>
            <div className="pnl-btn">
                <button className="btn-ingresar">
                    INGRESAR
            </button>
            </div>
        </div>
    );
};

export default Login;

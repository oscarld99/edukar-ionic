import React, { useState, useRef } from 'react';
import {
    IonIcon,
    IonContent,
    IonPage,
    IonToast
} from '@ionic/react';
import { Plugins } from '@capacitor/core'
import Logologin from '../../assets/images/logoAppLogin.png'
import Usuario from '../../assets/images/usuario.png'
import { person, lockClosed } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './login.css'
const { App } = Plugins;


const Login: React.FC = (props:any) => {
    const [counter, setCounter] = useState(0)
    document.addEventListener('ionBackButton', () => {
        if (props.location.pathname === "/login") {
            if (counter) {
                App.exitApp();
            } else {
                setTimeout(()=>{
                    setCounter(0) 
                },5000)
                setCounter(1);
            }
        }
    })
    const inputRef: any = useRef();
    const [usuario, setUsuario] = useState("");
    const [clave, setClave] = useState("");
    const [showAlert1, setShowAlert1] = useState(false);
    const history = useHistory();
    const iniciar = () => {
        if (usuario === "olora" && clave === "1234") {
            history.push("/page/evaluaciones");
        } else {
            setShowAlert1(true);
        }
    }
    return (
        <IonPage>
            <IonContent fullscreen>
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
                            <input
                                className="input-loguin"
                                type="text"
                                placeholder="Usuario"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <i><IonIcon slot="start" ios={lockClosed} md={lockClosed} /></i>
                            <input
                                className="input-loguin"
                                type="password"
                                placeholder="Contraseña"
                                ref={inputRef}
                                value={clave}
                                onChange={(e) => setClave(e.target.value)}
                            />
                        </div>
                        <div className="option-form-loguin">
                            <div className="recordarme">
                                <input type="checkbox" id="checkbox-recordarme" />
                                <label htmlFor="checkbox-recordarme">RECORDARME</label>
                            </div>
                            <div className="olvido-clave">
                                <h6>Olvidé contraseña</h6>
                            </div>
                        </div>
                    </div>
                    <div className="pnl-btn">
                        <button className="btn-ingresar" onClick={() => iniciar()}>
                            INGRESAR
                            </button>

                    </div>
                    <IonToast
                        isOpen={showAlert1}
                        onDidDismiss={() => setShowAlert1(false)}
                        message='Credenciales invalidas'
                        duration={500}
                        color='danger'
                    />
                    <IonToast
                        isOpen={counter===1}
                        message="Dar otra vez atras para salir."
                        duration={200}
                    />
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Login;

import Menu from './components/Menu'
import Page from './pages/Page'
import Login from './pages/login/login'
import Exam from './pages/exam/make-exam'
import React, { useEffect, useState } from 'react'
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Redirect, Route } from 'react-router-dom'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'
import StorageJobs from './jobs/Storage'
import { LOCAL_STORAGE_STATES } from './constants/costants'
import Loader from './components/loader/Loader'
import Alert from './components/alert/Alert'

import SocketIO from './jobs/socketIO'

const App: React.FC = () => {
  const socketIO = SocketIO.getInstance()
  console.log('obtuve la instancia')
  console.log('estado socket ', socketIO.getCheckStatus())

  socketIO.on('exam/group/1', function (data: any) {
    console.log(data)
    console.log('socket.connected', socketIO.getCheckStatus())
  })

  const storageJobs = StorageJobs.getInstance()
  const [token, setToken] = useState(false)
  const [loader, setLoader] = useState(true)
  // const [loader, setLoader] = useState(true)
  useEffect(() => {
    validarSession()
  }, [])
  const validarSession = async (): Promise<void> => {
    const session = await storageJobs.getItem(LOCAL_STORAGE_STATES.token)
    if (session !== null) {
      setToken(true)
      setLoader(false)
    } else {
      // setToken(false)
      setLoader(false)
    }
  }
  return (
    <IonApp>
      <Loader classStyle={loader ? 'loader--show loader--transparent' : ''} />
      <Alert showAlert={true} />
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/exam" component={token ? Exam : Login} exact />
            <Route path="/page/:name" component={token ? Page : Login} exact />
            <Route component={token ? Page : Login} />
            <Redirect from="/" to='/page/inicio' exact />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp >
  )
}

export default App

import { AppPage } from '../interfaces/settings'
import { newspaper, checkmarkDone, person, globeOutline, settings, notifications, home } from 'ionicons/icons'
// VISTAS
import Perfil from './perfil/perfil'
import Examenes from './examenes/examenes'
import MakeExam from './exam/make-exam'
import Notas from './notas/notas'
import Home from './home/home'
import Notificaciones from './notificaciones/notificaciones'

export const appPages: AppPage[] = [
  {
    index: 1,
    title: 'Perfil',
    url: '/page/perfil',
    mdIcon: person,
    Component: Perfil
  }, {
    index: 2,
    title: 'Inicio',
    url: '/page/inicio',
    mdIcon: home,
    Component: Home
  }, {
    index: 3,
    title: 'Evaluaciones',
    url: '/page/evaluaciones',
    mdIcon: newspaper,
    Component: Examenes
  }, {
    index: 4,
    title: 'Resultados',
    url: '/page/resultados',
    mdIcon: checkmarkDone,
    Component: Notas
  }, {
    index: 5,
    title: 'Notificaciones',
    url: '/page/notificaciones',
    mdIcon: notifications,
    Component: Notificaciones
  }/*,
   {
    index: 6,
    title: 'Configuraciones',
    url: '/page/configuraciones',
    mdIcon: settings,
    Component: Examenes
  }
  */
  , {
    index: 8,
    title: '',
    url: '/page/make-exam',
    mdIcon: globeOutline,
    Component: MakeExam
  }
]

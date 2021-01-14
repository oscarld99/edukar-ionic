import { AppPage } from '../interfaces/settings'
import { newspaper, checkmarkDone, person, globeOutline, settings, notifications } from 'ionicons/icons'
// VISTAS
import Perfil from './perfil/perfil'
import Examenes from './examenes/examenes'
import MakeExam from './exam/make-exam'

export const appPages: AppPage[] = [
  {
    index: 1,
    title: 'Perfil',
    url: '/page/perfil',
    mdIcon: person,
    Component: Perfil
  }, {
    index: 2,
    title: 'Examenes',
    url: '/page/examenes',
    mdIcon: newspaper,
    Component: Examenes
  }, {
    index: 3,
    title: 'Resultados',
    url: '/page/resultados',
    mdIcon: checkmarkDone,
    Component: Examenes
  }, {
    index: 4,
    title: 'Notificaciones',
    url: '/page/notificaciones',
    mdIcon: notifications,
    Component: Examenes
  }, {
    index: 5,
    title: 'Configuraciones',
    url: '/page/consiguraciones',
    mdIcon: settings,
    Component: Examenes
  }, {
    index: 6,
    title: 'Sitio Oficial',
    url: '/page/sitio-oficial',
    mdIcon: globeOutline,
    Component: Examenes
  }, {
    index: 8,
    title: '',
    url: '/page/make-exam',
    mdIcon: globeOutline,
    Component: MakeExam
  }
]

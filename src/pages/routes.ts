import { AppPage } from '../interfaces/settings'
import { newspaper, checkmarkDone,person ,lockClosed,planet,settings,notifications} from 'ionicons/icons'
import Examenes from './examenes/examenes'

export const appPages: AppPage[] = [
  {
    index:1,
    title: 'Perfil',
    url: '/page/perfil',
    mdIcon: person,
    Component: Examenes
  }, {
    index:2,
    title: 'Examenes',
    url: '/page/examenes',
    mdIcon: newspaper,
    Component: Examenes
  },{
    index:3,
    title: 'Resultados',
    url: '/page/resultados',
    mdIcon: checkmarkDone,
    Component: Examenes
  },{
    index:4,
    title: 'Notificaciones',
    url: '/page/notificaciones',
    mdIcon: notifications,
    Component: Examenes
  },{
    index:5,
    title: 'Configuraciones',
    url: '/page/consiguraciones',
    mdIcon: settings,
    Component: Examenes
  },{
    index:6,
    title: 'Sitio Oficial',
    url: '/page/sitio-oficial',
    mdIcon: planet,
    Component: Examenes
  }
]
